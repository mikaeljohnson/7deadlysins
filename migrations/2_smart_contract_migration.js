const SmartContract = artifacts.require("ManicMinter");

module.exports = function (deployer) {
  deployer.deploy(SmartContract);
}; 
