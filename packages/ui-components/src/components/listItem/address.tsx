import React, {ButtonHTMLAttributes, FC} from 'react';
import styled from 'styled-components';
import {shortenAddress} from '../../utils/addresses';
import {AvatarWallet} from '../avatar';
import {IconLinkExternal} from '../icons';

type TokenInfo = {
  amount: number;
  symbol: string;
  percentage: number;
};

export type ListItemAddressProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  src: string;
  tokenInfo?: TokenInfo;
};

export const ListItemAddress: FC<ListItemAddressProps> = ({src, tokenInfo}) => {
  return (
    <Container data-testid="listItem-address">
      <div className="flex space-x-2">
        <AvatarWallet src={src} />
        <p className="font-bold">{shortenAddress(src)}</p>
      </div>

      <div className="flex space-x-2 items-center text-sm">
        {tokenInfo && (
          <p>
            {tokenInfo.amount} {tokenInfo.symbol} ({tokenInfo.percentage}%)
          </p>
        )}
        <IconLinkExternal />
      </div>
    </Container>
  );
};

const Container = styled.button.attrs(() => {
  const baseLayoutClasses = 'flex items-center justify-between w-full';
  const baseStyleClasses = 'bg-ui-0 p-2 tablet:p-3 rounded-xl';
  let className:
    | string
    | undefined = `${baseLayoutClasses} ${baseStyleClasses}`;

  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-primary-500';
  const hoverClasses = 'hover:text-primary-500';
  const activeClasses = 'active:outline-none active:ring-0';

  className += ` text-ui-600 ${activeClasses} ${focusClasses} ${hoverClasses}`;

  return {className};
})``;
