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

export const ListItemAddress: FC<ListItemAddressProps> = ({
  src,
  tokenInfo,
  ...props
}) => {
  return (
    <Container data-testid="listItem-address" {...props}>
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
  const baseLayoutClasses =
    'flex items-center justify-between w-full border-2 border-transparent ';
  const baseStyleClasses = 'bg-ui-0 p-2 tablet:p-3 rounded-xl';
  let className:
    | string
    | undefined = `${baseLayoutClasses} ${baseStyleClasses}`;

  const focusVisibleClasses =
    'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent';
  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-primary-500';
  const hoverClasses = 'hover:text-primary-500 hover:shadow-100';
  const activeClasses = 'active:outline-none active:border-ui-200';

  className += ` text-ui-600 ${focusVisibleClasses} ${focusClasses} ${activeClasses} ${hoverClasses}`;

  return {className};
})``;

const LeftContent = styled.div.attrs({className: 'flex space-x-2'})``;
const RightContent = styled.div.attrs({
  className: 'flex space-x-2 items-center ft-text-sm',
})``;
