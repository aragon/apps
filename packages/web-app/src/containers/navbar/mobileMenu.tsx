import React from 'react';
import {CardDao} from '@aragon/ui-components';

import NavLinks from 'components/navLinks';
import BottomSheet from 'components/bottomSheet';

type MobileNavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNavMenu: React.FC<MobileNavMenuProps> = props => {
  return (
    <BottomSheet isOpen={props.isOpen} onClose={props.onClose}>
      <div className="p-3 space-y-3">
        <CardDao
          daoAddress="dao-name.dao.eth"
          daoName="DAO Name"
          onClick={() => null}
          src="d"
          wide
        />
        <NavLinks onItemClick={props.onClose} />
      </div>
    </BottomSheet>
  );
};

export default MobileNavMenu;
