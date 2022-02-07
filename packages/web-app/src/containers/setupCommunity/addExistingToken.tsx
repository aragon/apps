import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';

import {
  AlertInline,
  Label,
  Link,
  SearchInput,
  TextInput,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {chains} from 'use-wallet';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useMemo} from 'react';

import {useWallet} from 'context/augmentedWallet';
import {isAddress} from 'ethers/lib/utils';
import {formatUnits} from 'utils/library';
import {getTokenInfo} from 'utils/tokens';
import {ChainInformation} from 'use-wallet/dist/cjs/types';
import {validateTokenAddress} from 'utils/validators';

const DEFAULT_BLOCK_EXPLORER = 'https://etherscan.io/';

const AddExistingToken: React.FC = () => {
  const {t} = useTranslation();
  const {account, provider} = useWallet();
  const {control, resetField, setValue} = useFormContext();
  const {errors} = useFormState({control});

  const [address, chainId, name, symbol, totalSupply] = useWatch({
    name: [
      'tokenAddress',
      'blockchain',
      'tokenName',
      'tokenSymbol',
      'tokenTotalSupply',
    ],
  });

  const explorer = useMemo(() => {
    if (chainId) {
      const {explorerUrl} = chains.getChainInformation(
        chainId
      ) as ChainInformation;
      return explorerUrl || DEFAULT_BLOCK_EXPLORER;
    }

    return DEFAULT_BLOCK_EXPLORER;
  }, [chainId]);

  /*************************************************
   *                    Hooks                      *
   *************************************************/
  useEffect(() => {
    if (!account) return;

    const resetTokenFields = () => {
      resetField('tokenName');
      resetField('tokenSymbol');
      resetField('tokenTotalSupply');
    };

    const fetchContractInfo = async () => {
      // have to include this to "debounce" network calls
      if (!isAddress(address)) return;

      try {
        const {decimals, name, symbol, totalSupply} = await getTokenInfo(
          address,
          provider
        );
        setValue('tokenName', name);
        setValue('tokenSymbol', symbol);
        setValue('tokenTotalSupply', formatUnits(totalSupply, decimals));
      } catch (error) {
        console.error('Error fetching token information', error);
        resetTokenFields();
      }
    };

    if (errors.tokenAddress !== undefined && name !== '') {
      resetTokenFields();
    } else {
      fetchContractInfo();
    }
  }, [
    account,
    address,
    errors.tokenAddress,
    name,
    provider,
    resetField,
    setValue,
  ]);

  return (
    <>
      <DescriptionContainer>
        <Title>{t('labels.addExistingToken')}</Title>
        <Subtitle>
          {t('createDAO.step3.addExistingTokenHelptext')}
          <Link label={t('createDAO.step3.tokenHelptextLink')} href="" />.
        </Subtitle>
      </DescriptionContainer>
      <FormItem>
        <DescriptionContainer>
          <Label label={t('labels.address')} />
          <p>
            <span>{t('createDAO.step3.tokenContractSubtitlePart1')}</span>
            <Link label="block explorer" href={explorer} />
            {'. '}
            <span>{t('createDAO.step3.tokenContractSubtitlePart2')}</span>
          </p>
        </DescriptionContainer>
        <Controller
          name="tokenAddress"
          control={control}
          defaultValue=""
          rules={{
            required: t('errors.required.address'),
            validate: async value =>
              await validateTokenAddress(value, provider),
          }}
          render={({
            field: {name, value, onBlur, onChange},
            fieldState: {error, isDirty},
          }) => (
            <>
              <SearchInput
                {...{name, value, onBlur, onChange}}
                placeholder="0x..."
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
              {!error?.message && isDirty && (
                <AlertInline label={t('success.contract')} mode="success" />
              )}
            </>
          )}
        />
        {name && (
          <TokenInfoContainer>
            <InfoContainer>
              <Label label={t('labels.existingTokenName')} />
              <TextInput disabled value={name} />
            </InfoContainer>
            <InfoContainer>
              <Label label={t('labels.existingTokenSymbol')} />
              <TextInput disabled value={symbol} />
            </InfoContainer>
            <InfoContainer>
              <Label label={t('labels.existingTokenSupply')} />
              <TextInput
                disabled
                value={new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 4,
                }).format(totalSupply)}
              />
            </InfoContainer>
          </TokenInfoContainer>
        )}
      </FormItem>
    </>
  );
};

export default AddExistingToken;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const DescriptionContainer = styled.div.attrs({
  className: 'space-y-0.5',
})``;

const Title = styled.p.attrs({className: 'text-lg font-bold text-ui-800'})``;

const Subtitle = styled.p.attrs({className: 'text-ui-600 text-bold'})``;

const TokenInfoContainer = styled.div.attrs({
  className:
    'flex flex-col tablet:flex-row tablet:gap-x-2 gap-y-2 tablet:justify-between tablet:items-center p-2 bg-ui-0 rounded-xl',
})``;

const InfoContainer = styled.div.attrs({
  className: 'space-y-1',
})``;
