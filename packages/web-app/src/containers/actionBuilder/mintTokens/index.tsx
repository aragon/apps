import {
  Popover,
  ListItemAction,
  ButtonIcon,
  IconMenuVertical,
  AlertInline,
  ButtonText,
  ValueInput,
  Label,
  NumberInput,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import React, {useState} from 'react';

import {useActionsContext} from 'context/actions';
import {AccordionMethod} from 'components/accordionMethod';

type Props = {
  index: number;
};

const MintTokens: React.FC<Props> = ({index}) => {
  const {t} = useTranslation();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const {removeAction, duplicateAction} = useActionsContext();
  const {setValue, clearErrors} = useFormContext();

  return (
    <AccordionMethod
      type="action-builder"
      methodName="Mint Tokens"
      smartContractName="Aragon Core"
      verified
      methodDescription="Which wallet addresses should get tokens, and how much?  Add the wallets you want here, and then choose the distribution. Upload a CSV with this template if you want."
      additionalInfo="The total token supply is inclusive of the already distributed tokens of the existing holders."
    >
      <div className="bg-white rounded-b-xl border border-t-0 divide-y border-ui-100 divide-ui-100">
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
              <ButtonIcon
                mode="ghost"
                size="large"
                icon={<IconMenuVertical />}
              />
            </div>
          </div>
          <div>
            <Label label="Tokens" />
            <div className="flex tablet:pr-8 space-x-2">
              <NumberInput
                placeholder="0"
                min={0}
                includeDecimal
                value={10.1}
              />
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

        <div className="flex justify-between tablet:justify-start p-2 tablet:p-3 space-x-2">
          <ButtonText
            label="Add Wallet"
            mode="secondary"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
          />
          <ButtonText
            label="Upload CSV"
            mode="ghost"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
          />
        </div>

        <div className="p-2 tablet:p-3 space-y-1.5 font-bold text-ui-800">
          <p>Summary</p>
          <div className="flex justify-between">
            <p className="font-normal text-ui-500">New Tokens</p>
            <p>+8000 LRX</p>
          </div>
          <div className="flex justify-between">
            <p className="font-normal text-ui-500">New Holders</p>
            <p>+2</p>
          </div>
          <div className="flex justify-between">
            <p className="font-normal text-ui-500">Total Tokens</p>
            <p>100,000 LRX</p>
          </div>
          <div className="flex justify-between">
            <p className="font-normal text-ui-500">Total Holders</p>
            <p>1000</p>
          </div>
        </div>
      </div>
    </AccordionMethod>
  );
};

export default MintTokens;
