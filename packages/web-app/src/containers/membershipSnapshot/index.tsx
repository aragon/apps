import {
  ButtonText,
  IconChevronRight,
  IconCommunity,
  ListItemHeader,
  ListItemAddress,
} from '@aragon/ui-components';
import {isAddress} from 'ethers/lib/utils';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useNavigate, generatePath} from 'react-router-dom';

import {Loading} from 'components/temporary';
import {useNetwork} from 'context/network';
import {useDaoMembers} from 'hooks/useDaoMembers';
import {CHAIN_METADATA} from 'utils/constants';
import {Community} from 'utils/paths';
import useScreen from 'hooks/useScreen';

type Props = {dao: string; horizontal?: boolean};

export const MembershipSnapshot: React.FC<Props> = ({dao, horizontal}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {isDesktop} = useScreen();
  const {data, loading} = useDaoMembers(dao);
  const memberCount = data.length;
  const isWalletBased = true; // This should be returned by the above hook as well.

  const itemClickHandler = (address: string) => {
    const baseUrl = CHAIN_METADATA[network].explorer;
    if (isAddress(address))
      window.open(baseUrl + '/address/' + address, '_blank');
    else window.open(baseUrl + '/enslookup-search?search=' + address, '_blank');
  };

  if (loading) return <Loading />;

  if (horizontal && isDesktop) {
    return (
      <div className="flex space-x-3">
        <div className="w-1/3">
          <ListItemHeader
            icon={<IconCommunity />}
            value={`${memberCount} ${t('labels.members')}`}
            label={
              isWalletBased
                ? t('explore.explorer.walletBased')
                : t('explore.explorer.tokenBased')
            }
            buttonText={t('labels.addMember')}
            orientation="vertical"
            onClick={() =>
              alert(
                'This will soon take you to a page that lets you add members'
              )
            }
          />
        </div>
        <div className="space-y-2 w-2/3">
          <ListItemGrid>
            {data.slice(0, 3).map(a => (
              <ListItemAddress
                src={a}
                key={a}
                onClick={() => itemClickHandler(a)}
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
          isWalletBased
            ? t('explore.explorer.walletBased')
            : t('explore.explorer.tokenBased')
        }
        buttonText={t('labels.addMember')}
        orientation="vertical"
        onClick={() =>
          alert('This will soon take you to a page that lets you add members')
        }
      />
      {data.slice(0, 3).map(a => (
        <ListItemAddress src={a} key={a} onClick={() => itemClickHandler(a)} />
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
