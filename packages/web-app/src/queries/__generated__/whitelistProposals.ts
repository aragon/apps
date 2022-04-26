/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoterState } from "./../../../types/global_apollo";

// ====================================================
// GraphQL query operation: whitelistProposals
// ====================================================

export interface whitelistProposals_whitelistProposals_dao {
  __typename: "Dao";
  id: string;
}

export interface whitelistProposals_whitelistProposals_actions {
  __typename: "Action";
  id: string;
  to: any;
  value: any;
  data: any;
  execResult: any | null;
}

export interface whitelistProposals_whitelistProposals_pkg_users {
  __typename: "WhitelistVoter";
  id: string;
}

export interface whitelistProposals_whitelistProposals_pkg {
  __typename: "WhitelistPackage";
  id: string;
  supportRequiredPct: any | null;
  participationRequiredPct: any | null;
  minDuration: any | null;
  votesLength: any | null;
  users: whitelistProposals_whitelistProposals_pkg_users[];
}

export interface whitelistProposals_whitelistProposals_voters {
  __typename: "WhitelistVote";
  /**
   * VoterProposal for Many-to-Many
   */
  id: string;
  vote: VoterState;
  createdAt: any;
}

export interface whitelistProposals_whitelistProposals {
  __typename: "WhitelistProposal";
  id: string;
  dao: whitelistProposals_whitelistProposals_dao;
  actions: whitelistProposals_whitelistProposals_actions[];
  pkg: whitelistProposals_whitelistProposals_pkg;
  voteId: any;
  creator: any;
  metadata: string;
  startDate: any;
  endDate: any;
  supportRequiredPct: any;
  participationRequired: any;
  votingPower: any;
  yea: any | null;
  nay: any | null;
  abstain: any | null;
  voters: whitelistProposals_whitelistProposals_voters[];
  executed: boolean;
  createdAt: any;
}

export interface whitelistProposals {
  whitelistProposals: whitelistProposals_whitelistProposals[];
}

export interface whitelistProposalsVariables {
  dao?: string | null;
  offset?: number | null;
  limit?: number | null;
}
