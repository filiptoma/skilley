import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, PropsWithChildren } from 'react';

const SlideUpTransition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);
SlideUpTransition.displayName = 'SlideUpTransition';

const Modal = (
  props: PropsWithChildren<{ isOpen: boolean; onClose: () => void }>,
) => {
  const { isOpen, onClose, children } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      maxWidth="xs"
      fullWidth
      scroll="paper"
    >
      {children}
    </Dialog>
  );
};

export default Modal;
