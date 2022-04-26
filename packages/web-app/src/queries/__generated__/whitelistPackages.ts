/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: whitelistPackages
// ====================================================

export interface whitelistPackages_whitelistPackages_proposals {
  __typename: "WhitelistProposal";
  id: string;
}

export interface whitelistPackages_whitelistPackages_users {
  __typename: "WhitelistVoter";
  id: string;
}

export interface whitelistPackages_whitelistPackages {
  __typename: "WhitelistPackage";
  id: string;
  proposals: whitelistPackages_whitelistPackages_proposals[];
  supportRequiredPct: any | null;
  participationRequiredPct: any | null;
  minDuration: any | null;
  votesLength: any | null;
  users: whitelistPackages_whitelistPackages_users[];
}

export interface whitelistPackages {
  whitelistPackages: whitelistPackages_whitelistPackages[];
}

export interface whitelistPackagesVariables {
  id?: string | null;
}
