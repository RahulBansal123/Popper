pragma solidity ^0.6.0;

contract User{
    struct UserDetails{
        string name;
        address wallet;
    }

    // Mapping of user's wallet to their id
    mapping(address => uint256) private usersWallet;

    // Mapping of user's id to their details
    mapping(uint256 => UserDetails) private users;

    event UserCreated(
        uint256 id,
        string name,
        address wallet
    );

    event UserUpdated(
        uint256 id,
        string name,
        address wallet
    );

    function createUser(uint256 _id, string memory _name, address _wallet) public{
        require(_wallet != address(0x0) && _id > 0 && bytes(_name).length > 0);
        users[_id] = UserDetails(_name,_wallet);
        usersWallet[_wallet] = _id;

        emit UserCreated(_id, _name, _wallet);
    }

    function updateUser(string memory _name, address _wallet) public{
        uint256 _id = usersWallet[_wallet];
        require(msg.sender == users[_id].wallet, "You are not authorized");
        require(_id != 0, "User does not exist");
        require(_wallet != address(0x0) && bytes(_name).length > 0);
        users[_id] = UserDetails(_name,_wallet);

        emit UserUpdated(_id, _name, _wallet);
    }
}




