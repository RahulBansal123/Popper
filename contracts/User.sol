// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract User{
    struct UserDetails{
        string name;
        address wallet;
    }

    uint public userId = 1;

    // Mapping of user's wallet to their id
    mapping(address => uint256) private usersWallet;

    // Mapping of user's id to their details
    mapping(uint256 => UserDetails) private users;

    // Events
    event UserCreated(
        uint256 id,
        string indexed name,
        address indexed wallet
    );
    event UserUpdated(
        uint256 id,
        string indexed name,
        address indexed wallet
    );

    // Modifier
    modifier userExists(address wallet){
        require(usersWallet[wallet] == 0, 'User already exists');
        _;
    }
    modifier userCondition(address _wallet, string memory _name){
        require(_wallet != address(0x0) && bytes(_name).length > 0);
        _;
    }

    // Create a user
    function createUser(string memory _name) public userExists(msg.sender) userCondition(msg.sender, _name) returns (uint256 _userId){

        users[userId] = UserDetails(_name ,msg.sender);
        usersWallet[msg.sender] = userId;

        _userId = userId;
        userId += 1;
        require(userId != _userId, "expected incremented userId");

        emit UserCreated(_userId, _name, msg.sender);
        return _userId;
    }

    // Update a user
    function updateUser(string memory _name, address _wallet) userExists(_wallet) userCondition(_wallet, _name) public{
        uint256 _id = usersWallet[msg.sender];

        delete usersWallet[msg.sender];

        users[_id] = UserDetails(_name,_wallet);
        usersWallet[_wallet] = _id;

        emit UserUpdated(_id, _name, _wallet);
    }

    // Get user details
    function getUser(address _wallet) public view returns (uint256 id, string memory name, address wallet){
        id = usersWallet[_wallet];
        name = users[id].name;
        return (id, name, _wallet);
    }
}