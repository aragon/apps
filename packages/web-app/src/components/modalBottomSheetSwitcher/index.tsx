import React from 'react';
import {Modal, ModalProps} from '@aragon/ui-components';
import BottomSheet from 'components/bottomSheet';
import useMediaQuery from 'hooks/useMediaQuery';

const ModalBottomSheetSwitcher: React.FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
}) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {isDesktop ? (
        <Modal
          isOpen={isOpen}
          onClose={() => onClose && onClose()}
          title={title}
          subtitle={subtitle}
        >
          {children}
        </Modal>
      ) : (
        <BottomSheet
          isOpen={isOpen || false}
          onClose={() => onClose && onClose()}
          title={title}
          subtitle={subtitle}
        >
          {children}
        </BottomSheet>
      )}
    </>
  );
};

export default ModalBottomSheetSwitcher;
