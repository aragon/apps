import React from 'react';

import {IconChevronRight} from '../icons';

export type TransferListItemProps = {
  title: string;
  tokenAmount: string;
  transferDate: string;
  usdValue: string;
};

export const TransferListItem: React.FC<TransferListItemProps> = ({
  title,
  transferDate,
}) => {
  return (
    <button
      data-testid="transferListItem"
      className="group w-full px-2 desktop:px-3 py-1.5 desktop:py-2.5 bg-ui-0 rounded-xl flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 active:bg-ui-100"
    >
      <div className="w-3 h-3 border desktop:w-5 desktop:h-5" />
      <div className="flex-1 text-left border">
        <p className="font-bold text-ui-800 group-hover:text-primary-500">
          {title}
        </p>
        <p className="text-sm text-ui-500">{transferDate}</p>
      </div>
      <div className="text-right border">
        <p className="font-bold text-ui-800">$1,000</p>
        <p className="text-sm text-ui-500">amt</p>
      </div>
      <IconChevronRight className="text-ui-300 group-hover:text-primary-500" />
    </button>
  );
};
