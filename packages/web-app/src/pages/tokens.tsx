import styled from 'styled-components';
import {SearchInput} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import React, {useState} from 'react';

import TokenList from 'components/tokenList';
import {TimeFilter} from 'utils/constants';
import {PageWrapper} from 'components/wrappers';
import {filterTokens} from 'utils/tokens';
import {useDaoTreasury} from 'hooks/useDaoTreasury';
import {useGlobalModalContext} from 'context/globalModals';
import {useDaoVault} from 'hooks/useDaoVault';
import type {VaultToken} from 'utils/types';

const Tokens: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {data: treasury} = useDaoTreasury('0xMyDaoAddress', TimeFilter.day);
  const {tokens, totalAssetChange, totalAssetValue} = useDaoVault(
    '0x79fde96a6182adbd9ca4a803ba26f65a893fbf4f'
  );

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTokens: VaultToken[] = filterTokens(tokens, searchTerm);

  return (
    <Layout>
      <PageWrapper
        title={t('allTokens.title') as string}
        subtitle={t('allTokens.subtitle', {count: tokens.length})}
        buttonLabel={t('TransferModal.newTransfer') as string}
        onClick={open}
      >
        <SearchInput
          placeholder="Type to filter"
          value={searchTerm}
          onChange={handleChange}
        />
        <TokenList tokens={filteredTokens} />
      </PageWrapper>
    </Layout>
  );
};

export default withTransaction('Tokens', 'component')(Tokens);

const Layout = styled.div.attrs({
  className: 'm-auto mt-5 space-y-5 w-8/12',
})``;
