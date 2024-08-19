import { Model } from '@/components/Model';

interface OptionsModalProps {
  open: boolean;
  onCancel: () => void;
}

export const OptionsModal = (props: OptionsModalProps) => {
  return (
    <Model title="Options" {...props}>
      Options
    </Model>
  );
};

export default OptionsModal;
