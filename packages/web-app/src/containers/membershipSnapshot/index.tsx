import {
  ButtonText,
  IconChevronRight,
  IconCommunity,
  ListItemHeader,
  ListItemAddress,
} from '@aragon/ui-components';
import {isAddress} from 'ethers/lib/utils';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useNavigate, generatePath} from 'react-router-dom';

import {Loading} from 'components/temporary';
import {useNetwork} from 'context/network';
import {useDaoTokenHolders, useDaoWhitelist} from 'hooks/useDaoMembers';
import {CHAIN_METADATA} from 'utils/constants';
import {Community} from 'utils/paths';
import useScreen from 'hooks/useScreen';
import {getTokenInfo} from 'utils/tokens';
import {useSpecificProvider} from 'context/providers';
import {formatUnits} from 'utils/library';

type Props = {dao: string; walletBased: boolean; horizontal?: boolean};

export const MembershipSnapshot: React.FC<Props> = ({
  dao,
  walletBased,
  horizontal,
}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const provider = useSpecificProvider(CHAIN_METADATA[network].id);
  const {isDesktop} = useScreen();
  const {data: whitelist, isLoading: whiteListLoading} = useDaoWhitelist(dao);
  const {
    data: {daoMembers, token},
    isLoading: tokenHoldersLoading,
  } = useDaoTokenHolders(dao);

  const [totalSupply, setTotalSupply] = useState<number>(0);
  const memberCount = walletBased ? whitelist?.length : daoMembers?.length;

  const headerButtonHandler = () => {
    () =>
      walletBased
        ? alert('This will soon take you to a page for minting tokens')
        : alert('This will soon take you to a page that lets you add members');
  };

  useEffect(() => {
    async function fetchTotalSupply() {
      if (token) {
        const {totalSupply: supply, decimals} = await getTokenInfo(
          token.id,
          provider
        );
        setTotalSupply(Number(formatUnits(supply, decimals)));
      }
    }
    fetchTotalSupply();
  }, [provider, token]);

  const itemClickHandler = (address: string) => {
    const baseUrl = CHAIN_METADATA[network].explorer;
    if (isAddress(address))
      window.open(baseUrl + '/address/' + address, '_blank');
    else window.open(baseUrl + '/enslookup-search?search=' + address, '_blank');
  };

  if (whiteListLoading || tokenHoldersLoading) return <Loading />;

  if (horizontal && isDesktop) {
    return (
      <div className="flex space-x-3">
        <div className="w-1/3">
          <ListItemHeader
            icon={<IconCommunity />}
            value={`${memberCount} ${t('labels.members')}`}
            label={
              walletBased
                ? t('explore.explorer.walletBased')
                : t('explore.explorer.tokenBased')
            }
            buttonText={
              walletBased ? t('labels.addMember') : t('labels.mintTokens')
            }
            orientation="vertical"
            onClick={headerButtonHandler}
          />
        </div>
        <div className="space-y-2 w-2/3">
          <ListItemGrid>
            {walletBased
              ? whitelist
                  ?.slice(0, 3)
                  .map(({id}) => (
                    <ListItemAddress
                      key={id}
                      src={id}
                      onClick={() => itemClickHandler(id)}
                    />
                  ))
              : daoMembers?.slice(0, 3).map(({address, balance}) => (
                  <ListItemAddress
                    src={address}
                    key={address}
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
          </ListItemGrid>
          <ButtonText
            mode="secondary"
            size="large"
            iconRight={<IconChevronRight />}
            label={t('labels.seeAll')}
            onClick={() => navigate(generatePath(Community, {network, dao}))}
          />
        </div>
      </div>
    );
  }

  return (
    <VerticalContainer>
      <ListItemHeader
        icon={<IconCommunity />}
        value={`${memberCount} ${t('labels.members')}`}
        label={
          walletBased
            ? t('explore.explorer.walletBased')
            : t('explore.explorer.tokenBased')
        }
        buttonText={
          walletBased ? t('labels.addMember') : t('labels.mintTokens')
        }
        orientation="vertical"
        onClick={headerButtonHandler}
      />
      {walletBased
        ? whitelist
            ?.slice(0, 3)
            .map(({id}) => (
              <ListItemAddress
                key={id}
                src={id}
                onClick={() => itemClickHandler(id)}
              />
            ))
        : daoMembers?.slice(0, 3).map(({address, balance}) => (
            <ListItemAddress
              src={address}
              key={address}
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
      <ButtonText
        mode="secondary"
        size="large"
        iconRight={<IconChevronRight />}
        label={t('labels.seeAll')}
        onClick={() => navigate(generatePath(Community, {network, dao}))}
      />
    </VerticalContainer>
  );
};

const VerticalContainer = styled.div.attrs({
  className: 'space-y-1.5 desktop:space-y-2',
})``;

const ListItemGrid = styled.div.attrs({
  className:
    'desktop:grid desktop:grid-cols-2 desktop:grid-flow-row desktop:gap-2',
})``;
