// llmNode.js - Refactored

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const content = () => (
    <div>
      <span style={{ color: '#666' }}>This is a LLM.</span>
    </div>
  );

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: `${100 / 3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: `${200 / 3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      content={content}
      handles={handles}
      style={{ background: '#f0fff0' }}
    />
  );
};