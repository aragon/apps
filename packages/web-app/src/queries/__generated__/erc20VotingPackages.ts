/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: erc20VotingPackages
// ====================================================

export interface erc20VotingPackages_erc20VotingPackages_proposals {
  __typename: "ERC20VotingProposal";
  id: string;
}

export interface erc20VotingPackages_erc20VotingPackages_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface erc20VotingPackages_erc20VotingPackages {
  __typename: "ERC20VotingPackage";
  id: string;
  proposals: erc20VotingPackages_erc20VotingPackages_proposals[];
  supportRequiredPct: any | null;
  participationRequiredPct: any | null;
  minDuration: any | null;
  votesLength: any | null;
  token: erc20VotingPackages_erc20VotingPackages_token | null;
}

export interface erc20VotingPackages {
  erc20VotingPackages: erc20VotingPackages_erc20VotingPackages[];
}

export interface erc20VotingPackagesVariables {
  id?: string | null;
}
