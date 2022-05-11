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
export const EditSettings = '/:network/:dao/settings/edit';

export const AllTokens = '/:network/:dao/finance/tokens';
export const AllTransfers = '/:network/:dao/finance/transfers';
export const NewDeposit = '/:network/:dao/finance/new-deposit';
export const NewWithDraw = '/:network/:dao/finance/new-withdraw';

export const Proposal = '/:network/:dao/governance/proposals/:id';
export const NewProposal = '/:network/:dao/governance/new-proposal';
