import './App.css';
import { CanvasBoard, Header } from './Views';

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header className='z-50' />
      <div className='h-full w-full overflow-hidden'>
        <CanvasBoard />
      </div>
    </div>
  );
}

export default App;
