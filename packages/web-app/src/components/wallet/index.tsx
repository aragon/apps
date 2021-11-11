import React from 'react';
import styled from 'styled-components';
import {Button} from '@aragon/ui-components';

import {useWallet} from 'context/augmentedWallet';

const Wallet: React.FC = () => {
  const {account, balance, reset, connect, isConnected} = useWallet();
  return isConnected() ? (
    <Container>
      <div className="text-lg">Account: {account}</div>
      <div>Balance: {balance}</div>
      <Button primary label="Disconnect" onClick={() => reset()} />
    </Container>
  ) : (
    <Container>
      Connect your wallet:
      <Button primary label="Frame" onClick={() => connect('frame')} />
      <Button primary label="Portis" onClick={() => connect('portis')} />
      <Button primary label="MetaMask" onClick={() => connect('injected')} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default Wallet;
