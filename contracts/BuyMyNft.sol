//SPDX-License-Identifier : MIT;
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract BuyMyNft {
    //Event to emit when a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name_of_person,
        string message
    );
    //Create memo struct

    struct Memo {
        address from;
        uint256 timestamp;
        string name_of_person;
        string message;
    }

    //List of all memos received from buyers
    Memo[] memos;
    //Address of who deployed the contract and can also withdraw from the contract
    address payable owner;

    //Deploy logic

    constructor() {
        owner = payable(msg.sender);
    }

    //This function is to allow user buy mynft

    function BuyNow(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "Not enough Money to Purchase Nft!!!");

        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        //This would emit a logged event when a new memo is created.
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function BuyNowLarge(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value >= 3, "Not enough Money to Purchase Nft!!!");

        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        //This would emit a logged event when a new memo is created.
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function FundsWithdrawal() public {
        require(owner.send(address(this).balance));
    }

    //This function will withdraw all memos on the contract
    function RetrieveMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
