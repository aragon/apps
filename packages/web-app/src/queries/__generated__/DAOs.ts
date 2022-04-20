/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DAOs
// ====================================================

export interface DAOs_daos_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface DAOs_daos_deposits {
  __typename: "VaultDeposit";
  id: string;
}

export interface DAOs_daos_withdraws {
  __typename: "VaultWithdraw";
  id: string;
}

export interface DAOs_daos_balances {
  __typename: "Balance";
  id: string;
}

export interface DAOs_daos_roles {
  __typename: "Role";
  id: string;
}

export interface DAOs_daos_permissions {
  __typename: "Permission";
  /**
   * no need to store granted as we can delete permission when revoked
   */
  id: string;
}

export interface DAOs_daos_packages_pkg {
  __typename: "ERC20VotingPackage" | "WhitelistPackage";
  id: string;
}

export interface DAOs_daos_packages {
  __typename: "DaoPackage";
  pkg: DAOs_daos_packages_pkg;
}

export interface DAOs_daos_proposals {
  __typename: "ERC20VotingProposal" | "WhitelistProposal";
  id: string;
  executed: boolean;
}

export interface DAOs_daos {
  __typename: "Dao";
  id: string;
  name: string;
  creator: any;
  metadata: string | null;
  token: DAOs_daos_token;
  deposits: DAOs_daos_deposits[];
  withdraws: DAOs_daos_withdraws[];
  balances: DAOs_daos_balances[] | null;
  roles: DAOs_daos_roles[];
  permissions: DAOs_daos_permissions[];
  packages: DAOs_daos_packages[] | null;
  proposals: DAOs_daos_proposals[] | null;
}

export interface DAOs {
  daos: DAOs_daos[];
}

export interface DAOsVariables {
  offset?: number | null;
  limit?: number | null;
}
