const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenMaxSupply", (m) => {
  // fetch environment variables
  const adminWalletAddress = process.env.ADMIN_WALLET || "";
  const contractName = process.env.NAME || "";
  const contractSymbol = process.env.SYMBOL || "";
  // Default 1M max supply tokens
  const maxSupply = Number(process.env.MAX_SUPPLY || "1000000");
  // create IgnitionModule
  const tokenMaxSupply = m.contract("ERC20BaseMaxSupply", [
    adminWalletAddress,
    contractName,
    contractSymbol,
    BigInt((maxSupply * 10) ^ 18),
  ]);

  return { tokenMaxSupply };
});
