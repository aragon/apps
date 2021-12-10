import {
  assert,
  clearStore,
  test,
  log,
  createMockedFunction,
} from "matchstick-as/assembly/index";
import { Address, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { NewDAO } from "../../generated/Registry/Registry";
import { Dao } from "../../generated/schema";
import { handleNewDAO } from "../../src/dao";
import { createNewDaoEvent } from "./utils";
import { handleNewDAOMappingCalls } from "./utils";
import { daoAddress, addressOne, processesAddress } from "../constants";

test("Run dao mappings with mock event", () => {
  // create event
  let newDaoEvent = createNewDaoEvent("mock-Dao", daoAddress, addressOne);

  let entityID = Address.fromString(daoAddress).toHexString();

  // create necesary mock calls
  handleNewDAOMappingCalls(entityID);

  // handle event
  handleNewDAO(newDaoEvent);

  // checks
  assert.fieldEquals("Dao", entityID, "id", entityID);
  assert.fieldEquals("Dao", entityID, "name", "mock-Dao");
  assert.fieldEquals("Dao", entityID, "daoAddress", entityID);
  let daoCreator = Address.fromString(addressOne).toHexString();
  assert.fieldEquals("Dao", entityID, "creator", daoCreator);

  clearStore();
});

test("Run dao mappings with mock calls", () => {
  // create event
  let newDaoEvent = createNewDaoEvent("mock-Dao", daoAddress, addressOne);

  let entityID = Address.fromString(daoAddress).toHexString();

  // create necesary mock calls
  handleNewDAOMappingCalls(entityID);

  // handle event
  handleNewDAO(newDaoEvent);

  // checks
  let call = ethereum.call(
    new ethereum.SmartContractCall(
      "Dao",
      Address.fromString(daoAddress),
      "processes",
      "processes():(address)",
      []
    )
  )![0];

  assert.equals(
    ethereum.Value.fromAddress(Address.fromString(processesAddress)),
    call
  );

  clearStore();
});
