import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useLocation} from 'react-router-dom';
import {withTransaction} from '@elastic/apm-rum-react';
import {ButtonText, TextInput} from '@aragon/ui-components';
import React, {useCallback, useEffect, useState} from 'react';
import {useForm, Control, Controller} from 'react-hook-form';

import {useWallet} from 'context/augmentedWallet';
import {TransferTypes} from 'utils/constants';
import {useWalletProps} from 'containers/walletMenu';

const enum Steps {
  'Configure Deposit',
  'Review Transfer',
}

// TODO: Investigate token price. Will we be able to get the token
// price at specific day transfer was made? If not, should we store price?
type FormInputs = {
  amount: number;
  reference?: string;
  type: TransferTypes;
  from: Address | null; // null because of useWallet props types
  to: Address;
  tokenSymbol: string;
  tokenAddress: Address;
};

const defaultValues = {
  amount: 0,
  reference: '',
  tokenAddress: '',
  tokenSymbol: '',
};

// TODO: consider making this a protected route?
// Because type isn't set on here, navigating to /new-transfer automatically set to deposit?
// Or, separate routes new-deposit & new-withdraw that render same component?
const NewTransfer = () => {
  const {state} = useLocation();
  const {account}: useWalletProps = useWallet();
  const [currentStep, setStep] = useState<Steps>(Steps['Configure Deposit']);
  const {control, watch, setValue} = useForm<FormInputs>({defaultValues});

  useEffect(() => {
    setValue('from', account);
    setValue('type', state.transferType);
  }, [account, setValue, state.transferType]);

  /** Function used for navigating to the next step in the process */
  const gotoNextStep = useCallback(() => {
    setStep(current => current + 1);
  }, []);

  /** Function used for navigating to the previous step in the process */
  const gotoPreviousStep = useCallback(() => {
    setStep(current => current - 1);
  }, []);

  // FIXME: currently ignores withdraw
  return (
    <div>
      {/* // TODO: remove; only here to display */}
      <p>New Transfer - {state.transferType || 'deposit'}</p>

      <form>
        {currentStep === Steps['Configure Deposit'] ? (
          <ConFigureDepositView next={gotoNextStep} control={control} />
        ) : (
          <ReviewTransferView prev={gotoPreviousStep} control={control} />
        )}
      </form>

      {/* // TODO: remove; only here to display */}
      <pre className="mt-2">
        Form values: {JSON.stringify(watch(), null, 2)}
      </pre>
    </div>
  );
};

export default withTransaction('NewTransfer', 'component')(NewTransfer);

/********************************************************************
 *     STUBS. Each view should be its own component/page thing      *
 ********************************************************************/
type ConfigureProps = {next: () => void; control: Control<FormInputs>};
const ConFigureDepositView: React.FC<ConfigureProps> = ({next, control}) => {
  return (
    <>
      <p>Step 1 - Configure Deposit</p>
      <p className="mt-4">Token Address</p>
      <Controller
        name="tokenAddress"
        defaultValue=""
        control={control}
        render={({field: {name, onBlur, onChange, value}}) => {
          return (
            <TextInput
              side="left"
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          );
        }}
      />
      <div className="mt-4">
        <ButtonText mode="primary" label="continue" onClick={next} />
      </div>
    </>
  );
};

type ReviewProps = {prev: () => void; control: Control<FormInputs>};
const ReviewTransferView: React.FC<ReviewProps> = ({prev, control}) => {
  return (
    <>
      <p>Step 2 - Review Deposit</p>
      <p className="mt-4">Token Symbol</p>
      <Controller
        name="tokenSymbol"
        defaultValue=""
        control={control}
        render={({field: {name, onBlur, onChange, value}}) => {
          return (
            <TextInput
              side="left"
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          );
        }}
      />
      <div className="mt-4">
        <ButtonText mode="secondary" label="go back" onClick={prev} />
      </div>
    </>
  );
};
