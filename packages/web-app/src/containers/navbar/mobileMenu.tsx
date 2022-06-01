import React from 'react';
import styled from 'styled-components';
import {CardDao} from '@aragon/ui-components';

import NavLinks from 'components/navLinks';
import BottomSheet from 'components/bottomSheet';
import {useGlobalModalContext} from 'context/globalModals';
import {usePrivacyContext} from 'context/privacyContext';
import {Address} from '@aragon/ui-components/dist/utils/addresses';

type Props = {daoName: string; daoAddress: Address};
const MobileNavMenu: React.FC<Props> = ({daoName, daoAddress}) => {
  const {open, close, isMobileMenuOpen} = useGlobalModalContext();
  const {handleWithFunctionalPreferenceMenu} = usePrivacyContext();

  return (
    <BottomSheet isOpen={isMobileMenuOpen} onClose={() => close('mobileMenu')}>
      <div className="tablet:w-50">
        <CardWrapper className="rounded-xl">
          <CardDao
            daoAddress={daoAddress}
            daoName={daoName}
            onClick={() => {
              close('mobileMenu');
              handleWithFunctionalPreferenceMenu(() => open('selectDao'));
            }}
            src=""
          />
        </CardWrapper>
        <div className="py-3 px-2 space-y-3">
          <NavLinks onItemClick={() => close('mobileMenu')} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default MobileNavMenu;

const CardWrapper = styled.div`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;
