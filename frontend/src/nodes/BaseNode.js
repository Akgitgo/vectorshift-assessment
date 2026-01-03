// BaseNode.js - I created this to avoid copy-pasting code everywhere
// basically all nodes were doing the same thing so why not make it reusable?

// trying to make handles dynamic here, took me a while to figure out

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
    id,
    data,
    title,
    content,
    handles = [],
    nodeStyle = {},
    minHeight = 160
}) => {
    // Calculate dynamic height based on content
    const calculatedHeight = data?.height || minHeight;

    const defaultStyle = {
        minWidth: 280,
        minHeight: calculatedHeight,
        border: '2px solid #4a5568',
        borderRadius: '12px',
        padding: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...nodeStyle
    };

    return (
        <div style={defaultStyle}>
            {/* Render target handles (inputs) on the left */}
            {handles
                .filter(h => h.type === 'target')
                .map((handle) => (
                    <Handle
                        key={`${id}-${handle.id}`}
                        type="target"
                        position={handle.position || Position.Left}
                        id={handle.id}
                        style={{
                            width: '12px',
                            height: '12px',
                            background: '#667eea',
                            border: '2px solid #fff',
                            ...handle.style
                        }}
                    />
                ))}

            {/* Title section */}
            {title && (
                <div style={{
                    fontWeight: '600',
                    fontSize: '15px',
                    color: '#2d3748',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    {title}
                </div>
            )}

            {/* Main content area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                overflow: 'visible'
            }}>
                {typeof content === 'function' ? content() : content}
            </div>

            {/* Render source handles (outputs) on the right */}
            {handles
                .filter(h => h.type === 'source')
                .map((handle) => (
                    <Handle
                        key={`${id}-${handle.id}`}
                        type="source"
                        position={handle.position || Position.Right}
                        id={handle.id}
                        style={{
                            width: '12px',
                            height: '12px',
                            background: '#48bb78',
                            border: '2px solid #fff',
                            ...handle.style
                        }}
                    />
                ))}
        </div>
    );
};

// Common input style for consistency
export const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    background: '#fff',
    color: '#2d3748',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
};

// Common label style
export const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: '4px'
};