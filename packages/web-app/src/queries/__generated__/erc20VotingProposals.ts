/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoterState } from "./../../../types/global_apollo";

// ====================================================
// GraphQL query operation: erc20VotingProposals
// ====================================================

export interface erc20VotingProposals_erc20VotingProposals_actions {
  __typename: "Action";
  id: string;
  to: any;
  value: any;
  data: any;
  execResult: any | null;
}

export interface erc20VotingProposals_erc20VotingProposals_pkg_token {
  __typename: "ERC20Token";
  id: string;
  name: string | null;
  symbol: string | null;
  decimals: any | null;
}

export interface erc20VotingProposals_erc20VotingProposals_pkg {
  __typename: "ERC20VotingPackage";
  id: string;
  supportRequiredPct: any | null;
  participationRequiredPct: any | null;
  minDuration: any | null;
  votesLength: any | null;
  token: erc20VotingProposals_erc20VotingProposals_pkg_token | null;
}

export interface erc20VotingProposals_erc20VotingProposals_voters {
  __typename: "ERC20Vote";
  /**
   * VoterProposal for Many-to-Many
   */
  id: string;
  vote: VoterState;
}

export interface erc20VotingProposals_erc20VotingProposals {
  __typename: "ERC20VotingProposal";
  id: string;
  actions: erc20VotingProposals_erc20VotingProposals_actions[];
  pkg: erc20VotingProposals_erc20VotingProposals_pkg;
  voteId: any;
  creator: any;
  metadata: string;
  startDate: any;
  endDate: any;
  snapshotBlock: any;
  supportRequiredPct: any;
  participationRequiredPct: any;
  yea: any | null;
  nay: any | null;
  abstain: any | null;
  votingPower: any;
  voters: erc20VotingProposals_erc20VotingProposals_voters[];
  executed: boolean;
  createdAt: any;
}

export interface erc20VotingProposals {
  erc20VotingProposals: erc20VotingProposals_erc20VotingProposals[];
}

export interface erc20VotingProposalsVariables {
  dao?: string | null;
  offset?: number | null;
  limit?: number | null;
}
