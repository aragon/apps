const BASE_URL = 'https://api.0x.org';
const BUY_TOKEN = 'USDC';
const DEFAULT_SELL_AMOUNT = '1000000000000000000';

/**
 * Get the base unit
 * @param decimals - ERC20 token decimals
 * @returns One unit of the token
 */
const getSellAmount = (decimals?: number | string) => {
  // 18 decimals by default
  if (!decimals) return DEFAULT_SELL_AMOUNT;

  if (Number.isInteger(decimals as number))
    return Math.pow(10, Number(decimals));
  else throw new TypeError('decimals must be a valid whole number');
};

const fetchTokenUsdPrice = async (
  token: string,
  decimals?: string | number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/swap/v1/price?sellAmount=${getSellAmount(
        decimals
      )}&sellToken=${token}&buyToken=${BUY_TOKEN}`
    );

    const {price} = await response.json();
    return price as string;
  } catch (error) {
    console.error(`Could not fetch ${token} USD price`, error);
  }
};

export {fetchTokenUsdPrice};
