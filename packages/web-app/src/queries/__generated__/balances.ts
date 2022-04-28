/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: balances
// ====================================================

export interface balances_balances_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface balances_balances_dao {
  __typename: "Dao";
  id: string;
}

export interface balances_balances {
  __typename: "Balance";
  id: string;
  token: balances_balances_token;
  dao: balances_balances_dao;
  balance: any;
  lastUpdated: any;
}

export interface balances {
  balances: balances_balances[];
}

export interface balancesVariables {
  dao?: string | null;
  offset?: number | null;
  limit?: number | null;
}
