import { BigNumberish } from "@ethersproject/bignumber";
import { createProposal } from "./createProposal";
import { ContextConfiguration } from "./init";
import { DAO } from "../internal/abi/dao/DAO";
import Configuration from "../internal/context/Context";
import Proposal from "../internal/proposal/Proposal";

/**
 * Creates a proposal on the passed DAO with the action to withdraw a token from it to the specified receiver address.
 * 
 * @param token {string} The token address to withdraw
 * @param to {string} The receiving address
 * @param amount {BigNumberish} The amount of tokens to withdraw
 * @param reference {string} The reference string required for accounting
 * @param proposalMetadata {string} The IPFS hash of the proposal metadata
 * @param executeIfDecided {boolean} The bool value to define if it already should get executed if the vote does get directly casted and it could be executed.
 * @param castVote {boolean} The bool value to define if on proposal creation the vote of the creator already should get casted with YES.
 * @param config {ConfigurationObject} The optional config object to pass in case it should be executed within another context as the global one
 * 
 * @returns {EventEmitter}
 */
export function withdraw(
    token: string,
    to: string,
    amount: BigNumberish,
    reference: string,
    proposalMetadata: object,
    executeIfDecided: boolean = false,
    castVote: boolean = false,
    config?: ContextConfiguration
): Proposal {
    return createProposal(
        {
            metadata: proposalMetadata, 
            actions: [{
                to: Configuration.get(config).dao, 
                value: 0,
                data: Proposal.encodeActionData(
                    DAO.withdraw,
                    ['address', 'address', 'uint256', 'string'],
                    [token, to, amount, reference]
                )
            }],
            executeIfDecided: executeIfDecided,
            castVote: castVote,
        },
        config
    );
}
