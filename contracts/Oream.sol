// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Oream - Recurring Shared-Expense Collection Contract
 * @notice Formalizes recurring cycle payments (roommates, subscriptions, group expenses) on Arc Testnet with native USDC.
 */
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Oream {
    address public immutable usdcToken;

    struct Group {
        address admin;
        address recipient;
        address[] members;
        uint256 amountPerMember;
        uint256 cycleLength; // length in seconds (e.g. 30 days = 2592000)
        uint256 currentCycle;
        uint256 cycleStartTime;
    }

    // groupId => Group
    mapping(uint256 => Group) public groups;
    
    // groupId => cycle => member => paid?
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public paidStatus;
    
    // groupId => cycle => total amount collected
    mapping(uint256 => mapping(uint256 => uint256)) public cycleCollected;

    uint256 public groupCounter;

    // Events
    event GroupCreated(
        uint256 indexed groupId,
        address indexed admin,
        address recipient,
        uint256 amountPerMember,
        uint256 cycleLength
    );
    event Contributed(
        uint256 indexed groupId,
        uint256 indexed cycle,
        address indexed member,
        uint256 timestamp
    );
    event CycleReleased(
        uint256 indexed groupId,
        uint256 indexed cycle,
        uint256 totalReleased,
        uint256 timestamp
    );

    constructor(address _usdcToken) {
        usdcToken = _usdcToken;
    }

    /**
     * @notice Create a new recurring group
     */
    function createGroup(
        address[] memory _members,
        uint256 _amountPerMember,
        uint256 _cycleLength,
        address _recipient
    ) external returns (uint256 groupId) {
        require(_members.length > 0, "Members required");
        require(_amountPerMember > 0, "Amount must be > 0");
        require(_cycleLength > 0, "Cycle length must be > 0");
        require(_recipient != address(0), "Invalid recipient");

        groupCounter++;
        groupId = groupCounter;

        Group storage g = groups[groupId];
        g.admin = msg.sender;
        g.recipient = _recipient;
        g.members = _members;
        g.amountPerMember = _amountPerMember;
        g.cycleLength = _cycleLength;
        g.currentCycle = 0;
        g.cycleStartTime = block.timestamp;

        emit GroupCreated(groupId, msg.sender, _recipient, _amountPerMember, _cycleLength);
    }

    /**
     * @notice Member contributes their share for the current cycle
     */
    function contribute(uint256 groupId) external {
        Group storage g = groups[groupId];
        require(g.admin != address(0), "Group does not exist");
        uint256 cycle = g.currentCycle;

        // Check caller is a member
        bool isMember = false;
        for (uint256 i = 0; i < g.members.length; i++) {
            if (g.members[i] == msg.sender) {
                isMember = true;
                break;
            }
        }
        require(isMember, "Caller is not a member of this group");
        require(!paidStatus[groupId][cycle][msg.sender], "Already paid for this cycle");

        // Pull USDC from member to contract
        if (usdcToken != address(0)) {
            bool success = IERC20(usdcToken).transferFrom(msg.sender, address(this), g.amountPerMember);
            require(success, "USDC transfer failed");
        }

        paidStatus[groupId][cycle][msg.sender] = true;
        cycleCollected[groupId][cycle] += g.amountPerMember;

        emit Contributed(groupId, cycle, msg.sender, block.timestamp);

        // Auto-release check: if total collected equals target total (amountPerMember * total members)
        uint256 totalTarget = g.amountPerMember * g.members.length;
        if (cycleCollected[groupId][cycle] >= totalTarget) {
            _releaseCycle(groupId, cycleCollected[groupId][cycle]);
        }
    }

    /**
     * @notice Admin manually releases pooled funds for overdue/partial cycle
     */
    function manualRelease(uint256 groupId) external {
        Group storage g = groups[groupId];
        require(msg.sender == g.admin, "Only admin can trigger manual release");
        uint256 cycle = g.currentCycle;
        uint256 collected = cycleCollected[groupId][cycle];
        require(collected > 0, "No funds collected in current cycle");

        _releaseCycle(groupId, collected);
    }

    /**
     * @dev Helper to release funds to recipient and advance cycle
     */
    function _releaseCycle(uint256 groupId, uint256 amountToRelease) internal {
        Group storage g = groups[groupId];
        uint256 cycle = g.currentCycle;

        // Transfer funds to recipient
        if (usdcToken != address(0) && amountToRelease > 0) {
            IERC20(usdcToken).transfer(g.recipient, amountToRelease);
        }

        emit CycleReleased(groupId, cycle, amountToRelease, block.timestamp);

        // Advance to next cycle
        g.currentCycle++;
        g.cycleStartTime = block.timestamp;
    }

    /**
     * @notice View detailed status of a specific cycle
     */
    function getCycleStatus(uint256 groupId, uint256 cycle)
        external
        view
        returns (
            address[] memory members,
            bool[] memory paid,
            uint256 totalCollected,
            uint256 targetAmount
        )
    {
        Group storage g = groups[groupId];
        members = g.members;
        paid = new bool[](members.length);
        for (uint256 i = 0; i < members.length; i++) {
            paid[i] = paidStatus[groupId][cycle][members[i]];
        }
        totalCollected = cycleCollected[groupId][cycle];
        targetAmount = g.amountPerMember * members.length;
    }

    /**
     * @notice View group details
     */
    function getGroup(uint256 groupId) external view returns (Group memory) {
        return groups[groupId];
    }
}
