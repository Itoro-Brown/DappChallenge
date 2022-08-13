const hre = require("hardhat");
const ethers = require("hardhat");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

//This contract was deployed on this contract address : 0x0da90b1f329c7f860f582220c6c44f7dbfbb7e86

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

//This message will display the balance of the respective wallets.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses)
    console.log(`Address of ${idx} balance`, await getBalance(address));
  idx++;
}

// This function will display the complete information of the sender
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const buyer = memo.name;
    const buyerAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${buyer} with ${buyerAddress} said: ${message} `
    );
  }
}

async function main() {
  //Get some account example
  const [owner, buyer1, buyer2, buyer3] = await hre.ethers.getSigners();
  // To deploy the contract use the syntax
  const BuyMyNft = await hre.ethers.getContractFactory("BuyMyNft");
  const _BuyMyNft = await BuyMyNft.deploy();
  await _BuyMyNft.deployed();
  console.log(
    "This contract has been deployed to the address:",
    _BuyMyNft.address
  );

  //To check the balance of the various listed below before purchase
  const addresses = [owner.address, buyer1.address, _BuyMyNft.address];
  console.log("Printing addresses with balances...");
  await printBalances(addresses);
  console.log(addresses);

  //Buy yourself a nft
  const amount = { value: hre.ethers.utils.parseEther("1") };
  await _BuyMyNft.connect(buyer1).BuyNow("John", "Thank you", amount);
  await _BuyMyNft.connect(buyer2).BuyNow("Vito", "Something for you", amount);
  await _BuyMyNft.connect(buyer3).BuyNow("Kay", "Something for you", amount);

  //Check the updated balances
  console.log("Updated Balances");
  await printBalances(addresses);

  //TO withdraw the funds
  console.log("Withdrawal is processing...");
  await _BuyMyNft.connect(owner).FundsWithdrawal();

  //To print out the balances of the wallet after withdrawal
  console.log("Wallet balances as at last transaction...");
  await printBalances(addresses);

  //Log out all memos
  console.log("Loading logged in memos....");
  const memos = await _BuyMyNft.RetrieveMemos();
  printMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
