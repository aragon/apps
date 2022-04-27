import React from 'react';
import styled from 'styled-components';

import IconLogo from 'public/iconLogo.svg';
import Green from 'public/greenGradient.svg';
import Purple from 'public/purpleGradient.svg';

const Footer: React.FC = () => {
  return (
    <Container>
      {/* <LogoContainer src={IconLogo} /> */}
      <div>
        <div className="flex justify-between">
          <LogoContainer
            src={Green}
            style={{marginTop: '-100px', marginLeft: '-70px'}}
          />
          <LogoContainer
            src={Purple}
            style={{marginTop: '-100px', marginRight: '-56px'}}
          />
        </div>
      </div>
      <div className="flex absolute top-0 justify-between items-center px-5 w-full h-10">
        <div className="flex items-center space-x-4">
          <img src={IconLogo} className="h-5" />
          <span className="text-ui-0">Explore</span>
          <span className="text-ui-0">Learn</span>
          <span className="text-ui-0">Build</span>
          <span className="text-ui-0">Help</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-ui-0">Terms of Service</span>
          <span className="text-ui-0">Privacy</span>
          <span className="text-ui-0">© 2022 Aragon</span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'bottom-0 col-span-full bg-primary-400 relative overflow-hidden max-h-10',
})``;

const LogoContainer = styled.img.attrs({
  className: 'h-40',
})``;

export default Footer;
