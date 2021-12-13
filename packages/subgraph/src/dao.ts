import {NewDAO} from '../generated/Registry/Registry';
import {DAO as DAOContract} from '../generated/templates/DAO/DAO';
import {DAO, Processes, Permissions} from '../generated/templates';
import {Dao} from '../generated/schema';
import {log} from 'matchstick-as/assembly/index';

export function handleNewDAO(event: NewDAO): void {
  let DaoEntity = new Dao(event.params.dao.toHexString()); // use dao address as id, because it should not repeat

  DaoEntity.name = event.params.name.toString();

  DaoEntity.daoAddress = event.params.dao;
  DaoEntity.creator = event.params.creator;

  let daoContract = DAOContract.bind(event.params.dao);
  let processesAddress = daoContract.processes();
  let permissionsAddress = daoContract.permissions();

  DaoEntity.metadata = daoContract.metadata();
  DaoEntity.processes = processesAddress;
  DaoEntity.permissions = permissionsAddress;
  DaoEntity.executor = daoContract.executor();

  // subscribe to templates
  DAO.create(event.params.dao);
  Processes.create(processesAddress);
  Permissions.create(permissionsAddress);

  DaoEntity.save();
}
