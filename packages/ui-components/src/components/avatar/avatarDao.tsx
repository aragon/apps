import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

export type AvatarDaoProps = {
  daoName: string;
  src?: string;
  onClick?: () => void;
};

export const AvatarDao: React.FC<AvatarDaoProps> = ({
  daoName,
  src,
  onClick,
}) => {
  const [error, setError] = useState(false);

  const getDaoInitials = useCallback(() => {
    const arr = daoName.trim().split(' ');

    // one name, append D for dao to first letter
    if (arr.length === 1) return arr[0][0] + 'D';
    else return arr[0][0] + arr[1][0];
  }, [daoName]);

  return error === true || !src ? (
    <FallBackAvatar onClick={onClick}>
      <DaoInitials>{getDaoInitials()}</DaoInitials>
    </FallBackAvatar>
  ) : (
    <Avatar
      src={src}
      alt="dao avatar"
      onClick={onClick}
      onError={() => setError(true)}
    />
  );
};

const Avatar = styled.img.attrs({
  className: 'h-6 w-6 rounded-xl',
})``;

const FallBackAvatar = styled.div.attrs({
  className:
    'flex items-center justify-center font-bold text-ui-0 bg-gradient-to-r from-primary-500 to-primary-800 h-6 w-6 rounded-xl border',
})``;

const DaoInitials = styled.p.attrs({
  className: 'w-4 h-4 flex items-center justify-center',
})``;
