import { CanvasBoard, Header } from './Views';
import './App.scss';

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#333] text-white">
      <Header className='z-50' />
      <div className='h-full w-full overflow-hidden'>
        <CanvasBoard />
      </div>
    </div>
  );
}

export default App;
