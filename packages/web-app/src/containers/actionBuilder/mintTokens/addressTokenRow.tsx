import React from 'react';
import {
  ButtonIcon,
  IconMenuVertical,
  ValueInput,
  Label,
  NumberInput,
  ListItemAction,
  Dropdown,
  AlertInline,
  TextInput,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {Controller} from 'react-hook-form';
import {handleClipboardActions} from 'utils/library';
import styled from 'styled-components';

type AddressAndTokenRowProps = {
  index: number;
  onDelete: (index: number) => void;
};

export const AddressAndTokenRow: React.FC<AddressAndTokenRowProps> = ({
  index,
  onDelete,
}) => {
  const {t} = useTranslation();

  return (
    <Container>
      <VStack>
        <Label label="Address" />
        <HStack>
          <Controller
            defaultValue=""
            name={`mintTokensToWallets.${index}.address`}
            // rules={{
            //   required: t('errors.required.walletAddress') as string,
            //   validate: value => addressValidator(value, index),
            // }}
            render={({
              field: {name, value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <div className="flex-1">
                <ValueInput
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value);
                  }}
                  adornmentText={value ? t('labels.copy') : t('labels.paste')}
                  onAdornmentClick={() =>
                    handleClipboardActions(value, onChange)
                  }
                />
                {error?.message && (
                  <ErrorContainer>
                    <AlertInline label={error.message} mode="critical" />
                  </ErrorContainer>
                )}
              </div>
            )}
          />

          <Dropdown
            align="start"
            trigger={
              <ButtonIcon
                mode="ghost"
                size="large"
                icon={<IconMenuVertical />}
              />
            }
            sideOffset={8}
            listItems={[
              {
                component: (
                  <ListItemAction title={t('labels.removeWallet')} bgWhite />
                ),
                callback: () => {
                  onDelete(index);
                },
              },
            ]}
          />
        </HStack>
      </VStack>

      <VStack>
        <Label label="Tokens" />
        <HStackWithPadding>
          <Controller
            name={`mintTokensToWallets.${index}.amount`}
            // rules={{
            //   required: t('errors.required.amount'),
            //   validate: amountValidation,
            // }}
            render={({
              field: {name, value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <NumberInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="0"
                min={0}
                includeDecimal
                mode={error?.message ? 'critical' : 'default'}
              />
            )}
          />

          <TextInput
            className="text-right"
            name={`wallets.${index}.amount`}
            value={'14.012%'}
            mode="default"
            disabled
          />
        </HStackWithPadding>
      </VStack>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'p-2 tablet:p-3 space-y-3',
})``;

const ErrorContainer = styled.div.attrs({
  className: 'mt-0.5',
})``;

const VStack = styled.div.attrs({
  className: 'space-y-0.5',
})``;

const HStack = styled.div.attrs({
  className: 'flex space-x-2',
})``;

const HStackWithPadding = styled.div.attrs({
  className: 'flex tablet:pr-8 space-x-2',
})``;
