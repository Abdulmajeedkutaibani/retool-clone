import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import Sidebar from './components/SideBar';
import Canvas from './components/Canvas';
import EditorPanel from './components/EditorPanel';

const App = () => {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggingType, setDraggingType] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleDragStart = (event) => {
    const { active } = event;
    setDraggingType(active?.data?.current?.type || null);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over?.id === 'canvas') {
      const type = active?.data?.current?.type;
      const id = Date.now();
      const content = type === 'text' ? '' : 'https://placehold.co/600x400';
      setComponents((item) => [...item, { id, type, content, columnSpan: 1 }]);
    }
    setDraggingType(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='flex justify-between items-center p-4 border-b bg-gray-50'>
        <div className='flex mx-auto items-center space-x-2'>
          <h1 className='text-lg font-bold'>Retool Mini</h1>
          <span className='text-4xl'>✏️</span>
        </div>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          style={{
            backgroundColor: previewMode ? 'pink' : 'lightblue',
          }}
          className='w-40 absolute right-8 bg-blue-500 rounded'
        >
          {previewMode ? 'Exit Preview' : 'Preview'}
        </button>
      </div>

      <div className='flex min-h-screen w-screen'>
        {!previewMode && <Sidebar />}
        <Canvas
          components={components}
          setComponents={setComponents}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          previewMode={previewMode}
        />
        {!previewMode && (
          <EditorPanel
            components={components}
            setComponents={setComponents}
            selectedId={selectedId}
          />
        )}
      </div>

      <DragOverlay>
        {draggingType === 'text' && (
          <div className='bg-white border p-2 rounded shadow-md cursor-grabbing'>
            Text
          </div>
        )}
        {draggingType === 'image' && (
          <div className='bg-white border p-2 rounded shadow-md cursor-grabbing'>
            Image
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
