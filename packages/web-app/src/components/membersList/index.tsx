import React, {useEffect, useState} from 'react';
import {ListItemAddress} from '@aragon/ui-components';

import {DaoWhitelist} from 'hooks/useDaoMembers';
import {CHAIN_METADATA} from 'utils/constants';
import {useNetwork} from 'context/network';
import {formatUnits, isAddress} from 'ethers/lib/utils';
import {useSpecificProvider} from 'context/providers';
import {getTokenInfo} from 'utils/tokens';

type MembersListProps = {
  walletBased: boolean;
  whitelist: DaoWhitelist;
  daoMembers: {
    address: string;
    balance: number;
  }[];
  token: {
    id: string;
    symbol: string;
  };
};

export const MembersList: React.FC<MembersListProps> = ({
  walletBased,
  whitelist,
  daoMembers,
  token,
}) => {
  const {network} = useNetwork();
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const provider = useSpecificProvider(CHAIN_METADATA[network].id);

  useEffect(() => {
    async function fetchTotalSupply() {
      if (token) {
        const {totalSupply: supply, decimals} = await getTokenInfo(
          token.id,
          provider,
          CHAIN_METADATA[network].nativeCurrency
        );
        setTotalSupply(Number(formatUnits(supply, decimals)));
      }
    }
    fetchTotalSupply();
  }, [provider, token, network]);

  const itemClickHandler = (address: string) => {
    const baseUrl = CHAIN_METADATA[network].explorer;
    if (isAddress(address))
      window.open(baseUrl + '/address/' + address, '_blank');
    else window.open(baseUrl + '/enslookup-search?search=' + address, '_blank');
  };

  //   console.log('check', whitelist);

  if (walletBased)
    return (
      <>
        {whitelist?.map(({id}: DaoWhitelist[number]) => (
          <ListItemAddress
            key={id}
            label={id}
            src={id}
            onClick={() => itemClickHandler(id)}
          />
        ))}
      </>
    );
  else
    return (
      <>
        {daoMembers.map(({address, balance}) => (
          <ListItemAddress
            key={address}
            label={address}
            src={address}
            {...(!walletBased && balance
              ? {
                  tokenInfo: {
                    amount: balance,
                    symbol: token?.symbol,
                    percentage: Number(
                      ((balance / totalSupply) * 100).toFixed(2)
                    ),
                  },
                }
              : {})}
            onClick={() => itemClickHandler(address)}
          />
        ))}
      </>
    );
};
