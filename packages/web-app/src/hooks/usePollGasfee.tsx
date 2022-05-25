import {constants} from 'ethers';
import {useEffect, useState} from 'react';
import {IGasFeeEstimation} from '@aragon/sdk-client/dist/internal/interfaces/dao';

import {useNetwork} from 'context/network';
import {fetchTokenPrice} from 'services/prices';

/**
 * This hook returns the gas estimation for a particular transaction and
 * the price of the native token in USD
 *
 * NOTE: Due to what is assumed to be temporary design changes, this hook
 * does not yet poll for the gas fees on interval
 *
 * @param estimationFunction function that estimates gas fee
 * @returns the average and maximum gas fee estimations as well as the
 * native token price in USD
 */
export const usePollGasFee = (
  estimationFunction: () => Promise<IGasFeeEstimation | undefined>
) => {
  const {network} = useNetwork();
  const [maxFee, setMaxFee] = useState<BigInt>(0n);
  const [averageFee, setAverageFee] = useState<BigInt>(0n);
  const [tokenPrice, setTokenPrice] = useState<number>(0);

  // estimate gas for DAO creation
  useEffect(() => {
    async function getFeesAndPrice() {
      try {
        const results = await Promise.all([
          estimationFunction(),
          fetchTokenPrice(constants.AddressZero, network),
        ]);

        setTokenPrice(results[1] || 0);
        setMaxFee(results[0]?.max || 0n);
        setAverageFee(results[0]?.max || 0n);
      } catch (error) {
        console.log('Error fetching gas fees and price', error);
      }
    }

    getFeesAndPrice();
  }, [averageFee, estimationFunction, maxFee, network, tokenPrice]);

  return {tokenPrice, maxFee, averageFee};
};
