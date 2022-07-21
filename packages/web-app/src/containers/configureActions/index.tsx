import React from 'react';
import {AlertInline, ButtonText, IconAdd, Label} from '@aragon/ui-components';
import {IlluObject} from '@aragon/ui-components/src/components/illustrations';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {useGlobalModalContext} from 'context/globalModals';
import {useActionsContext} from 'context/actions';
import ActionBuilder from 'containers/actionBuilder';

const ConfigureActions: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {actions} = useActionsContext();

  return (
    <>
      <FormItem>
        <Label
          label={t('newProposal.configureActions.yesOption')}
          helpText={t('newProposal.configureActions.yesOptionSubtitle')}
          isOptional
        />
        {actions.length !== 0 ? (
          <ActionsWrapper>
            <ActionBuilder />
            <ButtonText
              mode="ghost"
              size="large"
              bgWhite
              label={t('newProposal.configureActions.addAction')}
              iconLeft={<IconAdd />}
              onClick={() => open('addAction')}
              className="mt-2"
            />
          </ActionsWrapper>
        ) : (
          <>
            <div className="flex flex-col items-center p-6 text-center bg-ui-0 rounded-xl">
              <IlluObject object="smart_contract" />
              <h1 className="mt-1 text-xl font-bold text-ui-800">
                {t('newProposal.configureActions.addFirstAction')}
              </h1>
              <p className="mt-1.5 text-ui-500">
                {t('newProposal.configureActions.addFirstActionSubtitle')}
              </p>
              <ButtonText
                mode="secondary"
                size="large"
                bgWhite
                label={t('newProposal.configureActions.addAction')}
                iconLeft={<IconAdd />}
                onClick={() => open('addAction')}
                className="mt-3"
              />
            </div>
            <AlertInline
              label={t('newProposal.configureActions.actionsInfo')}
            />
          </>
        )}
      </FormItem>
    </>
  );
};

export default ConfigureActions;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'space-y-2',
})``;
