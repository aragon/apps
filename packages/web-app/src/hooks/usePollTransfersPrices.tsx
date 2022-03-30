import {useWallet} from 'use-wallet';
import {useEffect, useState} from 'react';

import {fetchTokenData} from 'services/prices';
import {useApolloClient} from 'context/apolloClient';
import {ASSET_PLATFORMS} from 'utils/constants';
import {DaoTransfer, Transfer} from 'utils/types';
import {formatUnits} from 'utils/library';
import {formatDate} from 'utils/date';

export const usePollTransfersPrices = (transfers: DaoTransfer[]) => {
  const client = useApolloClient();
  const {chainId} = useWallet();
  const [data, setData] = useState<Transfer[]>([]);
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
      const tokensWithMetadata: Transfer[] = transfers?.map(
        (transfer: DaoTransfer, index: number) => ({
          title: transfer.reference ? transfer.reference : 'deposit',
          tokenAmount: formatUnits(transfer.amount, transfer.token.decimals),
          tokenSymbol: transfer.token.symbol,
          transferDate: `${formatDate(transfer.createdAt, 'relative')}`,
          transferType: transfer.__typename,
          usdValue: `$${
            metadata[index]?.price
              ? (
                  (transfer.amount / 10 ** transfer.token.decimals) *
                  (metadata[index]?.price as number)
                ).toFixed(2)
              : 0
          }`,
          isPending: false,
        })
      );

      setData(tokensWithMetadata);
      setLoading(false);
    };

    if (transfers) fetchMetadata();
  }, [chainId, client, transfers]);

  return {data, loading};
};
