import {SupportedNetworks} from './constants';

/* TOP LEVEL PAGES ========================================================== */
export const Landing = '/';
export const CreateDAO = '/create';
export const NotFound = '/not-found';

/* DAO-SPECIFIC PAGES ======================================================= */

export const Dashboard = '/:network/:dao/dashboard';
export const Finance = '/:network/:dao/finance';
export const Governance = '/:network/:dao/governance';
export const Community = '/:network/:dao/community';
export const Settings = '/:network/:dao/settings';

export const AllTokens = '/:network/:dao/finance/tokens';
export const AllTransfers = '/:network/:dao/finance/transfers';
export const NewDeposit = '/:network/:dao/finance/new-deposit';
export const NewWithDraw = '/:network/:dao/finance/new-withdraw';

export const Proposal = '/:network/:dao/governance/proposals/:id';
export const NewProposal = '/:network/:dao/governance/new-proposal';

/**
 * Replaces the network parameter in certain URLs. If the path passed to this
 * function has no parameter, the function will return that path unchanged.
 *
 * @param path parametrized path that needs its paramter replaced
 * @param network network paramater that will replace ":network" in the path
 * @returns concrete path with network.
 */
export function replaceNetworkParam(path: string, network: SupportedNetworks) {
  const crumbs = path.split('/');
  if (crumbs[1] === ':network') {
    crumbs[1] = network;
    return crumbs.join('/');
  }

  if (crumbs.some(s => s === ':network')) {
    throw Error(
      'URL is malformed. Network paramater is expected to either be the first parameter or not be in the URL at all.'
    );
  }

  return path;
}
