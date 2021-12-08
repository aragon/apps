import {NewDAO} from '../generated/Registry/Registry';
import {Dao} from '../generated/schema';

export function handleNewDAO(event: NewDAO): void {
  // handle new DAO
  let DAO = new Dao(event.params.dao.toHexString());
  DAO.name = event.params.name.toHexString();
  DAO.dao = event.params.dao;
  DAO.creator = event.params.creator;

  DAO.save();
}
