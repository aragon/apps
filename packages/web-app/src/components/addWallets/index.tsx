import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
  ButtonText,
  ListItemAction,
  IconMenuVertical,
  ButtonIcon,
  Dropdown,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {useFormContext, useFieldArray, useWatch} from 'react-hook-form';

import Row from './row';
import Header from './header';
import Footer from './footer';
import {useWallet} from 'hooks/useWallet';
import {constants} from 'ethers';

const AddWallets: React.FC = () => {
  const {t} = useTranslation();
  const {address} = useWallet();

  const {control, setValue, resetField, trigger} = useFormContext();
  const watchFieldArray = useWatch({name: 'wallets', control: control});
  const {fields, append, remove, insert} = useFieldArray({
    name: 'wallets',
    control,
  });

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...(watchFieldArray && {...watchFieldArray[index]}),
    };
  });

  useEffect(() => {
    if (
      address &&
      watchFieldArray[1]?.address !== address &&
      controlledFields[1]?.address !== address
    ) {
      insert(1, {address: address, amount: '0'});
    }
  }, [address, controlledFields, insert, watchFieldArray]);

  const resetDistribution = () => {
    controlledFields.forEach((_, index) => {
      setValue(`wallets.${index}.amount`, '0');
    });
    resetField('tokenTotalSupply');
  };

  // setTimeout added because instant trigger not working
  const handleAddWallet = () => {
    append({address: '', amount: '0'});
    setTimeout(() => {
      trigger(`wallets.${controlledFields.length}.address`);
    }, 50);
  };

  return (
    <Container data-testid="add-wallets">
      <ListGroup>
        <Header />
        {controlledFields.map((field, index) => {
          return (
            <Row
              key={field.id}
              index={index}
              {...(index !== 0 ? {onDelete: () => remove(index)} : {})}
            />
          );
        })}
        <Footer totalAddresses={fields.length || 0} />
      </ListGroup>
      <ActionsWrapper>
        <ButtonText
          label={t('labels.addWallet') as string}
          mode="secondary"
          size="large"
          onClick={handleAddWallet}
        />
        <Dropdown
          align="start"
          trigger={
            <ButtonIcon
              mode="ghost"
              size="large"
              bgWhite
              icon={<IconMenuVertical />}
              data-testid="trigger"
            />
          }
          sideOffset={8}
          listItems={[
            {
              component: (
                <ListItemAction title={t('labels.resetDistribution')} bgWhite />
              ),
              callback: resetDistribution,
            },
            {
              component: (
                <ListItemAction
                  title={t('labels.deleteAllAddresses')}
                  bgWhite
                />
              ),
              callback: () => {
                remove();
                append([{address: constants.AddressZero, amount: '0'}]);
                resetField('tokenTotalSupply');
              },
            },
          ]}
        />
      </ActionsWrapper>
    </Container>
  );
};

export default AddWallets;

const Container = styled.div.attrs({className: 'space-y-1.5'})``;

const ListGroup = styled.div.attrs({
  className: 'flex flex-col overflow-hidden space-y-0.25 rounded-xl',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex justify-between',
})``;
