import React, {useMemo, useState} from 'react';
import styled from 'styled-components';

export type AvatarDaoProps = {
  daoName: string;
  src?: string;
  size?: 'small' | 'medium' | 'big' | 'hero';
  onClick?: () => void;
};

export const AvatarDao: React.FC<AvatarDaoProps> = ({
  daoName,
  src,
  size = 'medium',
  onClick,
}) => {
  const [error, setError] = useState(false);

  const daoInitials = useMemo(() => {
    const arr = daoName.trim().split(' ');
    if (arr.length === 1) return arr[0][0];
    else return arr[0][0] + arr[1][0];
  }, [daoName]);

  return error || !src ? (
    <FallBackAvatar onClick={onClick} size={size}>
      <DaoInitials>{daoInitials}</DaoInitials>
    </FallBackAvatar>
  ) : (
    <Avatar
      src={src}
      size={size}
      alt="dao avatar"
      onClick={onClick}
      onError={() => setError(true)}
    />
  );
};

type SizeType = {size: NonNullable<AvatarDaoProps['size']>};

const sizes = {
  small: 'w-3 h-3 text-xs',
  medium: 'w-6 h-6',
  big: 'w-10 h-10 text-lg',
  hero: 'w-14 h-14 text-xl',
};

const Avatar = styled.img.attrs(({size}: SizeType) => ({
  className: `${sizes[size]} rounded-full`,
}))<SizeType>``;

const FallBackAvatar = styled.div.attrs(({size}: SizeType) => ({
  className:
    'flex items-center justify-center font-bold text-ui-0 bg-gradient-to-r' +
    ` from-primary-500 to-primary-800 ${sizes[size]} rounded-full border`,
}))<SizeType>``;

const DaoInitials = styled.p.attrs({
  className: 'w-4 h-4 flex items-center justify-center',
})``;
