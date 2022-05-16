// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PostContract{

    struct PostMultihash {	
        string ipfsHash;	
        address owner;
    }
    uint public postId = 1;

    // Mapping of userId to array of post ids
    mapping(uint => uint[]) private postOwnerIds;

    // Mapping of postId to Post
    mapping(uint => PostMultihash) private postMetadataMultihashes;

    // Mapping of postId to total cheered amount
    mapping(uint => uint) private postCheeredAmount;

    // Mapping of userId to their level wise posts
    mapping(uint => mapping(string => uint[])) private userLevelPosts;


    // Events
    event PostCreated(uint indexed postId, uint indexed ownerId);
    event Cheered(uint indexed postId);


    // View the post metadata for a specific postId
    function getPost(uint _postId) view public returns (  
        string memory ipfsHash,
        address owner){
        PostMultihash memory postMultihash = postMetadataMultihashes[_postId];
        return (
            postMultihash.ipfsHash,
            postMultihash.owner
        );
    }

    // Create a post
    function addPost(uint _postOwnerId, string calldata _hash) external returns (uint _postId){
        postMetadataMultihashes[postId] = PostMultihash({
            ipfsHash: _hash,
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

        emit Cheered(_postId);
    }

    // Get total cheers of a post
    function getCheeredAmount(uint _postId) view public returns (uint _cheeredAmount){
        require(_postId > 0 && _postId < postId, "invalid postId");
        return postCheeredAmount[_postId];
    }

    // Add a post id to a user's level wise posts
    function addPostToUserLevelPosts(uint _userId, string calldata _level, uint _postId) external{
        require(_userId > 0, "invalid userId");
        require(_postId > 0 && _postId < postId, "invalid postId");

        userLevelPosts[_userId][_level].push(_postId);
    }

    // Get posts of a user for a specific level
    function getPostsForUser(uint _userId, string memory _level) view public returns (uint[] memory _posts){
        require(_userId > 0, "invalid userId");

        return userLevelPosts[_userId][_level];
    }
}