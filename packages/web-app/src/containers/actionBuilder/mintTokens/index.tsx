import {ButtonText, ListItemAction} from '@aragon/ui-components';
import React, {useEffect, useState} from 'react';
import {useFieldArray, useWatch} from 'react-hook-form';
import {Trans, useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {AccordionMethod} from 'components/accordionMethod';
import {useActionsContext} from 'context/actions';
import {useNetwork} from 'context/network';
import {useProviders} from 'context/providers';
import {CHAIN_METADATA} from 'utils/constants';
import {fetchBalance, getTokenInfo} from 'utils/tokens';
import {AddressAndTokenRow} from './addressTokenRow';
import {BigNumber} from 'ethers';

type Props = {
  index: number;
};

type MintInfo = {
  address: string;
  amount: string;
};

const MintTokens: React.FC<Props> = ({index}) => {
  const {t} = useTranslation();
  const {network} = useNetwork();
  const {infura} = useProviders();
  const nativeCurrency = CHAIN_METADATA[network].nativeCurrency;
  // TODO: Fetch this from subgraph
  const tokenAddress = '0x35f7A3379B8D0613c3F753863edc85997D8D0968';

  const {removeAction, duplicateAction} = useActionsContext();
  const {fields, append, remove} = useFieldArray({name: 'mintTokensToWallets'});
  const mints = useWatch({name: 'mintTokensToWallets'}) as MintInfo[];
  const [newTokens, setNewTokens] = useState<number>(0);
  const [newHolders, setNewHolders] = useState(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [tokenInfo, setTokenInfo] = useState({
    decimals: 0,
    symbol: '',
    name: '',
    totalSupply: 0,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({address: '', amount: '0'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Fetching necessary info about the token.
    try {
      getTokenInfo(tokenAddress, infura, nativeCurrency).then(r => {
        setTokenInfo(r);
        setTotalTokens(r.totalSupply as number);
      });
    } catch (e) {
      console.log('Error happened when fetching token infos: ', e);
    }
  }, []);

  useEffect(() => {
    // Count number of addresses that don't yet own token
    if (mints) {
      Promise.all<BigNumber>(
        mints.map(m =>
          fetchBalance(tokenAddress, m.address, infura, nativeCurrency, false)
        )
      ).then(balances => {
        const newHolderCount = balances.filter((b: BigNumber) =>
          b.isZero()
        ).length;
        setNewHolders(newHolderCount);
      });
    }
  }, [mints]);

  useEffect(() => {
    // Collecting token amounts that are to be minted
    if (mints) {
      let newTokensCount = 0;
      mints.forEach(m => {
        newTokensCount += parseInt(m.amount);
      });
      setNewTokens(newTokensCount);
      setTotalTokens(tokenInfo.totalSupply + newTokensCount);
    }
  }, [mints]);

  const handleAddWallet = () => {
    append({address: '', amount: '0'});
  };

  const handleReset = () => {
    const resetIndex = new Array(fields.length).fill(1);
    remove(resetIndex.map((_, i) => i));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const myFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result;
        if (csvData) {
          const lines = (csvData as string).split('\n');
          for (let i = 0; i < lines.length; i++) {
            const tuple = lines[i].split(',');
            if (tuple[0] === 'Address' && tuple[1] === 'Tokens' && i === 0) {
              continue;
            }
            if (tuple[0] && tuple[1]) {
              append({address: tuple[0], amount: tuple[1]});
            }
          }
        }
      };

      reader.readAsBinaryString(myFile);
    }
  };

  const methodActions = [
    {
      component: <ListItemAction title={t('labels.duplicateAction')} bgWhite />,
      callback: () => duplicateAction(index),
    },
    {
      component: <ListItemAction title={t('labels.resetAction')} bgWhite />,
      callback: handleReset,
    },
    {
      component: (
        <ListItemAction title={t('labels.removeEntireAction')} bgWhite />
      ),
      callback: () => {
        removeAction(index);
      },
    },
  ];

  return (
    <AccordionMethod
      type="action-builder"
      methodName={t('labels.mintTokens')}
      smartContractName={t('labels.aragonCore')}
      verified
      methodDescription={<MintTokenDescription />}
      additionalInfo={t('newProposal.mintTokens.additionalInfo')}
      dropdownItems={methodActions}
    >
      <Container>
        {fields.map((field, index) => {
          return (
            <AddressAndTokenRow
              key={field.id}
              index={index}
              onDelete={index => remove(index)}
            />
          );
        })}

        <ButtonContainer>
          <ButtonText
            label={t('labels.addWallet')}
            mode="secondary"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
            onClick={handleAddWallet}
          />

          <label className="flex-1 tablet:flex-initial py-1.5 px-2 space-x-1.5 h-6 font-bold hover:text-primary-500 bg-ui-0 rounded-xl cursor-pointer ft-text-base">
            Upload CSV
            <input
              type="file"
              name="uploadCSV"
              accept=".csv, .txt"
              onChange={handleCSVUpload}
              hidden
            />
          </label>
        </ButtonContainer>
        <SummaryContainer>
          <p>{t('labels.summary')}</p>
          <HStack>
            <Label>{t('labels.newTokens')}</Label>
            <p>
              +{newTokens} {tokenInfo.symbol}
            </p>
          </HStack>
          <HStack>
            <Label>{t('labels.newHolders')}</Label>
            <p>+{newHolders}</p>
          </HStack>
          <HStack>
            <Label>{t('labels.totalTokens')}</Label>
            <p>
              {totalTokens.toString()} {tokenInfo.symbol}
            </p>
          </HStack>
          {/* TODO add total amount of token holders here. */}
        </SummaryContainer>
      </Container>
    </AccordionMethod>
  );
};

export default MintTokens;

const MintTokenDescription: React.FC = () => (
  <Trans i18nKey="newProposal.mintTokens.methodDescription">
    Which wallet addresses should get tokens, and how many? Add the wallets you
    want here, and then choose the distribution. Upload a CSV with
    <a
      href="data:text/csv;base64,QWRkcmVzcyxUb2tlbnMKMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwLDEwLjUw"
      download="MintTokenTemplate.csv"
      className="font-bold text-primary-500 hover:text-primary-700 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
    >
      this template
    </a>{' '}
    if you want.
  </Trans>
);

const Container = styled.div.attrs({
  className:
    'bg-white rounded-b-xl border border-t-0 divide-y border-ui-100 divide-ui-100',
})``;

const ButtonContainer = styled.div.attrs({
  className:
    'flex justify-between tablet:justify-start p-2 tablet:p-3 space-x-2',
})``;

const SummaryContainer = styled.div.attrs({
  className: 'p-2 tablet:p-3 space-y-1.5 font-bold text-ui-800',
})``;

const HStack = styled.div.attrs({
  className: 'flex justify-between',
})``;

const Label = styled.p.attrs({
  className: 'font-normal text-ui-500',
})``;
