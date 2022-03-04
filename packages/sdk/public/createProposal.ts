import Proposal, { ProposalObject } from "../internal/proposal/Proposal";
import { ContextConfiguration } from "./init";

export { ProposalObject } from "../internal/proposal/Proposal";

/**
 * Creates a proposal for the given DAO.
 * 
 * @method createProposal 
 * 
 * @param proposal The proposal object with all his properties.
 * @param config The optional config argument to pass in case a specific property from the global context has to be overwritten
 * 
 * @public
 * 
 * @returns 
 */
export function createProposal(proposal: ProposalObject, config: ContextConfiguration): Proposal {
    return new Proposal(proposal, config).create();
}
