const hre = require("hardhat");
const { ethers, run, network } = require("hardhat");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

async function main() {
  const BuyMyNft = await hre.ethers.getContractFactory("BuyMyNft");
  const _BuyMyNft = await BuyMyNft.deploy();
  await _BuyMyNft.deployed();
  console.log("Deploying contract, please wait!");

  console.log(`Deployed contract to this address: ${_BuyMyNft.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
