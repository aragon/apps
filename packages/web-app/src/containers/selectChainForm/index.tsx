import {
  ButtonText,
  IconChevronDown,
  Label,
  ListItemBlockchain,
  ListItemText,
  Popover,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext} from 'react-hook-form';
import React, {useCallback, useState} from 'react';

import {i18n} from '../../../i18n.config';
import {isTestNet} from 'utils/library';
import {useWallet} from 'context/augmentedWallet';

type NetworkType = 'main' | 'test';
type SortFilter = 'cost' | 'popularity' | 'security';

function getDefaultNetworkType(id: number | undefined) {
  if (!id) return 'main';
  return isTestNet(id) ? 'test' : 'main';
}

const SelectChainForm: React.FC = () => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const {account, chainId} = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [sortFilter, setFilter] = useState<SortFilter>('cost');
  const [networkType, setNetworkType] = useState<NetworkType>(() =>
    getDefaultNetworkType(chainId)
  );

  const handleFilterChanged = useCallback(
    (e: React.MouseEvent) => {
      setIsOpen(false);
      const {name} = e.currentTarget as HTMLButtonElement;

      if (sortFilter !== name) {
        setFilter(name as SortFilter);
      }
    },
    [sortFilter]
  );

  return (
    <>
      <Header>
        <NetworkTypeSwitcher>
          <ButtonText
            mode="secondary"
            label={t('labels.mainNet')}
            isActive={networkType === 'main'}
            onClick={() => setNetworkType('main')}
          />
          <ButtonText
            mode="secondary"
            label={t('labels.testNet')}
            isActive={networkType === 'test'}
            onClick={() => setNetworkType('test')}
          />
        </NetworkTypeSwitcher>
        <SortFilter>
          <Label label={t('labels.sortBy')} />
          {/* TODO: replace with proper dropdown */}
          <Popover
            side="bottom"
            open={isOpen}
            align="start"
            width={264}
            onOpenChange={value => setIsOpen(value)}
            content={
              <DropdownContent>
                <ListItemText
                  name="cost"
                  mode="default"
                  title={t('labels.networkCost')}
                  onClick={handleFilterChanged}
                />
                <ListItemText
                  name="popularity"
                  mode="default"
                  title={t('labels.popularity')}
                  onClick={handleFilterChanged}
                />
                <ListItemText
                  name="security"
                  mode="default"
                  title={t('labels.security')}
                  onClick={handleFilterChanged}
                />
              </DropdownContent>
            }
          >
            <ButtonText
              label={labels[sortFilter].title}
              mode="secondary"
              size="large"
              iconRight={<IconChevronDown />}
            />
          </Popover>
        </SortFilter>
      </Header>
      <FormItem>
        {supportedNetworks[networkType][sortFilter].map(
          ({id, ...rest}, index) => (
            <Controller
              key={id}
              name="blockchain"
              rules={{required: true}}
              control={control}
              defaultValue={(account && chainId) || 1}
              render={({field}) => (
                <ListItemBlockchain
                  onClick={() => field.onChange(id)}
                  selected={id === field.value}
                  {...(index === 0 ? {tag: labels[sortFilter].tag} : {})}
                  {...rest}
                />
              )}
            />
          )
        )}
      </FormItem>
    </>
  );
};

export default SelectChainForm;

const Header = styled.div.attrs({className: 'flex justify-between'})``;

const NetworkTypeSwitcher = styled.div.attrs({
  className: 'flex p-0.5 space-x-0.25 bg-ui-0 rounded-xl',
})``;

const SortFilter = styled.div.attrs({
  className: 'flex items-center space-x-1.5',
})``;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const DropdownContent = styled.div.attrs({className: 'p-1.5 space-y-0.5'})``;

const labels = {
  cost: {tag: i18n.t('labels.cheapest'), title: i18n.t('labels.networkCost')},
  popularity: {
    tag: i18n.t('labels.mostPopular'),
    title: i18n.t('labels.popularity'),
  },
  security: {
    tag: i18n.t('labels.safest'),
    title: i18n.t('labels.security'),
  },
};

// TODO: Find proper place. Configs maybe?
const chainMetadata = {
  arbitrum: {
    domain: 'L2 Blockchain',
    logo: 'https://bridge.arbitrum.io/logo.png',
  },
  ethereum: {
    domain: 'L1 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  },
  polygon: {
    domain: 'L2 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
  },
};

const supportedNetworks = {
  main: {
    cost: [
      {id: 137, name: 'Polygon', ...chainMetadata.polygon},
      {id: 42161, name: 'Arbitrum', ...chainMetadata.arbitrum},
      {id: 1, name: 'Ethereum', ...chainMetadata.ethereum},
    ],

    popularity: [
      {id: 137, name: 'Polygon', ...chainMetadata.polygon},
      {id: 1, name: 'Ethereum', ...chainMetadata.ethereum},
      {id: 42161, name: 'Arbitrum', ...chainMetadata.arbitrum},
    ],

    security: [
      {id: 1, name: 'Ethereum', ...chainMetadata.ethereum},
      {id: 42161, name: 'Arbitrum', ...chainMetadata.arbitrum},
      {id: 137, name: 'Polygon', ...chainMetadata.polygon},
    ],
  },
  test: {
    cost: [
      {id: 80001, name: 'Mumbai', ...chainMetadata.polygon},
      {id: 421611, name: 'Arbitrum Rinkeby', ...chainMetadata.arbitrum},
      {id: 4, name: 'Rinkeby', ...chainMetadata.ethereum},
    ],
    popularity: [
      {id: 80001, name: 'Mumbai', ...chainMetadata.polygon},
      {id: 4, name: 'Rinkeby', ...chainMetadata.ethereum},
      {id: 421611, name: 'Arbitrum Rinkeby', ...chainMetadata.arbitrum},
    ],
    security: [
      {id: 4, name: 'Rinkeby', ...chainMetadata.ethereum},
      {id: 421611, name: 'Arbitrum Rinkeby', ...chainMetadata.arbitrum},
      {id: 80001, name: 'Mumbai', ...chainMetadata.polygon},
    ],
  },
};
