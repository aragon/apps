import React from 'react';
import styled from 'styled-components';
import Blockies from 'react-blockies';

import {IsAddress} from '../../utils/addresses';

const SQUARES = 8;

const styles: {
  [key: string]: {style: string; scale: number};
} = {
  small: {style: 'w-2 h-2', scale: 2},
  medium: {style: 'w-3 h-3', scale: 3},
};

export type AvatarWalletProps = {
  size?: 'small' | 'medium';
  /**
   * Url of the avatar icon OR wallet address
   */
  src: string;
};

export const AvatarWallet: React.FC<AvatarWalletProps> = ({
  src,
  size = 'medium',
}) => {
  return IsAddress(src) ? (
    <StyledBlockies size={SQUARES} seed={src} scale={styles[size].scale} />
  ) : (
    <StyledAvatar size={size} src={src} />
  );
};

const StyledBlockies = styled(Blockies).attrs({
  className: 'rounded-full',
})``;

type SizeProps = Pick<AvatarWalletProps, 'size'>;
const StyledAvatar = styled.img.attrs(({size = 'medium'}: SizeProps) => {
  return {
    className: `${styles[size].style} rounded-full`,
  };
})<SizeProps>``;
