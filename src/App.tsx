import { CanvasBoard, Header, ToolBar } from './Views';
import './App.scss';

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#333] text-white">
      <Header className='z-50' />
      <div className='h-full w-full overflow-hidden flex'>
        <ToolBar />
        <CanvasBoard />
      </div>
    </div>
  );
}

export default App;
