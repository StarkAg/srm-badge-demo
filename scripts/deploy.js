async function main() {
    const [deployer] = await ethers.getSigners();
    
    if (!deployer) {
      throw new Error("No deployer account found. Make sure PRIVATE_KEY is set in .env file.");
    }
    
    console.log("Deploying with", deployer.address);
  
    const SRMBadge = await ethers.getContractFactory("SRMBadge");
    const srm = await SRMBadge.deploy();
    await srm.deployed();
    console.log("SRMBadge deployed to:", srm.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });