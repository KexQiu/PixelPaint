import { CanvasBoard, Header, ToolBar } from './Views';
import './App.scss';
import useConfig from '@/hooks/useConfig';
import { useMount } from 'ahooks';

function App() {
  const { config, showOptionsModal } = useConfig();
  useMount(() => {
    if (!config) {
      showOptionsModal();
    }
  });

  return (
    <div className="w-full h-screen flex flex-col bg-[#333] text-white">
      <Header className='z-50' />
      <div className='h-full w-full overflow-hidden flex relative'>
        <ToolBar />
        <CanvasBoard />
      </div>
    </div>
  );
}

export default App;
