import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {ButtonText, ButtonIcon, IconMenuVertical} from '@aragon/ui-components';

import EmptyState from './emptyState';
import {AccordionMethod} from 'components/accordionMethod';
import {useActionsContext} from 'context/actions';

type Props = {
  index: number;
};

const AddAddresses: React.FC<Props> = ({index}) => {
  const {t} = useTranslation();
  const {removeAction, duplicateAction} = useActionsContext();

  // form context
  const {control} = useFormContext();
  const memberWallets = useWatch({
    name: `actions.${index}.inputs.memberWallets`,
    control,
  });

  const {fields, update, replace, append, remove} = useFieldArray({
    control,
    name: `actions.${index}.inputs.memberWallets`,
  });

  const controlledWallets = fields.map((field, index) => {
    return {
      ...field,
      ...(memberWallets && {...memberWallets[index]}),
    };
  });

  /*************************************************
   *                Hooks & Effects                *
   *************************************************/
  useEffect(() => {
    if (controlledWallets.length === 0) {
      append({address: ''});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  // reset all rows
  const handleResetAll = () => {
    controlledWallets.forEach((_, index) => {
      update(index, {address: ''});
    });
  };

  // reset single row
  const handleRowReset = (index: number) => {
    update(index, {address: ''});
  };

  // remove all rows
  const handleDeleteAll = () => {
    replace([{address: ''}]);
  };

  // remove single row
  const handleRowDelete = (index: number) => {
    remove(index);
  };

  // add empty wallet
  const handleAdd = () => {
    append({address: ''});
  };

  /*************************************************
   *                    Render                    *
   *************************************************/
  return (
    <AccordionMethod
      type="action-builder"
      methodName={t('labels.addWallets')}
      smartContractName={t('labels.aragonCore')}
      verified
      methodDescription={'Change me!'}
      additionalInfo={'Change me!'}
      duplicateActionCallback={() => duplicateAction(index)}
      removeActionCallback={() => removeAction(index)}
      resetActionCallback={handleResetAll}
    >
      {controlledWallets.length === 0 ? (
        <EmptyState
          title="No Wallets"
          subtitle="Add wallets to DAO"
          buttonLabel="Add Wallet"
          onClick={() => {}}
        />
      ) : (
        <>
          {controlledWallets.map((field, index) => {
            <div></div>;
          })}
          <AccordionFooter>
            <ButtonText
              label="Add Wallet"
              mode="secondary"
              size="large"
              bgWhite
              onClick={handleAdd}
            />
            <ButtonIcon
              size="large"
              mode="secondary"
              icon={<IconMenuVertical />}
              data-testid="trigger"
              bgWhite
            />
          </AccordionFooter>
        </>
      )}
    </AccordionMethod>
  );
};

export default AddAddresses;

export const FormGroup = styled.div.attrs({
  className: 'p-3 bg-ui-0 border border-ui-100 border-t-0' as
    | string
    | undefined,
})``;

const AccordionFooter = styled.div.attrs({
  className:
    'flex justify-between py-1.5 px-3 bg-ui-0 rounded-b-xl border border-t-0 border-ui-100',
})``;

// import {
//   ButtonIcon,
//   ButtonText,
//   IconMenuVertical,
//   IlluObject,
//   Label,
// } from '@aragon/ui-components';
// import styled from 'styled-components';
// import {useTranslation} from 'react-i18next';
// import React, {useEffect} from 'react';
// import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';

// import {Row} from 'components/whitelistWallets/row';
// import {AccordionMethod} from 'components/accordionMethod';
// import {useActionsContext} from 'context/actions';

// type Props = {
//   index: number;
// };

// const ManageWalletsAction: React.FC<Props> = ({index}) => {
//   const {t} = useTranslation();
//   const {removeAction, duplicateAction} = useActionsContext();

//   const {control, getValues} = useFormContext();
//   const whitelistWallets = useWatch({
//     name: 'whitelistWallets',
//     control,
//   });
//   const {fields, update, replace, append, remove} = useFieldArray({
//     control,
//     name: 'whitelistWallets',
//   });

//   const controlledWallets = fields.map((field, index) => {
//     return {
//       ...field,
//       ...(whitelistWallets && {...whitelistWallets[index]}),
//     };
//   });

//   useEffect(() => {
//     if (controlledWallets.length === 0) {
//       append({});
//     }
//     // disabling eslint for this line because I can. Jk. need this to run just once
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // reset all rows
//   const handleResetAll = () => {
//     controlledWallets.forEach((_, index) => {
//       update(index, {address: ''});
//     });
//   };

//   // reset single row
//   const handleRowReset = (index: number) => {
//     update(index, {address: ''});
//   };

//   // remove all rows
//   const handleDeleteAll = () => {
//     replace([{address: ''}]);
//   };

//   // remove single row
//   const handleRowDelete = (index: number) => {
//     remove(index);
//   };

//   // add empty wallet
//   const handleAdd = () => {
//     append({address: ''});
//   };

//   return (
//     <AccordionMethod
//       type="action-builder"
//       methodName={t('labels.addWallets')}
//       smartContractName={t('labels.aragonCore')}
//       verified
//       methodDescription={'Change me!'}
//       additionalInfo={t('newProposal.addRemoveWallets.additionalInfo')}
//       duplicateActionCallback={() => duplicateAction(index)}
//       removeActionCallback={() => removeAction(index)}
//       resetActionCallback={handleResetAll}
//     >
//       {controlledWallets.length > 0 ? (
//         <>
//           {controlledWallets.map((field, index) => (
//             <WalletRow
//               index={index}
//               key={field.id}
//               reset={handleRowReset}
//               delete={handleRowDelete}
//             />
//           ))}

//           <AccordionFooter>
//             <ButtonText
//               label="Add Wallet"
//               mode="secondary"
//               size="large"
//               bgWhite
//               onClick={handleAdd}
//             />
//             <ButtonIcon
//               size="large"
//               mode="secondary"
//               icon={<IconMenuVertical />}
//               data-testid="trigger"
//               bgWhite
//             />
//           </AccordionFooter>
//         </>
//       ) : (
//         <EmptyState />
//       )}
//     </AccordionMethod>
//   );
// };

// export default ManageWalletsAction;

// const AccordionFooter = styled.div.attrs({
//   className:
//     'flex justify-between py-1.5 px-3 bg-ui-0 rounded-b-xl border border-t-0 border-ui-100',
// })``;

// type WalletRowProps = {
//   index: number;
//   reset: (index: number) => void;
//   delete: (index: number) => void;
// };

// const WalletRow: React.FC<WalletRowProps> = props => {
//   return (
//     <FormGroup>
//       <Label label="Address" />
//       <Row
//         classes="mt-1"
//         name="action.whiteListWallets"
//         index={props.index}
//         onResetEntry={props.reset}
//         onDeleteEntry={props.delete}
//         triggerBgWhite
//       />
//     </FormGroup>
//   );
// };

// const EmptyState: React.FC<{}> = () => (
//   <FormGroup className="rounded-b-xl">
//     <div className="flex flex-col justify-center items-center">
//       <IlluObject object="wallet" />
//       <div className="flex flex-col items-center">
//         <p className="font-bold text-ui-800 ft-text-xl">No Wallets</p>
//         <p className="mt-1.5 text-ui-500 ft-text-base">
//           Choose existing wallets to remove
//         </p>
//         <ButtonText
//           label="Select Wallet"
//           className="mt-3"
//           size="large"
//           mode="secondary"
//           bgWhite
//           onClick={() => open('manageWallet')}
//         />
//       </div>
//     </div>
//   </FormGroup>
// );
