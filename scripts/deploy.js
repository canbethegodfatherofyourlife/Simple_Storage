const {ethers,run,network} = require("hardhat");

async function main() {

  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log("Deploying Contract....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed() 
  
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  // if default network on hardhat is deployed on --> not need verifications

  if (network.config.chainId === 4 && process.env.ETHERSCAN){
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address,[])
  }


  const curr = await simpleStorage.retrieve()
  console.log(`Current Value is ${curr}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Current Value is ${updatedValue}`)

}

async function verify(contractAddress,args){
  console.log("Verifying contract....")

  try{
    await run("verify:verify",{
      address: contractAddress,
      constructorArguments: args,
    })
  }catch(err){
    if (err.message.toLowerCase().includes("already verified")){
      console.log("Already verified")
    }else{
      console.log(err)
    }
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
