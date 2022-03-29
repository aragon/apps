import {useWallet} from 'use-wallet';
import {useEffect, useState} from 'react';

import {fetchTokenData} from 'services/prices';
import {useApolloClient} from 'context/apolloClient';
import {ASSET_PLATFORMS} from 'utils/constants';
import {DaoTransfer} from 'utils/types';

export const usePollTransfersPrices = (transfers: DaoTransfer[]) => {
  const client = useApolloClient();
  const {chainId} = useWallet();
  const [data, setData] = useState<DaoTransfer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);

      // fetch token metadata from external api
      const metadata = await Promise.all(
        transfers?.map(transfer =>
          fetchTokenData(transfer.token.id, client, ASSET_PLATFORMS[chainId!])
        )
      );

      // map metadata to token balances
      const tokensWithMetadata = transfers?.map(
        (transfer: DaoTransfer, index) => {
          transfer.token.price = metadata[index]?.price;
          return transfer;
        }
      );

      setData(tokensWithMetadata);
      setLoading(false);
    };

    if (transfers) fetchMetadata();
  }, [chainId, client, transfers]);

  return {data, loading};
};
