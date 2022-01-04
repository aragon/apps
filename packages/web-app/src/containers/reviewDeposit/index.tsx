import React from 'react';
import {useTranslation} from 'react-i18next';
import {UseFormGetValues} from 'react-hook-form';
import {CardText, CardToken, CardTransfer} from '@aragon/ui-components';

import {FormData} from 'pages/newDeposit';

type ReviewDepositProps = {getValues: UseFormGetValues<FormData>};
const ReviewDeposit: React.FC<ReviewDepositProps> = ({getValues}) => {
  const {t} = useTranslation();
  const values = getValues();

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
        treasuryShare="$10.00"
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
