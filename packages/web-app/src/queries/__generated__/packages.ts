/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: packages
// ====================================================

export interface packages_daoPackages_dao {
  __typename: "Dao";
  id: string;
}

export interface packages_daoPackages_pkg {
  __typename: "ERC20VotingPackage" | "WhitelistPackage";
  id: string;
}

export interface packages_daoPackages {
  __typename: "DaoPackage";
  id: string;
  dao: packages_daoPackages_dao;
  pkg: packages_daoPackages_pkg;
}

export interface packages {
  daoPackages: packages_daoPackages[];
}

export interface packagesVariables {
  dao?: string | null;
}
