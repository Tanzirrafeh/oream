import React, { createContext, useContext, useState, useEffect } from 'react';

const OreamContext = createContext();

const MOCK_WALLETS = [
  { name: "Alex (Admin)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", isConnected: true },
  { name: "Beatriz (Member)", address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30", isConnected: false },
  { name: "Charlie (Member)", address: "0xbDA57472851178a7ee8022C2538b2857492726E9", isConnected: false },
  { name: "Landlord / Recipient", address: "0x9965553D10018447250004490226451904183a41", isConnected: false },
];

const INITIAL_GROUPS = [
  {
    groupId: 1,
    name: "Roommates Sunset Apartment Rent",
    admin: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    recipient: "0x9965553D10018447250004490226451904183a41",
    amountPerMember: 750, // USDC
    cycleLengthDays: 30,
    currentCycle: 0,
    cycleStartTime: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
    members: [
      { name: "Alex (Admin)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
      { name: "Beatriz", address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30" },
      { name: "Charlie", address: "0xbDA57472851178a7ee8022C2538b2857492726E9" }
    ],
    // Paid status per cycle: cycleId => { address: bool }
    paidStatus: {
      0: {
        "0x71C7656EC7ab88b098defB751B7401B5f6d8976F": true, // Alex paid
        "0x2546BcD3c84621e976D8185a91A922aE77ECEc30": false,
        "0x9965553D10018447250004490226451904183a41": false
      }
    },
    // Past completed cycles history
    history: [
      {
        cycle: -1,
        cycleName: "Cycle -1 (Last Month)",
        totalCollected: 2250,
        targetAmount: 2250,
        releasedTimestamp: Date.now() - (35 * 24 * 60 * 60 * 1000),
        status: "Auto-Released",
        paidMembers: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F", "0x2546BcD3c84621e976D8185a91A922aE77ECEc30", "0xbDA57472851178a7ee8022C2538b2857492726E9"]
      }
    ]
  }
];

export const OreamProvider = ({ children }) => {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [activeWallet, setActiveWallet] = useState(MOCK_WALLETS[0]);
  const [usdcBalance, setUsdcBalance] = useState(2500); // 2,500 USDC testnet balance
  const [allowances, setAllowances] = useState({
    // groupId => amount approved
    1: 10000
  });
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // 1. Admin creates group
  const createGroup = ({ name, members, amountPerMember, cycleLengthDays, recipient }) => {
    const newGroupId = groups.length + 1;
    const initialPaidStatus = {};
    members.forEach((m) => {
      initialPaidStatus[m.address] = false;
    });

    const newGroup = {
      groupId: newGroupId,
      name: name || `Group #${newGroupId}`,
      admin: activeWallet.address,
      recipient,
      amountPerMember: parseFloat(amountPerMember),
      cycleLengthDays: parseInt(cycleLengthDays, 10),
      currentCycle: 0,
      cycleStartTime: Date.now(),
      members: members.map((m, idx) => ({
        name: m.name || `Member ${idx + 1}`,
        address: m.address
      })),
      paidStatus: {
        0: initialPaidStatus
      },
      history: []
    };

    setGroups((prev) => [...prev, newGroup]);
    addNotification(`Group #${newGroupId} "${newGroup.name}" created successfully on Arc Testnet!`);
    return newGroupId;
  };

  // Approve USDC Allowance
  const approveUsdc = (groupId, amount) => {
    setAllowances((prev) => ({
      ...prev,
      [groupId]: amount
    }));
    addNotification(`Approved ${amount} USDC allowance for Oream contract.`);
  };

  // 3. Member contributes
  const contribute = (groupId) => {
    setGroups((prevGroups) => {
      return prevGroups.map((g) => {
        if (g.groupId !== groupId) return g;

        const currentCycle = g.currentCycle;
        const currentCyclePaid = { ...(g.paidStatus[currentCycle] || {}) };
        currentCyclePaid[activeWallet.address] = true;

        const updatedPaidStatus = {
          ...g.paidStatus,
          [currentCycle]: currentCyclePaid
        };

        // Calculate total collected so far in this cycle
        const paidCount = Object.values(currentCyclePaid).filter(Boolean).length;
        const totalCollected = paidCount * g.amountPerMember;
        const targetAmount = g.members.length * g.amountPerMember;

        let newCycle = currentCycle;
        let newCycleStartTime = g.cycleStartTime;
        let updatedHistory = [...g.history];

        // 5. Full collection -> Auto-release
        if (totalCollected >= targetAmount) {
          addNotification(
            `🎉 Target reached! Auto-released ${totalCollected} USDC to recipient ${g.recipient.slice(0, 6)}...${g.recipient.slice(-4)}. New cycle started!`
          );

          // Record in history
          updatedHistory.unshift({
            cycle: currentCycle,
            cycleName: `Cycle ${currentCycle}`,
            totalCollected,
            targetAmount,
            releasedTimestamp: Date.now(),
            status: "Auto-Released (Full Collection)",
            paidMembers: Object.keys(currentCyclePaid).filter((addr) => currentCyclePaid[addr])
          });

          // Advance cycle
          newCycle = currentCycle + 1;
          newCycleStartTime = Date.now();
          const nextCyclePaid = {};
          g.members.forEach((m) => {
            nextCyclePaid[m.address] = false;
          });
          updatedPaidStatus[newCycle] = nextCyclePaid;
        } else {
          addNotification(`Contribution of ${g.amountPerMember} USDC recorded! Status: Paid ✅`);
        }

        return {
          ...g,
          currentCycle: newCycle,
          cycleStartTime: newCycleStartTime,
          paidStatus: updatedPaidStatus,
          history: updatedHistory
        };
      });
    });
  };

  // 6. Partial collection -> Manual release
  const manualRelease = (groupId) => {
    setGroups((prevGroups) => {
      return prevGroups.map((g) => {
        if (g.groupId !== groupId) return g;

        const currentCycle = g.currentCycle;
        const currentCyclePaid = g.paidStatus[currentCycle] || {};
        const paidCount = Object.values(currentCyclePaid).filter(Boolean).length;
        const totalCollected = paidCount * g.amountPerMember;

        if (totalCollected === 0) {
          addNotification("No funds collected in current cycle to release.", "error");
          return g;
        }

        addNotification(
          `Manual Release executed by Admin! Transferred ${totalCollected} USDC collected to recipient. Cycle advanced.`
        );

        const updatedHistory = [
          {
            cycle: currentCycle,
            cycleName: `Cycle ${currentCycle}`,
            totalCollected,
            targetAmount: g.members.length * g.amountPerMember,
            releasedTimestamp: Date.now(),
            status: "Manual-Released (Admin Triggered)",
            paidMembers: Object.keys(currentCyclePaid).filter((addr) => currentCyclePaid[addr])
          },
          ...g.history
        ];

        const nextCycle = currentCycle + 1;
        const nextCyclePaid = {};
        g.members.forEach((m) => {
          nextCyclePaid[m.address] = false;
        });

        return {
          ...g,
          currentCycle: nextCycle,
          cycleStartTime: Date.now(),
          paidStatus: {
            ...g.paidStatus,
            [nextCycle]: nextCyclePaid
          },
          history: updatedHistory
        };
      });
    });
  };

  return (
    <OreamContext.Provider
      value={{
        groups,
        activeWallet,
        setActiveWallet,
        mockWallets: MOCK_WALLETS,
        usdcBalance,
        allowances,
        notifications,
        createGroup,
        approveUsdc,
        contribute,
        manualRelease,
        addNotification
      }}
    >
      {children}
    </OreamContext.Provider>
  );
};

export const useOream = () => useContext(OreamContext);
