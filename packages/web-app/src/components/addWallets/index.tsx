import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {useFormContext, useFieldArray} from 'react-hook-form';

import Row from './row';
import Header from './header';
import Footer from './footer';

const AddWallets: React.FC = () => {
  const {t} = useTranslation();
  const {control, watch} = useFormContext();
  const watchFieldArray = watch('wallets');
  const {fields, append, remove} = useFieldArray({name: 'wallets', control});

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...(watchFieldArray && {...watchFieldArray[index]}),
    };
  });

  if (fields.length === 0) {
    append([
      {address: 'DAO Treasury', amount: '0'},
      {address: 'My Wallet', amount: '0'},
    ]);
  }

  // TODO: research focus after input refactor
  const handleAddWallet = () => {
    append({address: '', amount: '0'});
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
      <ButtonText
        label={t('labels.addWallet') as string}
        mode="secondary"
        size="large"
        onClick={handleAddWallet}
      />
    </Container>
  );
};

export default AddWallets;

const Container = styled.div.attrs({className: 'space-y-1.5'})``;
const ListGroup = styled.div.attrs({
  className: 'flex flex-col overflow-hidden space-y-0.25 rounded-xl',
})``;
