import {
  ButtonIcon,
  IconMenuVertical,
  ListItemAction,
  AlertInline,
  ValueInput,
  Dropdown,
} from '@aragon/ui-components';
import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useWatch} from 'react-hook-form';

import {useWallet} from 'hooks/useWallet';
import {validateAddress} from 'utils/validators';
import {WhitelistWallet} from 'pages/createDAO';
import {handleClipboardActions} from 'utils/library';

type WhitelistWalletsRowProps = {
  index: number;
  onResetEntry: (index: number) => void;
  onDeleteEntry: (index: number) => void;
  onDuplicateEntry: (index: number) => void;
};

export const Row = ({index, ...props}: WhitelistWalletsRowProps) => {
  const {t} = useTranslation();
  const {address} = useWallet();

  const {control} = useFormContext();
  const whitelistWallets = useWatch({name: 'whitelistWallets', control});

  const shouldDisable = useMemo(() => {
    return index === 0 && whitelistWallets[index].address === address;
  }, [address, index, whitelistWallets]);

  const addressValidator = (address: string, index: number) => {
    let validationResult = validateAddress(address);
    if (whitelistWallets) {
      whitelistWallets.forEach(
        (wallet: WhitelistWallet, walletIndex: number) => {
          if (address === wallet.address && index !== walletIndex) {
            validationResult = t('errors.duplicateAddress');
          }
        }
      );
    }
    return validationResult;
  };
  return (
    <Controller
      name={`whitelistWallets.${index}.address`}
      defaultValue=""
      control={control}
      rules={{
        required: t('errors.required.walletAddress'),
        validate: value => addressValidator(value, index),
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Container>
          <InputContainer>
            <ValueInput
              value={value === address ? t('labels.myWallet') : value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
              mode="default"
              placeholder="0x..."
              adornmentText={value ? t('labels.copy') : t('labels.paste')}
              disabled={shouldDisable}
              onAdornmentClick={() => handleClipboardActions(value, onChange)}
            />
            {error?.message && (
              <AlertInline label={error.message} mode="critical" />
            )}
          </InputContainer>
          <Dropdown
            side="bottom"
            align="start"
            sideOffset={4}
            disabled={shouldDisable}
            trigger={
              <ButtonIcon
                size="large"
                mode="secondary"
                disabled={shouldDisable}
                icon={<IconMenuVertical />}
                data-testid="trigger"
              />
            }
            listItems={[
              {
                component: (
                  <ListItemAction
                    title={t('labels.whitelistWallets.duplicateEntry')}
                    bgWhite
                  />
                ),
                callback: () => {
                  props.onDuplicateEntry(index);
                },
              },
              {
                component: (
                  <ListItemAction
                    title={t('labels.whitelistWallets.resetEntry')}
                    bgWhite
                  />
                ),
                callback: () => {
                  props.onResetEntry(index);
                },
              },
              {
                component: (
                  <ListItemAction
                    title={t('labels.whitelistWallets.deleteEntry')}
                    bgWhite
                  />
                ),
                callback: () => {
                  props.onDeleteEntry(index);
                },
              },
            ]}
          />
        </Container>
      )}
    />
  );
};

const Container = styled.div.attrs(() => ({
  className: 'px-2 py-1.5 flex gap-2 items-start',
}))``;
const InputContainer = styled.div.attrs(() => ({
  className: 'flex flex-col gap-1 flex-1',
}))``;
