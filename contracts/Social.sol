pragma solidity ^0.6.0;

contract Social {

    struct LevelMultihash {	
        bytes32 digest;	
        uint8 hashFn;	
        uint8 size;	
        address owner;
    }

    // Mapping of users to their levels
    // Levels can be: 'basic', 'gold', 'platinum'
    mapping(uint => mapping(string=> LevelMultihash)) private levelOwnerIds;

    // Events
    event LevelCreated(uint ownerId, string level);

    // Get level details of a user
    function getLevel(uint _ownerId, string memory _level) public view returns (  
        bytes32 digest,
        uint8 hashFn,
        uint8 size,
        address owner
    ) {
        LevelMultihash memory _levelMultihas = levelOwnerIds[_ownerId][_level];
        return (
            _levelMultihas.digest,
            _levelMultihas.hashFn,
            _levelMultihas.size,
            _levelMultihas.owner
        );
    }

    // Create a level
    function addLevel(uint _ownerId, string calldata _level, bytes32 _multihashDigest, uint8 _multihashHashFn, uint8 _multihashSize) external returns (bool status){
        levelOwnerIds[_ownerId][_level] = LevelMultihash({
            digest: _multihashDigest,
            hashFn: _multihashHashFn,
            size: _multihashSize,
            owner: msg.sender
        });
        emit LevelCreated(_ownerId, _level);
        return true;
    }
    
    // function subscribe(){}
    // function unsubscribe(){}
}