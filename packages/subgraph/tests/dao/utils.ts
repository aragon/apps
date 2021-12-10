import { Address, ethereum, Bytes } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as/assembly/index";
import { NewDAO } from "../../generated/Registry/Registry";
import { createMockGetter } from "../utils";
import {
  executorAddress,
  processesAddress,
  permissionAddress,
} from "../constants";

export function createNewDaoEvent(
  name: string,
  dao: string,
  creator: string
): NewDAO {
  let newDaoEvent = changetype<NewDAO>(newMockEvent());

  newDaoEvent.parameters = new Array();

  let nameParam = new ethereum.EventParam(
    "name",
    ethereum.Value.fromBytes(Bytes.fromUTF8(name))
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

export function handleNewDAOMappingCalls(contractAddress: string): void {
  createMockGetter(contractAddress, "processes", "processes():(address)", [
    ethereum.Value.fromAddress(Address.fromString(processesAddress)),
  ]);

  createMockGetter(contractAddress, "permissions", "permissions():(address)", [
    ethereum.Value.fromAddress(Address.fromString(permissionAddress)),
  ]);

  createMockGetter(contractAddress, "executor", "executor():(address)", [
    ethereum.Value.fromAddress(Address.fromString(executorAddress)),
  ]);

  createMockGetter(contractAddress, "metadata", "metadata():(bytes)", [
    ethereum.Value.fromBytes(
      Bytes.fromHexString(
        Bytes.fromUTF8("Some meta data...").toHexString()
      ) as Bytes
    ),
  ]);
}
