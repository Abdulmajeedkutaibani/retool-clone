import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, type, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white border p-2 rounded mb-2 cursor-grab transition-opacity ${
        isDragging ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className='w-1/5 sticky h-screen top-0 overflow-y-auto bg-gray-100 p-4'>
      <p className='text-lg font-bold mb-2'>Components</p>
      <DraggableItem id='text' type='text' label='Text' />
      <DraggableItem id='image' type='image' label='Image' />
    </div>
  );
};

export default Sidebar;
