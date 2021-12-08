import { Address, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as/assembly/index";
import { NewDAO } from "../../generated/Registry/Registry";

export function createNewDaoEvent(
  name: string,
  dao: string,
  creator: string
): NewDAO {
  let newDaoEvent = changetype<NewDAO>(newMockEvent());
  // let newDaoEvent = newMockEvent() as NewDAO;

  newDaoEvent.parameters = new Array();

  let nameParam = new ethereum.EventParam(
    "name",
    ethereum.Value.fromString(name)
  );
  let daoParam = new ethereum.EventParam(
    "dao",
    ethereum.Value.fromAddress(Address.fromString(dao))
  );
  let creatorParam = new ethereum.EventParam(
    "creator",
    ethereum.Value.fromAddress(Address.fromString(creator))
  );

  newDaoEvent.parameters.push(nameParam);
  newDaoEvent.parameters.push(daoParam);
  newDaoEvent.parameters.push(creatorParam);

  return newDaoEvent;
}
