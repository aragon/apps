import React from 'react';
import {useTranslation} from 'react-i18next';

import EmptyState from '../addAddresses/emptyState';
import {useActionsContext} from 'context/actions';
import {useDaoWhitelist} from 'hooks/useDaoMembers';
import {useDaoParam} from 'hooks/useDaoParam';
import {AccordionMethod} from 'components/accordionMethod';
import {
  ButtonIcon,
  ButtonText,
  Dropdown,
  IconMenuVertical,
  Label,
  ListItemAction,
} from '@aragon/ui-components';
import ManageWalletsModal from 'containers/manageWalletsModal';
import {useGlobalModalContext} from 'context/globalModals';
import {useFormContext, useWatch, useFieldArray} from 'react-hook-form';
import {AddressRow} from '../addAddresses/addressRow';
import {FormItem, AccordionFooter} from '../addAddresses';

type Props = {
  index: number;
};

const RemoveAddresses: React.FC<Props> = ({index: actionIndex}) => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();

  const {removeAction} = useActionsContext();

  const {data: dao} = useDaoParam();
  const {data: members} = useDaoWhitelist(dao);

  const membersListKey = `actions.${actionIndex}.inputs.memberWallets`;
  const {control} = useFormContext();

  const memberWallets = useWatch({name: membersListKey, control});

  const {fields, update, replace, remove} = useFieldArray({
    control,
    name: membersListKey,
  });

  const controlledWallets = fields.map((field, ctrlledIndex) => {
    return {
      ...field,
      ...(memberWallets && {...memberWallets[ctrlledIndex]}),
    };
  });

  const handleAddWallets = (wallets: Array<string>) => {
    replace(wallets.map(address => ({address})));
  };

  function handleResetAll() {
    controlledWallets.forEach((_, index) => {
      update(index, {address: ''});
    });
  }

  function handleRowDelete(rowIndex: number) {
    remove(rowIndex);
  }

  function handleDeleteAll() {
    replace([]);
  }

  const rowActions = [
    {
      component: (
        <ListItemAction
          title={t('labels.whitelistWallets.deleteEntry')}
          bgWhite
        />
      ),
      callback: (rowIndex: number) => {
        handleRowDelete(rowIndex);
      },
    },
  ];

  const methodActions = [
    {
      component: <ListItemAction title={t('labels.resetAction')} bgWhite />,
      callback: handleResetAll,
    },
    {
      component: (
        <ListItemAction title={t('labels.removeEntireAction')} bgWhite />
      ),
      callback: () => {
        removeAction(actionIndex);
      },
    },
  ];

  /*************************************************
   *                    Render                    *
   *************************************************/
  return (
    <>
      <AccordionMethod
        verified
        type="action-builder"
        methodName={t('labels.removeWallets')}
        smartContractName={t('labels.aragonCore')}
        methodDescription={t('labels.removeWalletsDescription')}
        dropdownItems={methodActions}
      >
        {!memberWallets || memberWallets.length === 0 ? (
          <EmptyState
            title={t('labels.whitelistWallets.noWallets')}
            subtitle={t('labels.whitelistWallets.removeWalletsSubtitle')}
            buttonLabel={t('labels.selectWallet')}
            onClick={() => open('manageWallet')}
          />
        ) : (
          <>
            <FormItem className="hidden desktop:block py-1.5">
              <Label label={t('labels.whitelistWallets.address')} />
            </FormItem>
            {controlledWallets.map((field, fieldIndex) => (
              <FormItem key={field.id}>
                <div className="desktop:hidden mb-0.5 desktop:mb-0">
                  <Label label={t('labels.whitelistWallets.address')} />
                </div>
                <AddressRow
                  key={field.id}
                  actionIndex={actionIndex}
                  fieldIndex={fieldIndex}
                  dropdownItems={rowActions}
                />
              </FormItem>
            ))}
            <FormItem className="flex justify-between">
              <ButtonText
                label={t('labels.selectWallet')}
                mode="secondary"
                size="large"
                bgWhite
                onClick={() => open('manageWallet')}
              />

              <Dropdown
                side="bottom"
                align="start"
                sideOffset={4}
                trigger={
                  <ButtonIcon
                    size="large"
                    mode="secondary"
                    icon={<IconMenuVertical />}
                    data-testid="trigger"
                    bgWhite
                  />
                }
                listItems={[
                  {
                    component: (
                      <ListItemAction
                        title={t('labels.whitelistWallets.resetAllEntries')}
                        bgWhite
                      />
                    ),
                    callback: handleResetAll,
                  },
                  {
                    component: (
                      <ListItemAction
                        title={t('labels.whitelistWallets.deleteAllEntries')}
                        bgWhite
                      />
                    ),
                    callback: handleDeleteAll,
                  },
                  {
                    component: (
                      <ListItemAction
                        title={t('labels.whitelistWallets.uploadCSV')}
                        bgWhite
                        mode="disabled"
                      />
                    ),
                    callback: () => {},
                  },
                ]}
              />
            </FormItem>
            <AccordionFooter total={controlledWallets.length} />
          </>
        )}

        <ManageWalletsModal
          addWalletCallback={handleAddWallets}
          wallets={members?.map(member => member.id) || []}
        />
      </AccordionMethod>
    </>
  );
};

export default RemoveAddresses;
