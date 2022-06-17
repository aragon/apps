import {useEffect, useState} from 'react';
import {useApolloClient} from '@apollo/client';

import {fetchTokenData} from 'services/prices';
import {TransferTypes} from 'utils/constants';
import {DaoTransfer, HookData, Transfer} from 'utils/types';
import {useNetwork} from 'context/network';
import {formatUnits} from 'utils/library';
import {formatDate} from 'utils/date';

export const usePollTransfersPrices = (
  transfers: DaoTransfer[]
): HookData<{transfers: Transfer[]; totalTransfersValue: string}> => {
  const client = useApolloClient();
  const {network} = useNetwork();
  const [data, setData] = useState<Transfer[]>([]);
  const [totalTransfersValue, setTotalTransfersValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      let total = 0;

      // fetch token metadata from external api
      const metadata = await Promise.all(
        transfers?.map(transfer => {
          return fetchTokenData(transfer.token.id, client, network);
        })
      );

      // map metadata to token balances
      const tokensWithMetadata: Transfer[] = transfers?.map(
        (transfer: DaoTransfer, index: number) => {
          const calculatedPrice = metadata[index]?.price
            ? (transfer.amount / 10 ** transfer.token.decimals) *
              (metadata[index]?.price as number)
            : 0;
          total = total + calculatedPrice;

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
      setTotalTransfersValue(`$${total.toFixed(2)}`);
      setLoading(false);
    };

    if (transfers) fetchMetadata();
  }, [network, client, transfers]);

  return {data: {transfers: data, totalTransfersValue}, isLoading: loading};
};
