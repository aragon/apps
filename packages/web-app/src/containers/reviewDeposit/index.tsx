import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import {CardText, CardToken, CardTransfer} from '@aragon/ui-components';

import {fetchTokenPrice} from 'services/prices';

const ReviewDeposit: React.FC = () => {
  const {t} = useTranslation();
  const {getValues} = useFormContext();
  const [price, setPrice] = useState('$0.0');
  const values = getValues();

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await fetchTokenPrice(values.tokenAddress);
      setPrice(tokenPrice);
    }

    getPrice();
  }, [values.tokenAddress]);

  return (
    <div className="flex flex-col space-y-1.5 desktop:space-y-3">
      <CardTransfer
        to="DAO Name"
        from={values.from}
        toLabel={t('labels.to')}
        fromLabel={t('labels.from')}
      />
      <CardToken
        type="transfer"
        tokenName={values.tokenName}
        tokenCount={values.amount.toString()}
        tokenSymbol={values.tokenSymbol}
        tokenImageUrl={values.tokenImgUrl}
        treasuryShare={price}
      />
      <CardText
        type="label"
        title={t('labels.reference')}
        content={values.reference || ''}
      />
    </div>
  );
};

export default ReviewDeposit;
