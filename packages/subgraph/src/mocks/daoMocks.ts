import {Address, ethereum} from '@graphprotocol/graph-ts';
import {
  assert,
  createMockedFunction,
  clearStore,
  test,
  newMockEvent,
  newMockCall,
} from 'matchstick-as/assembly/index';
import {NewDAO} from '../../generated/Registry/Registry';
import {Dao, ERC20Token} from '../../generated/schema';

export function createNewDaoEvent(
  name: string,
  dao: Address,
  creator: Address
): NewDAO {
  let newDaoEvent = changetype<NewDAO>(newMockEvent());

  newDaoEvent.parameters = new Array();

  let nameParam = new ethereum.EventParam(
    'name',
    ethereum.Value.fromString(name)
  );
  let daoParam = new ethereum.EventParam(
    'DAO',
    ethereum.Value.fromAddress(dao)
  );
  let creatorParam = new ethereum.EventParam(
    'creator',
    ethereum.Value.fromAddress(creator)
  );

  newDaoEvent.parameters.push(nameParam);
  newDaoEvent.parameters.push(daoParam);
  newDaoEvent.parameters.push(creatorParam);

  return newDaoEvent;
}
