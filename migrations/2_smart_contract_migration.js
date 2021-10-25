const SmartContract = artifacts.require("SevenDeadlySins");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "Seven Deadly Sins", "$7DS", "ipfs://QmbPkwYNQn7t6CLAgFtvhPdvp3egGxeaQHBXA7s6tBF278/");
};
