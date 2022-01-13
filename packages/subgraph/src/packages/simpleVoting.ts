import {
  CastVote,
  ChangeMinQuorum,
  ChangeSupportRequired,
  StartVote
} from '../../generated/templates/SimpleVoting/SimpleVoting';
import {DAO as DAOContract} from '../../generated/templates/DAO/DAO';
import {DAO} from '../../generated/templates';
import {AllowedAction} from '../../generated/schema';
import {DataSourceContext} from '@graphprotocol/graph-ts';

export function handleCastVote(event: CastVote): void {}

export function handleChangeMinQuorum(event: ChangeMinQuorum): void {}

export function handleChangeSupportRequired(
  event: ChangeSupportRequired
): void {}

export function handleStartVote(event: StartVote): void {}
