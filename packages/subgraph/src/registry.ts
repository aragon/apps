import {NewDAORegistered} from '../generated/Registry/Registry';
import {DAO as DAOContract} from '../generated/templates/DAO/DAO';
import {DAO} from '../generated/templates';
import {Dao} from '../generated/schema';
import {DataSourceContext} from '@graphprotocol/graph-ts';

export function handleNewDAORegistered(event: NewDAORegistered): void {
  let id = event.params.dao.toHexString(); // use dao address as id, because it should not repeat
  let entity = Dao.load(id);

  if (entity == null) {
    entity = new Dao(id);

    // subscribe to templates
    DAO.create(event.params.dao);
  }

  entity.name = event.params.name;
  entity.daoAddress = event.params.dao;
  entity.creator = event.params.creator;

  entity.save();
}
