import {useEffect, useState} from 'react';

import {fetchTokenData} from 'services/prices';
import {useApolloClient} from 'context/apolloClient';
import {ASSET_PLATFORMS, CHAIN_METADATA, TransferTypes} from 'utils/constants';
import {DaoTransfer, Transfer} from 'utils/types';
import {formatUnits} from 'utils/library';
import {formatDate} from 'utils/date';
import {useNetwork} from 'context/network';

export const usePollTransfersPrices = (transfers: DaoTransfer[]) => {
  const client = useApolloClient();
  const {network} = useNetwork();
  const [data, setData] = useState<Transfer[]>([]);
  const [total, setTotal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      let totalTransfers = 0;

      // fetch token metadata from external api
      const metadata = await Promise.all(
        transfers?.map(transfer => {
          const chainId = CHAIN_METADATA[network].id;
          return fetchTokenData(
            transfer.token.id,
            client,
            ASSET_PLATFORMS[chainId]
          );
        })
      );

      // map metadata to token balances
      const tokensWithMetadata: Transfer[] = transfers?.map(
        (transfer: DaoTransfer, index: number) => {
          const calculatedPrice = metadata[index]?.price
            ? (transfer.amount / 10 ** transfer.token.decimals) *
              (metadata[index]?.price as number)
            : 0;
          totalTransfers = totalTransfers + calculatedPrice;
          return {
            id: transfer.id,
            title: transfer.reference ? transfer.reference : 'deposit',
            tokenName: transfer.token.name,
            tokenAmount: formatUnits(transfer.amount, transfer.token.decimals),
            tokenImgUrl: metadata[index]?.imgUrl || '',
            tokenSymbol: transfer.token.symbol,
            transferDate: `${formatDate(transfer.createdAt, 'relative')}`,
            transferTimestamp: transfer.createdAt,
            usdValue: `$${calculatedPrice.toFixed(2)}`,
            isPending: false,
            transaction: transfer.transaction,
            reference: transfer.reference,
            ...(transfer.__typename === TransferTypes.Deposit
              ? {
                  sender: transfer.sender,
                  transferType: transfer.__typename,
                }
              : {
                  to: transfer.to,
                  proposalId: transfer.proposal.id,
                  transferType: transfer.__typename,
                }),
          };
        }
      );

      setData(tokensWithMetadata);
      setTotal(`$${totalTransfers.toFixed(2)}`);
      setLoading(false);
    };

    if (transfers) fetchMetadata();
  }, [network, client, transfers]);

  return {data, total, loading};
};
