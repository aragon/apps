import {
  Popover,
  ListItemAction,
  ButtonIcon,
  IconMenuVertical,
  AlertInline,
  ButtonText,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import React, {useState} from 'react';

import {useActionsContext} from 'context/actions';
import {AccordionMethod} from 'components/accordionMethod';
// import AddAddress from './addAddress';

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
      methodName="Method Name"
      smartContractName="Aragon Core"
      verified
      methodDescription="This is the description of the method provided by NatSpec Format or if those are our smart contracts, by further implementation"
      additionalInfo="The total token supply is inclusive of the already distributed tokens of the existing holders."
    >
      <div className="bg-white rounded-b-xl border border-t-0 divide-y border-ui-100 divide-ui-100">
        <div className="h-32"></div>

        <div className="flex p-3 space-x-2">
          <ButtonText
            label="Add Wallet"
            mode="secondary"
            size="large"
            bgWhite
          />
          <ButtonText label="Upload CSV" mode="ghost" size="large" bgWhite />
        </div>

        <div className="p-3 space-y-1.5 font-bold text-ui-800">
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
