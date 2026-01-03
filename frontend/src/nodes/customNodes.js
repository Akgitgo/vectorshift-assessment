// customNodes.js - Five new node types

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, inputStyle, labelStyle } from './BaseNode';

// 1. Filter Node
export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');

    const content = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
                <label style={labelStyle}>Condition:</label>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                >
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="startsWith">Starts With</option>
                    <option value="endsWith">Ends With</option>
                </select>
            </div>
            <div>
                <label style={labelStyle}>Value:</label>
                <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={inputStyle}
                    placeholder="Filter value"
                />
            </div>
        </div>
    );

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'passed', style: { top: '40%' } },
        { type: 'source', position: Position.Right, id: 'failed', style: { top: '60%' } }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            content={content}
            handles={handles}
            nodeStyle={{
                background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                borderColor: '#8b5cf6'
            }}
            minHeight={180}
        />
    );
};

// 2. Transform Node
export const TransformNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'uppercase');

    const content = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
                <label style={labelStyle}>Operation:</label>
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                >
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="trim">Trim</option>
                    <option value="reverse">Reverse</option>
                </select>
            </div>
            <div style={{
                fontSize: '12px',
                color: '#6b7280',
                padding: '6px 8px',
                background: '#f9fafb',
                borderRadius: '4px'
            }}>
                Transforms input text
            </div>
        </div>
    );

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            content={content}
            handles={handles}
            nodeStyle={{
                background: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
                borderColor: '#eab308'
            }}
            minHeight={160}
        />
    );
};

// 3. Merge Node
export const MergeNode = ({ id, data }) => {
    const [separator, setSeparator] = useState(data?.separator || ', ');

    const content = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
                fontSize: '12px',
                color: '#6b7280',
                padding: '6px 8px',
                background: '#f9fafb',
                borderRadius: '4px'
            }}>
                Combines multiple inputs
            </div>
            <div>
                <label style={labelStyle}>Separator:</label>
                <input
                    type="text"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    style={inputStyle}
                    placeholder=", "
                />
            </div>
        </div>
    );

    const handles = [
        { type: 'target', position: Position.Left, id: 'input1', style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: 'input2', style: { top: '50%' } },
        { type: 'target', position: Position.Left, id: 'input3', style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Merge"
            content={content}
            handles={handles}
            nodeStyle={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderColor: '#3b82f6'
            }}
            minHeight={180}
        />
    );
};

// 4. Delay Node
export const DelayNode = ({ id, data }) => {
    const [delayTime, setDelayTime] = useState(data?.delayTime || '1000');

    const content = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
                fontSize: '12px',
                color: '#6b7280',
                padding: '6px 8px',
                background: '#f9fafb',
                borderRadius: '4px'
            }}>
                Adds processing delay
            </div>
            <div>
                <label style={labelStyle}>Delay (ms):</label>
                <input
                    type="number"
                    value={delayTime}
                    onChange={(e) => setDelayTime(e.target.value)}
                    style={inputStyle}
                    min="0"
                />
            </div>
        </div>
    );

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Delay"
            content={content}
            handles={handles}
            nodeStyle={{
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                borderColor: '#ef4444'
            }}
            minHeight={160}
        />
    );
};

// 5. Validator Node
export const ValidatorNode = ({ id, data }) => {
    const [validationType, setValidationType] = useState(data?.validationType || 'email');

    const content = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
                <label style={labelStyle}>Validation Type:</label>
                <select
                    value={validationType}
                    onChange={(e) => setValidationType(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                >
                    <option value="email">Email</option>
                    <option value="url">URL</option>
                    <option value="number">Number</option>
                    <option value="json">JSON</option>
                </select>
            </div>
            <div style={{
                fontSize: '12px',
                color: '#6b7280',
                padding: '6px 8px',
                background: '#f9fafb',
                borderRadius: '4px'
            }}>
                Validates input format
            </div>
        </div>
    );

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'valid', style: { top: '40%' } },
        { type: 'source', position: Position.Right, id: 'invalid', style: { top: '60%' } }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Validator"
            content={content}
            handles={handles}
            nodeStyle={{
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderColor: '#10b981'
            }}
            minHeight={180}
        />
    );
};