import {assert, clearStore, test, logStore} from 'matchstick-as/assembly/index';
import {Address, BigInt} from '@graphprotocol/graph-ts';
import {ERC20VotingPackage, ERC20VotingProposal} from '../../generated/schema';
import {
  ADDRESS_ONE,
  DAO_TOKEN_ADDRESS,
  ERC20_VOTING_ADDRESS,
  STRING_DATA,
  DAO_ADDRESS
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
    Address.fromString(ERC20_VOTING_ADDRESS).toHexString()
  );
  erc20VotingPackage.save();

  // create calls
  let voteId = '0';
  let startDate = '1644851000';
  let endDate = '1644852000';
  let snapshotBlock = '100';
  let supportRequiredPct = '1000';
  let minAcceptQuorumPct = '500';
  let votingPower = '1000';
  getVotesLengthCall(ERC20_VOTING_ADDRESS, '1');
  let actions = createDummyAcctions(DAO_TOKEN_ADDRESS, '0', '0x00000000');
  createGetVoteCall(
    ERC20_VOTING_ADDRESS,
    voteId,
    true,
    false,
    startDate,
    endDate,
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
    ADDRESS_ONE,
    STRING_DATA,
    ERC20_VOTING_ADDRESS
  );

  // handle event
  _handleStartVote(event, DAO_ADDRESS);

  let entityID =
    Address.fromString(ERC20_VOTING_ADDRESS).toHexString() +
    '_' +
    BigInt.fromString(voteId).toHexString();
  let packageId = Address.fromString(ERC20_VOTING_ADDRESS).toHexString();

  // checks
  assert.fieldEquals('ERC20VotingProposal', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'dao', DAO_ADDRESS);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'pkg', packageId);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'voteId', voteId);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'creator', ADDRESS_ONE);
  assert.fieldEquals(
    'ERC20VotingProposal',
    entityID,
    'description',
    STRING_DATA
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
    Address.fromString(ERC20_VOTING_ADDRESS).toHexString(),
    'votesLength',
    '1'
  );

  clearStore();
});

test('Run ERC Voting (handleCastVote) mappings with mock event', () => {
  // create state
  let proposalId =
    Address.fromString(ERC20_VOTING_ADDRESS).toHexString() + '_' + '0x0';
  let erc20VotingProposal = new ERC20VotingProposal(proposalId);
  erc20VotingProposal.save();

  // create calls
  let voteId = '0';
  let startDate = '1644851000';
  let endDate = '1644852000';
  let snapshotBlock = '100';
  let supportRequiredPct = '1000';
  let minAcceptQuorumPct = '500';
  let votingPower = '1000';
  let actions = createDummyAcctions(DAO_TOKEN_ADDRESS, '0', '0x00000000');
  createGetVoteCall(
    ERC20_VOTING_ADDRESS,
    voteId,
    true,
    false,
    startDate,
    endDate,
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
    ADDRESS_ONE,
    true,
    '10000',
    ERC20_VOTING_ADDRESS
  );

  handleCastVote(event);

  // checks
  let entityID = ADDRESS_ONE + '_' + proposalId;
  assert.fieldEquals('ERC20Vote', entityID, 'id', entityID);

  // check voter
  assert.fieldEquals('ERC20VotingVoter', ADDRESS_ONE, 'id', ADDRESS_ONE);

  // check proposal
  assert.fieldEquals('ERC20VotingProposal', proposalId, 'yea', '1');

  clearStore();
});

test('Run ERC Voting (handleExecuteVote) mappings with mock event', () => {
  // create state
  let entityID =
    Address.fromString(ERC20_VOTING_ADDRESS).toHexString() + '_' + '0x0';
  let erc20VotingProposal = new ERC20VotingProposal(entityID);
  erc20VotingProposal.save();

  // create event
  let event = createNewExecuteVoteEvent('0', ERC20_VOTING_ADDRESS);

  // handle event
  handleExecuteVote(event);

  // checks
  assert.fieldEquals('ERC20VotingProposal', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingProposal', entityID, 'executed', 'true');

  clearStore();
});

test('Run ERC Voting (handleUpdateConfig) mappings with mock event', () => {
  // create state
  let entityID = Address.fromString(ERC20_VOTING_ADDRESS).toHexString();
  let erc20VotingPackage = new ERC20VotingPackage(entityID);
  erc20VotingPackage.save();

  // create event
  let event = createNewUpdateConfigEvent(
    '1',
    '2',
    '3600',
    ERC20_VOTING_ADDRESS
  );

  // handle event
  handleUpdateConfig(event);

  // checks
  assert.fieldEquals('ERC20VotingPackage', entityID, 'id', entityID);
  assert.fieldEquals('ERC20VotingPackage', entityID, 'supportRequiredPct', '1');
  assert.fieldEquals('ERC20VotingPackage', entityID, 'minAcceptQuorumPct', '2');
  assert.fieldEquals('ERC20VotingPackage', entityID, 'minDuration', '3600');

  clearStore();
});