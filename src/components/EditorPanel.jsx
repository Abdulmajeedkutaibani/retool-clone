import React from 'react';

function EditorPanel({ components, setComponents, selectedId }) {
  const selectedItem = components.find((item) => item.id === selectedId);

  function handleContentChange(e) {
    const newContent = e.target.value;

    const updated = components.map((item) => {
      return item.id === selectedId ? { ...item, content: newContent } : item;
    });

    setComponents(updated);
  }

  if (!selectedItem) {
    return (
      <div className='sticky h-screen top-0 overflow-y-auto w-1/5 bg-gray-50 p-4 text-sm text-gray-500'>
        Select a component to edit.
      </div>
    );
  }

  return (
    <div className='w-1/5 bg-gray-50 p-4 sticky h-screen top-0 overflow-y-auto'>
      <h2 className='text-base font-bold mb-2'>Editor</h2>

      {selectedItem.type === 'text' && (
        <textarea
          className='w-full p-2 border'
          value={selectedItem.content}
          onChange={handleContentChange}
        />
      )}

      {selectedItem.type === 'image' && (
        <input
          type='text'
          className='w-full p-2 border'
          value={selectedItem.content}
          onChange={handleContentChange}
        />
      )}
    </div>
  );
}

export default EditorPanel;
