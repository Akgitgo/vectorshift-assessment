// inputNode.js - Refactored

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const content = () => (
    <>
      <label style={{ display: 'block', marginBottom: '4px' }}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{
            width: '100%',
            marginTop: '2px',
            padding: '4px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select
          value={inputType}
          onChange={handleTypeChange}
          style={{
            width: '100%',
            marginTop: '2px',
            padding: '4px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </>
  );

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      content={content}
      handles={handles}
      style={{ background: '#f0f8ff' }}
    />
  );
};