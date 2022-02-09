import {
  AlertInline,
  ButtonIcon,
  IconMenuVertical,
  Label,
  ListItemText,
  Popover,
  TextInput,
  NumberInput,
  ValueInput,
} from '@aragon/ui-components';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import {handleClipboardActions} from 'utils/library';
import {useWallet} from 'context/augmentedWallet';

type LinkRowProps = {
  control: Control<FieldValues, object>;
  index: number;
  onDelete?: (index: number) => void;
  fieldset: Record<'id', string>[];
  totalTokenSupply: number;
};

const LinkRow: React.FC<LinkRowProps> = ({
  control,
  index,
  fieldset,
  totalTokenSupply,
  onDelete,
}) => {
  let sharePercentage: number;
  const {t} = useTranslation();
  const {account} = useWallet();

  return (
    <Container data-testid="link-row">
      <LabelContainer>
        <Controller
          name={`wallets.${index}.address`}
          control={control}
          render={({field, fieldState: {error}}) => (
            <>
              <LabelWrapper>
                <Label label={t('labels.label')} />
              </LabelWrapper>
              <ValueInput
                mode={error ? 'critical' : 'default'}
                name={field.name}
                value={field.value === account ? 'My Wallet' : field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                disabled={index === 0}
                adornmentText={
                  field.value ? t('labels.copy') : t('labels.paste')
                }
                onAdornmentClick={() =>
                  handleClipboardActions(
                    field.value === account ? account : field.value,
                    field.onChange
                  )
                }
              />
              {error?.message && (
                <ErrorContainer>
                  <AlertInline label={error.message} mode="critical" />
                </ErrorContainer>
              )}
            </>
          )}
        />
      </LabelContainer>

      <LinkContainer>
        <Popover
          side="bottom"
          align="end"
          width={156}
          content={
            <div className="p-1.5">
              <ListItemText
                title={t('labels.removeLink')}
                {...(typeof onDelete === 'function'
                  ? {mode: 'default', onClick: () => onDelete(index)}
                  : {mode: 'disabled'})}
              />
            </div>
          }
        >
          <ButtonIcon
            mode="ghost"
            size="large"
            bgWhite
            icon={<IconMenuVertical />}
            data-testid="trigger"
          />
        </Popover>
      </LinkContainer>

      <Break />

      <ButtonWrapper>
        <Controller
          name={`wallets.${index}.amount`}
          control={control}
          render={({field, fieldState: {error}}) => (
            <>
              <LabelWrapper>
                <Label label={t('labels.link')} />
              </LabelWrapper>

              <NumberInput
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder="0"
                min={0}
                mode={error?.message ? 'critical' : 'default'}
                value={field.value}
              />
              {error?.message && (
                <ErrorContainer>
                  <AlertInline label={error.message} mode="critical" />
                </ErrorContainer>
              )}
            </>
          )}
        />
      </ButtonWrapper>

      <InputWrapper>
        <Controller
          name={`wallets.${index}.share`}
          control={control}
          render={({field, fieldState: {error}}) => (
            <>
              <LabelWrapper>
                <Label label={t('labels.label')} />
              </LabelWrapper>
              <TextInput
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={sharePercentage}
                mode="default"
                disabled
              />
              {error?.message && (
                <ErrorContainer>
                  <AlertInline label={error.message} mode="critical" />
                </ErrorContainer>
              )}
            </>
          )}
        />
      </InputWrapper>
    </Container>
  );
};

export default LinkRow;

const Container = styled.div.attrs({
  className: 'flex flex-wrap gap-x-2 gap-y-1.5 p-2 bg-ui-0',
})``;

const LabelContainer = styled.div.attrs({
  className: 'flex-1 tablet:order-1 h-full',
})``;

const LabelWrapper = styled.div.attrs({
  className: 'tablet:hidden mb-0.5',
})``;

const InputWrapper = styled.div.attrs({
  className: 'tablet:order-3 pt-3.5 tablet:pt-0 w-10',
})``;

const LinkContainer = styled.div.attrs({
  className: 'tablet:order-4',
})``;

const ErrorContainer = styled.div.attrs({
  className: 'mt-0.5',
})``;

const Break = styled.hr.attrs({className: 'tablet:hidden w-full border-0'})``;

const ButtonWrapper = styled.div.attrs({
  className: 'flex-1 tablet:order-2 h-full',
})``;
