const {ethers} = require('hardhat');
const { assert, expect} = require('chai')

describe("SimpleStorage",function(){

  let simpleStorageFactory
  let simpleStorage
  beforeEach(async function(){
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number of 0",async function(){
    const curr = await simpleStorage.retrieve()
    const expected = "0"
    // assert 
    // expect
    assert.equal(curr.toString(), expected)
  })

  it("Should update when we call store", async function(){
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const curr = await simpleStorage.retrieve()
    assert.equal(curr.toString(), expectedValue)
    // expect(curr.toString()).toEqual(expectedValue)
  })

})