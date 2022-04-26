/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: transfers
// ====================================================

export interface transfers_vaultDeposits_dao {
  __typename: "Dao";
  id: string;
}

export interface transfers_vaultDeposits_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface transfers_vaultDeposits {
  __typename: "VaultDeposit";
  id: string;
  dao: transfers_vaultDeposits_dao;
  token: transfers_vaultDeposits_token;
  sender: any;
  amount: any;
  reference: string;
  transaction: string;
  createdAt: any;
}

export interface transfers_vaultWithdraws_dao {
  __typename: "Dao";
  id: string;
}

export interface transfers_vaultWithdraws_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface transfers_vaultWithdraws_proposal {
  __typename: "ERC20VotingProposal" | "WhitelistProposal";
  id: string;
}

export interface transfers_vaultWithdraws {
  __typename: "VaultWithdraw";
  id: string;
  dao: transfers_vaultWithdraws_dao;
  token: transfers_vaultWithdraws_token | null;
  to: any;
  amount: any;
  reference: string;
  transaction: string;
  proposal: transfers_vaultWithdraws_proposal;
  createdAt: any;
}

export interface transfers {
  vaultDeposits: transfers_vaultDeposits[];
  vaultWithdraws: transfers_vaultWithdraws[];
}

export interface transfersVariables {
  dao?: string | null;
  offset?: number | null;
  limit?: number | null;
}
