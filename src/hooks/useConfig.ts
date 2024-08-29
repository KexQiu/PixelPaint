import { atom, useAtom } from 'jotai';
import type { Config } from '@/types';
import OptionsModal from '@/components/OptionsModal';
import { useLocalStorageState } from 'ahooks';

export const configAtom = atom<Config | undefined>(
  localStorage.getItem('config')
    ? (JSON.parse(localStorage.getItem('config')!) as Config)
    : undefined
);

const useConfig = () => {
  const [config, setConfig] = useAtom(configAtom);
  
  const [, setLocalConfig] = useLocalStorageState<Config>('config');
  const [, setLocalColorMatrix] = useLocalStorageState<string>('colorMatrix');

  const updateConfig = (config: Config) => {
    setLocalColorMatrix(undefined);
    setLocalConfig(config);
    setConfig(config);
  };

  const showOptionsModal = () => {
    OptionsModal.open();
  };

  return { config, setConfig: updateConfig, showOptionsModal };
};

export default useConfig;
