import { expect } from 'chai'
import { BigNumberish, Signer } from 'ethers'
import { BytesLike, hexDataSlice, id, keccak256, toUtf8Bytes } from 'ethers/lib/utils'
import { ethers } from 'hardhat'
import { defaultAbiCoder } from 'ethers/lib/utils'

import {
    SimpleVoting
} from '../../typechain'

const ERRORS = {
    ERROR_INIT_PCTS: "VOTING_INIT_PCTS",
    ERROR_INIT_SUPPORT_TOO_BIG: "VOTING_INIT_SUPPORT_TOO_BIG",
    NOT_ALLOWED_ACTION: 'Not allowed action passed!'
}

const ROLES = {
    PROCESS_ADD_ALLOWED_ACTIONS: keccak256(toUtf8Bytes('PROCESS_ADD_ALLOWED_ACTIONS'))
}

const EVENTS = {
  REGISTERED_CALLBACK: 'RegisteredCallback',
  REGISTERED_STANDARD: 'RegisteredStandard',
  RECEIVED_CALLBACK: 'ReceivedCallback',
}

function createProposal(
    {actions, metadata, description, castVote, executeIfDecided}: 
    {actions?: any, metadata?: string, description?: string, castVote?: boolean, executeIfDecided?: boolean}
) {
    const proposal = {
        actions : actions,
        metadata: metadata || '0x',
        additionalArguments: defaultAbiCoder.encode([
            'string',
            'bool',
            'bool'
        ],[
            description || '0x',
            castVote || false,
            executeIfDecided || false
        ])
    }

    return proposal
}

const beefInterfaceId = '0xbeefbeef'
const callbackSig = hexDataSlice(id('callbackFunc()'), 0, 4) // 0x1eb2075a
const magicNumber = '0x10000000'
const magicNumberReturn = magicNumber + '0'.repeat(56)

describe('Voting: SimpleVoting', function () {
    let voting: SimpleVoting;
    let daoMock: any;
    let erc20VoteMock: any;
    let ownerAddress: string;
  
    before(async () => {
        const signers = await ethers.getSigners()
        ownerAddress = await signers[0].getAddress()

        const DAOMock = await ethers.getContractFactory('DAOMock')
        const ERC20VoteMock = await ethers.getContractFactory('ERC20VoteMock') 
        
        daoMock = await DAOMock.deploy(ownerAddress)
        erc20VoteMock = await ERC20VoteMock.deploy()
    })

    beforeEach(async () => {
        const SimpleVoting = await ethers.getContractFactory('SimpleVoting')
        voting = await SimpleVoting.deploy() 

        // await daoMock.grant(voting.address, ownerAddress, ROLES.PROCESS_ADD_ALLOWED_ACTIONS);
    })

    function initializeVoting(voteSettings: any, allowedActions: BytesLike[]) {
        return voting['initialize(address,address,uint64[3],bytes[])']
            (
                daoMock.address, 
                erc20VoteMock.address, 
                voteSettings, 
                allowedActions
            )   
    }

    describe("initialize: ", async () => {
        it("should revert if quorom is less than support required", async () => {
            await expect(initializeVoting([2, 1,3],[])).to.be.revertedWith(ERRORS.ERROR_INIT_PCTS)
        })
        it("should revert if quorom is less than support required", async () => {
            // TODO: add bignumber so that second number in array is more than PCT_BASE
            // await expect(
            //     voting['initialize(address,address,uint64[3],bytes[])']
            //            (daoMock.address, erc20VoteMock.address, [1, 2, 3], [])
            // ).to.be.revertedWith(ERRORS.ERROR_INIT_PCTS)
        })

        it("should initialize dao on the component", async () => {
            // TODO: Waffle's calledOnContractWith is not supported by Hardhat
            // await voting['initialize(address,address,uint64[3],bytes[])']
            //          (daoMock.address, erc20VoteMock.address, [1, 2, 3], [])
            
            // expect('initialize').to.be.calledOnContractWith(voting, [daoMock.address]);
        })
    })

    describe("Start Vote", async () => {
        beforeEach(async () => {
            await initializeVoting([1, 2, 3], [])
        })
        it("should revert if allowed action is not passed through proposal", async () => {
            const proposal = createProposal({
                actions: [{
                    to: ownerAddress,
                    data: '0x00000000',
                    value: 0
                }]
            })
            await expect(voting.start(proposal)).to.be.revertedWith(ERRORS.NOT_ALLOWED_ACTION)
        })

        it("should revert if allowed action is not passed through proposal", async () => {
            const proposal = createProposal({
                actions: [{
                    to: ownerAddress,
                    data: '0x00000000',
                    value: 0
                }]
            })

            // TODO: pass correctly
            // await voting.addAllowedActions([
            //     ownerAddress + '0x00000000'
            // ])
            
            // await expect(voting.start(proposal)).to.be.revertedWith(ERRORS.NOT_ALLOWED_ACTION)
        })
    })


})
