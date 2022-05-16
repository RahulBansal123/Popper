// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Social {
    // Mapping of users to their level's details
    // Levels can be: 'basic', 'gold', 'platinum'
    mapping(uint => mapping(string => string)) private levelOwnerIds;

    // Mapping of user to owner and the level subscribed
    mapping(uint => mapping(string => uint[])) private userIds;

    // Events
    event LevelCreated(uint ownerId, string level);
    event LevelUpdated(uint ownerId, string level);

    // Modifier
    modifier levelExists(uint ownerId, string memory level) {
        require(keccak256(abi.encodePacked(levelOwnerIds[ownerId][level]))!=keccak256(abi.encodePacked("")),"Level doesn't exists");
        _;
    }   

    // Get level details of a user
    function getLevel(uint _ownerId, string memory _level) public levelExists(_ownerId, _level) view returns (  
        string memory _ipfsHash
    ) {
        return levelOwnerIds[_ownerId][_level];
    }

    // Create a level
    function addLevel(uint _ownerId, string calldata _level, string calldata _ipfsHash) external returns (bool status){
        levelOwnerIds[_ownerId][_level] = _ipfsHash;
        emit LevelCreated(_ownerId, _level);
        return true;
    }

    // Update a level
    function updateLevel(uint _ownerId, string calldata _level, string calldata _ipfsHash) external returns (bool updatePerformed){
        updatePerformed = false;

        if(keccak256(abi.encodePacked(levelOwnerIds[_ownerId][_level])) != keccak256(abi.encodePacked(_ipfsHash))){
            levelOwnerIds[_ownerId][_level] = _ipfsHash;
            updatePerformed = true;
        }

        emit LevelUpdated(_ownerId, _level);
        return updatePerformed;
    }
    
    // Subscribe a user to a level
    function subscribe(uint _ownerId, uint _userId, string calldata _level) external levelExists(_ownerId, _level) returns (bool subscribed){
        userIds[_userId][_level].push(_ownerId);      
        return true;  
    }
}