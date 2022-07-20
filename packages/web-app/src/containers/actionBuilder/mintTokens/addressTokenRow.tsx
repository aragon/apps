import React from 'react';
import {
  ButtonIcon,
  IconMenuVertical,
  ValueInput,
  Label,
  NumberInput,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

export const AddressAndTokenRow: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className="p-2 tablet:p-3 space-y-3">
      <div className="space-y-0.5">
        <Label label="Address" />
        <div className="flex space-x-2">
          <div className="flex-1">
            <ValueInput
              value=""
              adornmentText={t('labels.copy')}
              onAdornmentClick={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <ButtonIcon mode="ghost" size="large" icon={<IconMenuVertical />} />
        </div>
      </div>
      <div>
        <Label label="Tokens" />
        <div className="flex tablet:pr-8 space-x-2">
          <NumberInput placeholder="0" min={0} includeDecimal value={10.1} />
          {/* <PercentageInputDisplayWrapper>
        <PercentageInputDisplay
          name={`wallets.${index}.amount`}
          value={'5%'}
          mode="default"
          disabled
        />
      </PercentageInputDisplayWrapper> */}
        </div>
      </div>
    </div>
  );
};
