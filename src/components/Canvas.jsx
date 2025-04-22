import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Resizable } from 're-resizable';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';

const Canvas = ({
  components,
  setComponents,
  selectedId,
  setSelectedId,
  previewMode,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const handleResizeStop = (id, newWidth, containerWidth) => {
    const ratio = newWidth / containerWidth;
    const newColSpan = ratio >= 0.75 ? 2 : 1;

    const updated = components.map((item) =>
      item.id === id ? { ...item, columnSpan: newColSpan } : item
    );
    setComponents(updated);
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 border border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-l border-r transition-colors ${
        isOver ? 'bg-blue-50' : 'bg-white'
      } ${
        previewMode ? 'pointer-events-none w-[90%] mx-auto my-6 flex-none' : ''
      }`}
    >
      {components.length === 0 ? (
        <div className='col-span-2 text-center text-gray-500'>
          <h2 className='text-lg font-semibold'>
            Drag and drop a component here to start building
          </h2>
        </div>
      ) : (
        components.map((item) => {
          const isSelected = item.id === selectedId;
          const colSpan =
            item.columnSpan === 2 ? 'md:col-span-2' : 'md:col-span-1';

          return (
            <div
              key={item.id}
              className={`self-start ${colSpan} col-span-2`}
              onClick={() => {
                if (!previewMode) {
                  setSelectedId(item.id);
                }
              }}
            >
              <Resizable
                enable={{
                  right: !previewMode,
                }}
                minWidth='50%'
                maxWidth='100%'
                size={{ width: '100%', height: 'auto' }}
                onResizeStop={(e, direction, ref) => {
                  const container = ref.parentElement;
                  if (container) {
                    const containerWidth = container.offsetWidth;
                    handleResizeStop(item.id, ref.offsetWidth, containerWidth);
                  }
                }}
              >
                <div
                  className={`p-2 rounded border ${
                    !previewMode && isSelected
                      ? 'border-blue-500'
                      : 'border-transparent'
                  } ${
                    !previewMode && !isSelected
                      ? 'hover:border-gray-300 cursor-pointer'
                      : ''
                  }`}
                >
                  {item.type === 'text' ? (
                    <TextComponent content={item.content} />
                  ) : (
                    <ImageComponent url={item.content} />
                  )}
                </div>
              </Resizable>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Canvas;
