import React from 'react';
import {useTranslation} from 'react-i18next';

import EmptyState from '../addAddresses/emptyState';
import {useActionsContext} from 'context/actions';
import {useDaoWhitelist} from 'hooks/useDaoMembers';
import {useDaoParam} from 'hooks/useDaoParam';
import {AccordionMethod} from 'components/accordionMethod';
import {ListItemAction} from '@aragon/ui-components';

type Props = {
  index: number;
};

const RemoveAddresses: React.FC<Props> = ({index}) => {
  const {t} = useTranslation();
  const {removeAction} = useActionsContext();

  const {data: dao} = useDaoParam();
  const {data: members} = useDaoWhitelist(dao);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  const rowActions = [
    {
      component: (
        <ListItemAction
          title={t('labels.whitelistWallets.deleteEntry')}
          bgWhite
        />
      ),
      callback: () => {
        handleRowDelete(index);
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
        removeAction(index);
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
        <EmptyState
          title={t('labels.whitelistWallets.noWallets')}
          subtitle={t('labels.whitelistWallets.removeWalletsSubtitle')}
          buttonLabel={t('labels.selectWallet')}
          onClick={() => {}}
        />
      </AccordionMethod>
    </>
  );
};

export default RemoveAddresses;

function handleRowReset(index: number) {
  throw new Error('Function not implemented.');
}

function handleRowDelete(index: number) {
  throw new Error('Function not implemented.');
}

function handleResetAll() {
  throw new Error('Function not implemented.');
}
