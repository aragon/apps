import {TransferTypes} from './constants';

/**
 * Response object from fetching token USD values
 */
export type TokenPrices = {
  [key: string]: string | undefined;
};

/**
 * Token information to be displayed on tokenCard
 */
export type BaseTokenInfo = {
  address: string;
  count: number;
  decimals: number;
  imgUrl: string;
  name: string;
  symbol: string;
  changeDuringInterval?: number;
  treasurySharePercentage?: number;
  percentageChangeDuringInterval?: string;
};

export type Transfer = {
  title: string;
  tokenAmount: number;
  tokenSymbol: string;
  transferDate: string;
  transferType: TransferTypes;
  usdValue: string;
  isPending?: boolean;
};

export type HookData<T> = {
  data: T;
  isLoading: boolean;
  error?: Error;
};
