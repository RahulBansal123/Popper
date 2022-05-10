// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PostContract{

    struct PostMultihash {	
        string digest;	
        uint8 hashFn;	
        uint8 size;	
        address owner;
    }
    uint public postId = 1;

    // Mapping of userId to array of post ids
    mapping(uint => uint[]) private postOwnerIds;

    // Mapping of postId to Post
    mapping(uint => PostMultihash) private postMetadataMultihashes;

    // Mapping of postId to total cheered amount
    mapping(uint => uint) private postCheeredAmount;


    // Events
    event PostCreated(uint postId, uint ownerId);
    event Cheered(uint postId, uint ownerId);


    // View the post metadata for a specific postId
    function getPost(uint _postId) view public returns (  
        string memory multihashDigest,
        uint8 multihashHashFn,
        uint8 multihashSize,
        address owner){
        PostMultihash memory postMultihash = postMetadataMultihashes[_postId];
        return (
            postMultihash.digest,
            postMultihash.hashFn,
            postMultihash.size,
            postMultihash.owner
        );
    }

    // Create a post
    function addPost(uint _postOwnerId, string calldata _multihashDigest, uint8 _multihashHashFn, uint8 _multihashSize) external returns (uint _postId){
        postMetadataMultihashes[postId] = PostMultihash({
            digest: _multihashDigest,
            hashFn: _multihashHashFn,
            size: _multihashSize,
            owner: msg.sender
        });
        postOwnerIds[_postOwnerId].push(postId);
        _postId = postId;
        postId += 1;
        require(postId != _postId, "expected incremented postId");

        emit PostCreated(_postId, _postOwnerId);
        return _postId;
    }

    // Cheer a creator on a post
    function cheerCreator(uint _postId) public payable{
        require(_postId > 0 && _postId < postId, "invalid postId");
        
        address _owner = postMetadataMultihashes[_postId].owner;
        require(_owner != address(0x0), "post does not exist");
        require(_owner != msg.sender, "cannot cheer yourself");

        payable(_owner).transfer(msg.value);
        postCheeredAmount[_postId] += msg.value;
    }
}