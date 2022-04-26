/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoterState } from "./../../../types/global_apollo";

// ====================================================
// GraphQL query operation: whitelistProposal
// ====================================================

export interface whitelistProposal_whitelistProposals_dao {
  __typename: "Dao";
  id: string;
}

export interface whitelistProposal_whitelistProposals_actions {
  __typename: "Action";
  id: string;
  to: any;
  value: any;
  data: any;
  execResult: any | null;
}

export interface whitelistProposal_whitelistProposals_pkg_users {
  __typename: "WhitelistVoter";
  id: string;
}

export interface whitelistProposal_whitelistProposals_pkg {
  __typename: "WhitelistPackage";
  id: string;
  supportRequiredPct: any | null;
  participationRequiredPct: any | null;
  minDuration: any | null;
  votesLength: any | null;
  users: whitelistProposal_whitelistProposals_pkg_users[];
}

export interface whitelistProposal_whitelistProposals_voters {
  __typename: "WhitelistVote";
  /**
   * VoterProposal for Many-to-Many
   */
  id: string;
  vote: VoterState;
  createdAt: any;
}

export interface whitelistProposal_whitelistProposals {
  __typename: "WhitelistProposal";
  id: string;
  dao: whitelistProposal_whitelistProposals_dao;
  actions: whitelistProposal_whitelistProposals_actions[];
  pkg: whitelistProposal_whitelistProposals_pkg;
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
  voters: whitelistProposal_whitelistProposals_voters[];
  executed: boolean;
  createdAt: any;
}

export interface whitelistProposal {
  whitelistProposals: whitelistProposal_whitelistProposals[];
}

export interface whitelistProposalVariables {
  id?: string | null;
}
