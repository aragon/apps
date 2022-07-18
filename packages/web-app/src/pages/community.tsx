import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {formatUnits, isAddress} from 'ethers/lib/utils';
import {
  HeaderPage,
  IconFinance,
  ListItemAddress,
  SearchInput,
  IconCommunity,
} from '@aragon/ui-components';
import {withTransaction} from '@elastic/apm-rum-react';

import {useDaoTokenHolders, useDaoWhitelist} from 'hooks/useDaoMembers';
import {useDaoParam} from 'hooks/useDaoParam';
import {useDaoMetadata} from 'hooks/useDaoMetadata';
import {CHAIN_METADATA} from 'utils/constants';
import {useNetwork} from 'context/network';
import {useSpecificProvider} from 'context/providers';
import {getTokenInfo} from 'utils/tokens';

const Community: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const {t} = useTranslation();
  const {loading, data: daoId} = useDaoParam();
  const {network} = useNetwork();
  const provider = useSpecificProvider(CHAIN_METADATA[network].id);
  const {data: dao, loading: metadataLoading} = useDaoMetadata(daoId);
  const {data: whitelist, isLoading: whiteListLoading} = useDaoWhitelist(dao);
  const {
    data: {daoMembers, token},
    isLoading: tokenHoldersLoading,
  } = useDaoTokenHolders(dao);

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

  const walletBased = dao?.packages[0].pkg.__typename === 'WhitelistPackage';
  const memberCount = walletBased ? whitelist?.length : daoMembers?.length;

  const itemClickHandler = (address: string) => {
    const baseUrl = CHAIN_METADATA[network].explorer;
    if (isAddress(address))
      window.open(baseUrl + '/address/' + address, '_blank');
    else window.open(baseUrl + '/enslookup-search?search=' + address, '_blank');
  };

  return (
    <Container>
      <HeaderPage
        crumbs={[
          {label: 'Finance', path: '/abc'},
          {label: 'Tokens', path: '/abc'},
          {label: 'Third Level', path: '/abc'},
        ]}
        icon={<IconFinance />}
        title={`${memberCount} ${t('labels.members')}`}
        description={
          walletBased
            ? t('explore.explorer.walletBased')
            : t('explore.explorer.tokenBased')
        }
        buttonLabel={'Add Member'}
      />
      <SearchInput placeholder={'Type to search ...'} />
      <div className="flex space-x-3">
        <div className="space-y-2 w-full">
          {walletBased
            ? whitelist
                ?.slice(0, 3)
                .map(({id}) => (
                  <ListItemAddress
                    key={id}
                    label={id}
                    src={id}
                    onClick={() => itemClickHandler(id)}
                  />
                ))
            : daoMembers?.slice(0, 3).map(({address, balance}) => (
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
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'col-span-full desktop:col-start-2 desktop:col-end-12 desktop:mt-5 space-y-5 desktop:space-y-8',
})``;

export default withTransaction('Community', 'component')(Community);
