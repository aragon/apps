import {Address, ethereum} from '@graphprotocol/graph-ts';
import {
  assert,
  createMockedFunction,
  clearStore,
  test,
} from 'matchstick-as/assembly/index';
import {NewDAO} from '../generated/Registry/Registry';
import {Dao} from '../generated/schema';
import {handleNewDAO} from '../src/mapping';
import {createNewDaoEvent} from '../src/mocks/daoMocks';

test('Can call mappings with custom events', () => {
  // Initialise
  let dao = new Dao('0x0000000000000000000000000000000000000000');
  dao.save();

  // create new event
  let newDaoEvent = createNewDaoEvent(
    'mockDao-1',
    new Address(0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7),
    new Address(0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e8)
  );

  // launch event
  handleNewDAO(newDaoEvent);

  // checks
  assert.fieldEquals('Dao', '1', 'name', 'mockDao-1');

  clearStore();
});
