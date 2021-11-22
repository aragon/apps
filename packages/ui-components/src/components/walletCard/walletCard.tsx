import React, {HTMLAttributes} from 'react';
import styled from 'styled-components';

import {Avatar} from '../avatar';
import {IconButton} from '../button/iconButton';
import {IconCopy} from '../icons'
import {BeautifyLabel} from '../../utils/addresses';

export type WalletCardProps = HTMLAttributes<HTMLElement> & {
  /** 
   * Avatar image src
   * */
  src: string;
  /**
  * Action subtitle
  */
  subtitle?: string | null;
  /**
  * Action label
  */
  title: string;
  wide:boolean;
}

/**
 * WalletCard UI component
 */
export const WalletCard: React.FC<WalletCardProps> = ({src, title, subtitle, wide=false}) => {
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(subtitle || title);
  }

  return (
      <Container {...{wide}}>
          <Content>
            <Avatar size={'default'} src={src}/>
            <TextContainer>
              <Title>{BeautifyLabel(title)}</Title>
              {subtitle && <Subtitle>{BeautifyLabel(subtitle)}</Subtitle>}
            </TextContainer>
          </Content>
          <IconButton 
            icon={<IconCopy/>} 
            mode={'ghost'} 
            label="copy" 
            side="right" 
            onClick={copyToClipboard}
          />
      </Container>
  );
};

type ContainerProps = Pick<WalletCardProps, 'wide'>;
const Container = styled.div.attrs(({wide}:ContainerProps)=>({
  className:`flex items-center ${wide && 'w-full justify-between'} space-x-1.5`
}))``;


const Content = styled.div.attrs({
  className: 'flex items-center space-x-1.5',
})``;

const TextContainer = styled.div.attrs({
  className: 'text-left',
})``;

const Title = styled.p.attrs({
  className:'text-ui-700 font-bold'
})``;

const Subtitle = styled.p.attrs({
  className: 'text-xs text-ui-500 font-medium',
})``;
