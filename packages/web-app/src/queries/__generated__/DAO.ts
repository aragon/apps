/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DAO
// ====================================================

export interface DAO_daos_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface DAO_daos_actions_proposal {
  __typename: "ERC20VotingProposal" | "WhitelistProposal";
  id: string;
}

export interface DAO_daos_actions {
  __typename: "Action";
  id: string;
  to: any;
  value: any;
  data: any;
  proposal: DAO_daos_actions_proposal;
}

export interface DAO_daos_deposits_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface DAO_daos_deposits {
  __typename: "VaultDeposit";
  id: string;
  token: DAO_daos_deposits_token;
  sender: any;
  amount: any;
  reference: string;
  transaction: string;
  createdAt: any;
}

export interface DAO_daos_withdraws_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface DAO_daos_withdraws_proposal {
  __typename: "ERC20VotingProposal" | "WhitelistProposal";
  id: string;
}

export interface DAO_daos_withdraws {
  __typename: "VaultWithdraw";
  id: string;
  token: DAO_daos_withdraws_token | null;
  to: any;
  amount: any;
  reference: string;
  transaction: string;
  proposal: DAO_daos_withdraws_proposal;
  createdAt: any;
}

export interface DAO_daos_balances_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface DAO_daos_balances {
  __typename: "Balance";
  id: string;
  token: DAO_daos_balances_token;
}

export interface DAO_daos_roles {
  __typename: "Role";
  id: string;
  where: any;
  role: any;
  frozen: boolean;
}

export interface DAO_daos_permissions_role {
  __typename: "Role";
  id: string;
}

export interface DAO_daos_permissions {
  __typename: "Permission";
  /**
   * no need to store granted as we can delete permission when revoked
   */
  id: string;
  where: any;
  role: DAO_daos_permissions_role;
  who: any;
  actor: any;
  oracle: any;
}

export interface DAO_daos_packages_pkg {
  __typename: "ERC20VotingPackage" | "WhitelistPackage";
  id: string;
}

export interface DAO_daos_packages {
  __typename: "DaoPackage";
  pkg: DAO_daos_packages_pkg;
}

export interface DAO_daos_proposals {
  __typename: "ERC20VotingProposal" | "WhitelistProposal";
  id: string;
  executed: boolean;
}

export interface DAO_daos {
  __typename: "Dao";
  id: string;
  name: string;
  creator: any;
  metadata: string | null;
  token: DAO_daos_token;
  actions: DAO_daos_actions[];
  deposits: DAO_daos_deposits[];
  withdraws: DAO_daos_withdraws[];
  balances: DAO_daos_balances[] | null;
  roles: DAO_daos_roles[];
  permissions: DAO_daos_permissions[];
  packages: DAO_daos_packages[] | null;
  proposals: DAO_daos_proposals[] | null;
}

export interface DAO {
  daos: DAO_daos[];
}

export interface DAOVariables {
  name?: string | null;
}
