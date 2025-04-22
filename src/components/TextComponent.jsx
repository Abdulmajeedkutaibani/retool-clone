import React from 'react';
import ReactMarkdown from 'react-markdown';

const TextComponent = ({ content }) => {
  return (
    <div className='prose'>
      <ReactMarkdown>{content || '*Click to edit text*'}</ReactMarkdown>
    </div>
  );
};

export default TextComponent;
