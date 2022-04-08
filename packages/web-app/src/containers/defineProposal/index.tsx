import {
  AlertInline,
  ButtonWallet,
  Label,
  TextareaSimple,
  TextareaWYSIWYG,
  TextInput,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import AddLinks from 'components/addLinks';
import {useWallet} from 'context/augmentedWallet';
import {StringIndexed} from 'utils/types';
import {useWalletProps} from 'containers/walletMenu';
import {Controller, useFormContext} from 'react-hook-form';

const DefineProposal: React.FC = () => {
  const {t} = useTranslation();
  const {account, ensAvatarUrl} = useWallet();
  const {control} = useFormContext();

  return (
    <>
      <FormItem>
        <Label label={t('labels.author')} />

        <ButtonWallet
          label="You"
          src={ensAvatarUrl || account}
          isConnected
          disabled
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('newWithdraw.defineProposal.title')}
          helpText={t('newWithdraw.defineProposal.titleHelptext')}
        />
        <Controller
          name="proposalTitle"
          defaultValue=""
          control={control}
          rules={{
            required: t('errors.required.title'),
          }}
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <>
              <TextInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={t('newWithdraw.defineProposal.titlePlaceholder')}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('newWithdraw.defineProposal.summary')}
          helpText={t('newWithdraw.defineProposal.summaryHelptext')}
        />
        <Controller
          name="proposalSummary"
          control={control}
          rules={{
            required: t('errors.required.summary'),
          }}
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <>
              <TextareaSimple
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={t('newWithdraw.defineProposal.summaryPlaceholder')}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('newWithdraw.defineProposal.proposal')}
          isOptional={true}
        />
        <Controller
          name="proposal"
          control={control}
          render={({field: {name, onBlur, onChange, value}}) => (
            <TextareaWYSIWYG
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t('newWithdraw.defineProposal.proposalPlaceholder')}
            />
          )}
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('labels.resources')}
          helpText={t('labels.resourcesHelptext')}
          isOptional
        />
        <AddLinks buttonPlusIcon buttonLabel={t('labels.addResource')} />
      </FormItem>
    </>
  );
};

export default DefineProposal;

/**
 * Check if the screen is valid
 * @param dirtyFields - The fields that have been changed
 * @param errors List of fields with errors
 * @returns Whether the screen is valid
 */
export function isValid(dirtyFields: StringIndexed, errors: StringIndexed) {
  // required fields not dirty
  if (
    !dirtyFields.proposalTitle ||
    !dirtyFields.proposalSummary ||
    errors.proposalTitle ||
    errors.proposalSummary
  )
    return false;
  return true;
}

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
