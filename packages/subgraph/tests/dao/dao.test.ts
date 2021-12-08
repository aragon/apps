import {
  assert,
  createMockedFunction,
  clearStore,
  test,
  log,
  logStore,
  newMockEvent,
} from 'matchstick-as/assembly/index';
import {Address, Bytes, ethereum} from '@graphprotocol/graph-ts';
import {NewDAO} from '../../generated/Registry/Registry';
import {Dao} from '../../generated/schema';
import {handleNewDAO} from '../../src/dao';
import {createNewDaoEvent} from './utils';

export {handleNewDAO};

test('Can call mappings with mock events', () => {
  let newDaoEvent = createNewDaoEvent(
    'mockDao2',
    '0xc8541aAE19C5069482239735AD64FAC3dCc52Ca2',
    '0xA592E80E5E5D194ab635064e15EA35E883aB75dC'
  );

  // launch event
  handleNewDAO(newDaoEvent);

  // checks

  let daoAddress = Address.fromString(
    '0xc8541aAE19C5069482239735AD64FAC3dCc52Ca2'
  ).toHexString();
  assert.fieldEquals('Dao', daoAddress, 'daoAddress', daoAddress);
  let daoCreator = Address.fromString(
    '0xA592E80E5E5D194ab635064e15EA35E883aB75dC'
  ).toHexString();
  assert.fieldEquals('Dao', daoAddress, 'creator', daoCreator);

  clearStore();
});
