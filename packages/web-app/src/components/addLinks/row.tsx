import {
  AlertInline,
  ButtonIcon,
  IconMenuVertical,
  ListItemText,
  Popover,
  TextInput,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Control, Controller, FieldValues} from 'react-hook-form';

type LinkRowProps = {
  control: Control<FieldValues, object>;
  index: number;
  onDelete?: (index: number) => void;
};

const LinkRow: React.FC<LinkRowProps> = ({control, index, onDelete}) => {
  const {t} = useTranslation();

  return (
    <Row data-testid="link-row">
      <Controller
        name={`links.${index}.label`}
        control={control}
        render={({field, fieldState: {error}}) => (
          <RowItemWrapper>
            <TextInput
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
            />
            {error?.message && (
              <AlertInline label={error.message} mode="critical" />
            )}
          </RowItemWrapper>
        )}
      />
      <Controller
        name={`links.${index}.link`}
        control={control}
        render={({field, fieldState: {error}}) => (
          <RowItemWrapper>
            <TextInput
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              placeholder="https://"
            />
            {error?.message && (
              <AlertInline label={error.message} mode="critical" />
            )}
          </RowItemWrapper>
        )}
      />

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
    </Row>
  );
};

export default LinkRow;

export const Row = styled.div.attrs({
  className: 'flex p-2 space-x-2 bg-ui-0',
})``;

export const RowItemWrapper = styled.div.attrs({
  className: 'flex-1 space-y-0.5',
})``;
