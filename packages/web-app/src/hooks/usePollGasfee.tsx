import {useMemo} from 'react';
import {BigNumberish, ethers} from 'ethers';

import DAOFactoryABI from 'abis/DAOFactory.json';
import {useProviders} from 'context/providers';

/**
 * This hook created as placeholder for calculating gasFee for current action
 * @returns Gas fees for certain Actions
 */

const usePollGasFee = () => {
  const {infura: provider} = useProviders();

  const finalFee = useMemo(async () => {
    const daoDummyName = "Rakesh's Syndicate";
    const daoDummyMetadata = '0x00000000000000000000000000';
    const zeroAddress = ethers.constants.AddressZero;
    const dummyVoteSettings: [BigNumberish, BigNumberish, BigNumberish] = [
      1, 2, 3,
    ];
    const contract = new ethers.Contract(
      '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      DAOFactoryABI,
      provider
    );

    return await contract.estimateGas.newDAO(
      {
        name: daoDummyName,
        metadata: daoDummyMetadata,
      },
      {
        addr: zeroAddress,
        name: 'TokenName',
        symbol: 'TokenSymbol',
      },
      {
        receivers: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
        amounts: [100],
      },
      dummyVoteSettings,
      zeroAddress
    );
  }, [provider]);

  return finalFee;
};

export default usePollGasFee;
