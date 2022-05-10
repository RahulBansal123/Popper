// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Social {
    struct LevelMultihash {	
        string digest;	
        uint8 hashFn;	
        uint8 size;	
    }

    // Mapping of users to their level's details
    // Levels can be: 'basic', 'gold', 'platinum'
    mapping(uint => mapping(string => LevelMultihash)) private levelOwnerIds;

    // Mapping of user to owner and the level subscribed
    mapping(uint => mapping(string => uint[])) private userIds;

    // Events
    event LevelCreated(uint ownerId, string level);
    event LevelUpdated(uint ownerId, string level);

    // Modifier
    modifier levelExists(uint ownerId, string memory level) {
        require(keccak256(abi.encodePacked(levelOwnerIds[ownerId][level].digest))!=keccak256(abi.encodePacked("")),"Level doesn't exists");
        _;
    }   

    // Get level details of a user
    function getLevel(uint _ownerId, string memory _level) public levelExists(_ownerId, _level) view returns (  
        string memory digest,
        uint8 hashFn,
        uint8 size
    ) {
        LevelMultihash memory _levelMultihash = levelOwnerIds[_ownerId][_level];
        return (_levelMultihash.digest, _levelMultihash.hashFn, _levelMultihash.size);
    }

    // Create a level
    function addLevel(uint _ownerId, string calldata _level, string calldata _multihashDigest, uint8 _multihashHashFn, uint8 _multihashSize) external returns (bool status){
        levelOwnerIds[_ownerId][_level] = LevelMultihash({
            digest: _multihashDigest,
            hashFn: _multihashHashFn,
            size: _multihashSize
        });
        emit LevelCreated(_ownerId, _level);
        return true;
    }

    // Update a level
    function updateLevel(uint _ownerId, string calldata _level, string calldata _multihashDigest, uint8 _multihashHashFn, uint8 _multihashSize) external returns (bool updatePerformed){
        updatePerformed = false;

        if(keccak256(abi.encodePacked(levelOwnerIds[_ownerId][_level].digest)) != keccak256(abi.encodePacked(_multihashDigest))){
            levelOwnerIds[_ownerId][_level].digest = _multihashDigest;
            updatePerformed = true;
        }

        if(levelOwnerIds[_ownerId][_level].hashFn != _multihashHashFn){
            levelOwnerIds[_ownerId][_level].hashFn = _multihashHashFn;
            updatePerformed = true;
        }

        if(levelOwnerIds[_ownerId][_level].size != _multihashSize){
            levelOwnerIds[_ownerId][_level].size = _multihashSize;
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