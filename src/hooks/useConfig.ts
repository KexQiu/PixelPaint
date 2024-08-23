import { atom, useAtom } from 'jotai';
import type { Config } from '@/types';
import OptionsModal from '@/components/OptionsModal';

export const configAtom = atom<Config>();

const useConfig = () => {
  const [config, setConfig] = useAtom(configAtom);

  const showOptionsModal = () => {
    OptionsModal.open();
  };

  return { config, setConfig, showOptionsModal };
};

export default useConfig;