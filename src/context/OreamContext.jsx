import React, { createContext, useContext, useState, useEffect } from 'react';
import { publicClient, arcTestnet, ARC_CONTRACT_ADDRESSES } from '../utils/arcChain';

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
      { name: "Alex (Admin)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", amount: 750 },
      { name: "Beatriz", address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30", amount: 750 },
      { name: "Charlie", address: "0xbDA57472851178a7ee8022C2538b2857492726E9", amount: 750 }
    ],
    paidStatus: {
      0: {
        "0x71C7656EC7ab88b098defB751B7401B5f6d8976F": true, // Alex paid
        "0x2546BcD3c84621e976D8185a91A922aE77ECEc30": false,
        "0x9965553D10018447250004490226451904183a41": false
      }
    },
    history: [
      {
        cycle: -1,
        cycleName: "Cycle -1 (Last Month)",
        totalCollected: 2250,
        targetAmount: 2250,
        releasedTimestamp: Date.now() - (35 * 24 * 60 * 60 * 1000),
        status: "Auto-Released (Full Collection)",
        txHash: "0x7a8c9b2d3e4f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
        paidMembers: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F", "0x2546BcD3c84621e976D8185a91A922aE77ECEc30", "0xbDA57472851178a7ee8022C2538b2857492726E9"]
      }
    ]
  }
];

export const OreamProvider = ({ children }) => {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [activeWallet, setActiveWallet] = useState(MOCK_WALLETS[0]);
  const [isConnected, setIsConnected] = useState(false); // User connects wallet in dashboard/navbar
  const [walletType, setWalletType] = useState('demo'); // 'demo' | 'circle' | 'metamask'
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState(3500); // 3,500 USDC testnet balance
  const [allowances, setAllowances] = useState({
    1: 10000
  });
  const [notifications, setNotifications] = useState([]);
  const [txLogs, setTxLogs] = useState([]);
  
  // Modals & Drawer state
  const [bridgeModalOpen, setBridgeModalOpen] = useState(false);
  const [walletsDrawerOpen, setWalletsDrawerOpen] = useState(false);
  const [web3Mode, setWeb3Mode] = useState('simulated'); // 'simulated' | 'arcTestnet'

  const connectWallet = (wallet, type = 'demo') => {
    setActiveWallet(wallet);
    setIsConnected(true);
    setWalletType(type);
    addNotification(`Connected to ${wallet.name} (${wallet.address.slice(0, 6)}...)`);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    addNotification('Wallet disconnected.');
  };

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const addTxLog = (eventName, data, txHash) => {
    setTxLogs((prev) => [
      {
        id: Date.now(),
        eventName,
        data,
        txHash: txHash || `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
        timestamp: new Date().toLocaleTimeString(),
        network: 'Arc Testnet (Chain #50401)'
      },
      ...prev
    ]);
  };

  // 1. Admin creates group
  const createGroup = ({ name, members, amountPerMember, cycleLengthDays, recipient }) => {
    const newGroupId = groups.length + 1;
    const initialPaidStatus = {};
    members.forEach((m) => {
      initialPaidStatus[m.address] = false;
    });

    const parsedAmount = parseFloat(amountPerMember);

    const newGroup = {
      groupId: newGroupId,
      name: name || `Group #${newGroupId}`,
      admin: activeWallet.address,
      recipient,
      amountPerMember: parsedAmount,
      cycleLengthDays: parseInt(cycleLengthDays, 10),
      currentCycle: 0,
      cycleStartTime: Date.now(),
      members: members.map((m, idx) => ({
        name: m.name || `Member ${idx + 1}`,
        address: m.address,
        amount: parsedAmount
      })),
      paidStatus: {
        0: initialPaidStatus
      },
      history: []
    };

    const mockTx = `0x${Math.random().toString(16).slice(2, 12)}${Math.random().toString(16).slice(2, 12)}`;
    addTxLog('GroupCreated', { groupId: newGroupId, admin: activeWallet.address, recipient }, mockTx);

    setGroups((prev) => [...prev, newGroup]);
    addNotification(`Group #${newGroupId} "${newGroup.name}" created on Arc Testnet! Tx: ${mockTx.slice(0, 10)}...`);
    return newGroupId;
  };

  // Approve USDC Allowance
  const approveUsdc = (groupId, amount) => {
    setAllowances((prev) => ({
      ...prev,
      [groupId]: amount
    }));

    const mockTx = `0x${Math.random().toString(16).slice(2, 12)}${Math.random().toString(16).slice(2, 12)}`;
    addTxLog('Approval', { spender: ARC_CONTRACT_ADDRESSES.oreamVault, amount }, mockTx);
    addNotification(`Approved ${amount} USDC allowance for Oream Vault contract on Arc Testnet.`);
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

        const paidCount = Object.values(currentCyclePaid).filter(Boolean).length;
        const totalCollected = paidCount * g.amountPerMember;
        const targetAmount = g.members.length * g.amountPerMember;

        const contribTx = `0x${Math.random().toString(16).slice(2, 12)}${Math.random().toString(16).slice(2, 12)}`;
        addTxLog('Contributed', { groupId, cycle: currentCycle, member: activeWallet.address, amount: g.amountPerMember }, contribTx);

        let newCycle = currentCycle;
        let newCycleStartTime = g.cycleStartTime;
        let updatedHistory = [...g.history];

        // Deduct from wallet balance
        setUsdcBalance((prev) => Math.max(0, prev - g.amountPerMember));

        // 5. Full collection -> Auto-release
        if (totalCollected >= targetAmount) {
          const releaseTx = `0x${Math.random().toString(16).slice(2, 12)}${Math.random().toString(16).slice(2, 12)}`;
          addTxLog('CycleReleased', { groupId, cycle: currentCycle, totalReleased: totalCollected, recipient: g.recipient }, releaseTx);

          addNotification(
            `🎉 Target 100% reached! Auto-released ${totalCollected} USDC to recipient ${g.recipient.slice(0, 6)}...${g.recipient.slice(-4)}. New cycle started!`
          );

          updatedHistory.unshift({
            cycle: currentCycle,
            cycleName: `Cycle ${currentCycle}`,
            totalCollected,
            targetAmount,
            releasedTimestamp: Date.now(),
            status: "Auto-Released (Full Collection)",
            txHash: releaseTx,
            paidMembers: Object.keys(currentCyclePaid).filter((addr) => currentCyclePaid[addr])
          });

          newCycle = currentCycle + 1;
          newCycleStartTime = Date.now();
          const nextCyclePaid = {};
          g.members.forEach((m) => {
            nextCyclePaid[m.address] = false;
          });
          updatedPaidStatus[newCycle] = nextCyclePaid;
        } else {
          addNotification(`Contribution of ${g.amountPerMember} USDC verified on Arc Testnet! Status: Paid ✅`);
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

        const releaseTx = `0x${Math.random().toString(16).slice(2, 12)}${Math.random().toString(16).slice(2, 12)}`;
        addTxLog('CycleReleasedManual', { groupId, cycle: currentCycle, totalReleased: totalCollected, admin: activeWallet.address }, releaseTx);

        addNotification(
          `Manual Release executed by Admin! Transferred ${totalCollected} USDC to recipient. Cycle advanced.`
        );

        const updatedHistory = [
          {
            cycle: currentCycle,
            cycleName: `Cycle ${currentCycle}`,
            totalCollected,
            targetAmount: g.members.length * g.amountPerMember,
            releasedTimestamp: Date.now(),
            status: "Manual-Released (Admin Triggered)",
            txHash: releaseTx,
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
        isConnected,
        setIsConnected,
        walletType,
        connectWallet,
        disconnectWallet,
        connectModalOpen,
        setConnectModalOpen,
        mockWallets: MOCK_WALLETS,
        usdcBalance,
        setUsdcBalance,
        allowances,
        notifications,
        txLogs,
        web3Mode,
        setWeb3Mode,
        bridgeModalOpen,
        setBridgeModalOpen,
        walletsDrawerOpen,
        setWalletsDrawerOpen,
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
