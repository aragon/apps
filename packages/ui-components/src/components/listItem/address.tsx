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
  /**
   * String representing EITHER a wallet address OR an ens name.
   */
  src: string;
  /**
   * Optional token information. Consists of a token amount, symbol and share.
   */
  tokenInfo?: TokenInfo;
};

export const ListItemAddress: FC<ListItemAddressProps> = ({src, tokenInfo}) => {
  return (
    <Container data-testid="listItem-address">
      <LeftContent>
        <AvatarWallet src={src} />
        <p className="font-bold">{shortenAddress(src)}</p>
      </LeftContent>

      <RightContent>
        {tokenInfo && (
          <p className="text-ui-500">
            {tokenInfo.amount} {tokenInfo.symbol} ({tokenInfo.percentage}%)
          </p>
        )}
        <IconLinkExternal />
      </RightContent>
    </Container>
  );
};

const Container = styled.button.attrs(() => {
  const baseLayoutClasses = 'flex justify-between w-full';
  const baseStyleClasses = 'bg-ui-0 p-2 tablet:p-3 rounded-xl';
  let className:
    | string
    | undefined = `${baseLayoutClasses} ${baseStyleClasses}`;

  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-primary-500';
  const hoverClasses = 'hover:text-primary-500 hover:shadow-100';
  const activeClasses = 'active:outline-none active:ring-0';

  className += ` text-ui-600 ${activeClasses} ${focusClasses} ${hoverClasses}`;

  return {className};
})``;

const LeftContent = styled.div.attrs({className: 'flex space-x-2'})``;
const RightContent = styled.div.attrs({
  className: 'flex space-x-2 items-center text-sm',
})``;
