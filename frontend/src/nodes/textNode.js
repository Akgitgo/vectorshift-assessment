// textNode.js - Enhanced with dynamic sizing and variable detection
// Refactored to use BaseNode for consistency

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  // Extract variables from text (e.g., {{variable}})
  useEffect(() => {
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const foundVars = matches.map(match => match[1].trim());
    // Remove duplicates
    const uniqueVars = [...new Set(foundVars)];
    setVariables(uniqueVars);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate dynamic height based on content
  const calculateHeight = () => {
    const baseHeight = 100;
    const lines = currText.split('\n').length;
    const calculatedHeight = Math.max(baseHeight, 60 + lines * 20);
    return Math.min(calculatedHeight, 400); // max height cap
  };

  // Calculate dynamic width
  const calculateWidth = () => {
    const baseWidth = 200;
    const maxLineLength = Math.max(
      ...currText.split('\n').map(line => line.length),
      10
    );
    const calculatedWidth = Math.max(baseWidth, Math.min(maxLineLength * 8 + 40, 500));
    return calculatedWidth;
  };

  const nodeHeight = calculateHeight();
  const nodeWidth = calculateWidth();

  const content = () => (
    <div>
      <label style={{ display: 'block', fontSize: '12px' }}>
        Text:
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            minHeight: '60px',
            maxHeight: '300px',
            marginTop: '4px',
            padding: '6px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            resize: 'vertical'
          }}
          placeholder="Enter text with {{variables}}"
        />
      </label>
      {variables.length > 0 && (
        <div style={{
          fontSize: '10px',
          color: '#666',
          marginTop: '4px'
        }}>
          Variables: {variables.join(', ')}
        </div>
      )}
    </div>
  );

  // Prepare handles
  const handles = [
    // Dynamic handles for variables
    ...variables.map((varName, idx) => ({
      type: 'target',
      position: Position.Left,
      id: varName,
      style: {
        top: `${((idx + 1) * 100) / (variables.length + 1)}%`,
        background: '#555'
      }
    })),
    // Standard source handle
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: { background: '#555' }
    },
    // Default target handle (always available)
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      style: { top: '50%', background: '#555' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      content={content}
      handles={handles}
      style={{
        width: nodeWidth,
        height: nodeHeight,
        background: '#fffef0'
      }}
    />
  );
};