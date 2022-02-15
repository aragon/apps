import {assert, clearStore, test, logStore} from 'matchstick-as/assembly/index';
import {Address, BigInt} from '@graphprotocol/graph-ts';
import {ERC20VotingPackage, ERC20VotingProposal} from '../../generated/schema';
import {
  addressOne,
  daiAddress,
  votingAddress,
  dataString,
  daoAddress
} from '../constants';
import {
  createDummyAcctions,
  createGetVoteCall,
  createNewCastVoteEvent,
  createNewExecuteVoteEvent,
  createNewStartVoteEvent,
  createNewUpdateConfigEvent,
  getVotesLengthCall
} from './utils';
import {
  handleCastVote,
  handleExecuteVote,
  handleUpdateConfig,
  _handleStartVote
} from '../../src/packages/ERC20Voting/erc20Voting';

test('Run ERC Voting (handleStartVote) mappings with mock event', () => {
  // create state
  let erc20VotingPackage = new ERC20VotingPackage(
    Address.fromString(votingAddress).toHexString()
  );
  erc20VotingPackage.save();

  // create calls
  let voteId = '0';
  let startDate = '1644851000';
  let snapshotBlock = '100';
  let supportRequiredPct = '1000';
  let minAcceptQuorumPct = '500';
  let votingPower = '1000';
  getVotesLengthCall(votingAddress, '1');
  let actions = createDummyAcctions(daiAddress, '0', '0x00000000');
  createGetVoteCall(
    votingAddress,
    voteId,
    true,
    false,
    startDate,
    snapshotBlock,
    supportRequiredPct,
    minAcceptQuorumPct,
    '0',
    '0',
    votingPower,
    actions
  );

  // create event
  let event = createNewStartVoteEvent(
    voteId,
    addressOne,
    dataString,
    votingAddress
  );

  // handle event
  _handleStartVote(event, daoAddress);

  let entityID =
    Address.fromString(votingAddress).toHexString() +
    '_' +
    BigInt.fromString(voteId).toHexString();
  let packageId = Address.fromString(votingAddress).toHexString();

  // checks
  assert.fieldEquals('ERC20VotingProposal', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'dao', daoAddress);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'pkg', packageId);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'evPkg', packageId);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'voteId', voteId);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'creator', addressOne);
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'description',
    dataString
  );
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'createdAt',
    event.block.timestamp.toString()
  );
  assert.fieldEquals('ERC20VotingProposal', entityID, 'startDate', startDate);
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'snapshotBlock',
    snapshotBlock
  );
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'supportRequiredPct',
    supportRequiredPct
  );
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'minAcceptQuorumPct',
    minAcceptQuorumPct
  );
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'votingPower',
    votingPower
  );
  assert.fieldEquals('ERC20VotingProposal', entityID, 'executed', 'false');

  // chack ERC20VotingPackage
  assert.fieldEquals(
    'ERC20VotingPackage',
    Address.fromString(votingAddress).toHexString(),
    'votesLength',
    '1'
  );

  clearStore();
});

test('Run ERC Voting (handleCastVote) mappings with mock event', () => {
  // create state
  let proposalId =
    Address.fromString(votingAddress).toHexString() + '_' + '0x0';
  let erc20VotingProposal = new ERC20VotingProposal(proposalId);
  erc20VotingProposal.save();

  // create calls
  let voteId = '0';
  let startDate = '1644851000';
  let snapshotBlock = '100';
  let supportRequiredPct = '1000';
  let minAcceptQuorumPct = '500';
  let votingPower = '1000';
  let actions = createDummyAcctions(daiAddress, '0', '0x00000000');
  createGetVoteCall(
    votingAddress,
    voteId,
    true,
    false,
    startDate,
    snapshotBlock,
    supportRequiredPct,
    minAcceptQuorumPct,
    '1',
    '0',
    votingPower,
    actions
  );

  // create event
  let event = createNewCastVoteEvent(
    voteId,
    addressOne,
    true,
    '10000',
    votingAddress
  );

  handleCastVote(event);

  // checks
  let entityID = addressOne + '_' + proposalId;
  assert.fieldEquals('ERC20VotingVoterProposal', entityID, 'id', entityID);

  // check voter
  assert.fieldEquals('ERC20VotingVoter', addressOne, 'id', addressOne);

  // check proposal
  assert.fieldEquals('ERC20VotingProposal', proposalId, 'yea', '1');

  clearStore();
});

test('Run ERC Voting (handleExecuteVote) mappings with mock event', () => {
  // create state
  let entityID = Address.fromString(votingAddress).toHexString() + '_' + '0x0';
  let erc20VotingProposal = new ERC20VotingProposal(entityID);
  erc20VotingProposal.save();

  // create event
  let event = createNewExecuteVoteEvent('0', votingAddress);

  // handle event
  handleExecuteVote(event);

  // checks
  assert.fieldEquals('ERC20VotingProposal', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'executed', 'true');

  clearStore();
});

test('Run ERC Voting (handleUpdateConfig) mappings with mock event', () => {
  // create state
  let entityID = Address.fromString(votingAddress).toHexString();
  let erc20VotingPackage = new ERC20VotingPackage(entityID);
  erc20VotingPackage.save();

  // create event
  let event = createNewUpdateConfigEvent('1', '2', votingAddress);

  // handle event
  handleUpdateConfig(event);

  // checks
  assert.fieldEquals('ERC20VotingPackage', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingPackage', entityID, 'supportRequiredPct', '1');
  assert.fieldEquals('ERC20VotingPackage', entityID, 'minAcceptQuorumPct', '2');

  clearStore();
});
