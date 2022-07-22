import {
  AlertInline,
  ButtonIcon,
  Dropdown,
  IconMenuVertical,
  ListItemProps,
  ValueInput,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {Controller, useFormContext, useWatch} from 'react-hook-form';

import {validateAddress} from 'utils/validators';
import {WhitelistWallet} from 'pages/createDAO';
import {handleClipboardActions} from 'utils/library';

type Props = {
  actionIndex: number;
  fieldIndex: number;
  dropdownItems: ListItemProps[];
};

export const AddressRow = ({actionIndex, fieldIndex, ...props}: Props) => {
  const {t} = useTranslation();

  const {control} = useFormContext();
  const memberWallets = useWatch({
    name: `actions.${actionIndex}.inputs.memberWallets`,
    control,
  });

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  const handleAdornmentClick = useCallback(
    (value: string, onChange: (value: string) => void) => {
      if (value) {
        onChange('');
      } else {
        handleClipboardActions(value, onChange);
      }
    },
    []
  );

  const addressValidator = useCallback(
    (address: string, index: number) => {
      let validationResult = validateAddress(address);
      if (memberWallets) {
        memberWallets.forEach(
          (wallet: WhitelistWallet, walletIndex: number) => {
            if (address === wallet.address && index !== walletIndex) {
              validationResult = t('errors.duplicateAddress');
            }
          }
        );
      }
      return validationResult;
    },
    [t, memberWallets]
  );

  /*************************************************
   *                    Render                    *
   *************************************************/
  return (
    <Controller
      name={`actions.${actionIndex}.inputs.memberWallets.${fieldIndex}.address`}
      defaultValue=""
      control={control}
      rules={{
        required: t('errors.required.walletAddress'),
        validate: value => addressValidator(value, actionIndex),
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Container>
          <InputContainer>
            <ValueInput
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
              mode="default"
              placeholder="0x..."
              adornmentText={value ? t('labels.clear') : t('labels.paste')}
              onAdornmentClick={() => handleAdornmentClick(value, onChange)}
            />
            {error?.message && (
              <AlertInline label={error.message} mode="critical" />
            )}
          </InputContainer>
          <Dropdown
            side="bottom"
            align="start"
            sideOffset={4}
            listItems={props.dropdownItems}
            trigger={
              <ButtonIcon
                size="large"
                mode="secondary"
                icon={<IconMenuVertical />}
                data-testid="trigger"
                bgWhite
              />
            }
          />
        </Container>
      )}
    />
  );
};

const Container = styled.div.attrs(() => ({
  className: 'flex gap-2 items-start',
}))``;

const InputContainer = styled.div.attrs(() => ({
  className: 'flex flex-col gap-1 flex-1',
}))``;
