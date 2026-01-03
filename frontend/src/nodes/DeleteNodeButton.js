// DeleteNodeButton.js

import { useReactFlow } from 'reactflow';

export const DeleteNodeButton = () => {
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const handleDelete = () => {
        const selectedNodes = getNodes().filter(node => node.selected);

        if (selectedNodes.length === 0) {
            alert('Please select a node to delete');
            return;
        }

        // Get IDs of nodes to delete
        const nodesToDelete = selectedNodes.map(node => node.id);

        // Filter out deleted nodes
        const remainingNodes = getNodes().filter(node => !nodesToDelete.includes(node.id));

        // Filter out edges connected to deleted nodes
        const remainingEdges = getEdges().filter(
            edge => !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target)
        );

        setNodes(remainingNodes);
        setEdges(remainingEdges);
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000
        }}>
            <button
                onClick={handleDelete}
                style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.6)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
                }}
            >
                🗑️ Delete Selected
            </button>
        </div>
    );
};

// Usage in your main component:
// import { DeleteNodeButton } from './DeleteNodeButton';
//
// Inside your JSX:
// <ReactFlowProvider>
//   <ReactFlow ... />
//   <DeleteNodeButton />
// </ReactFlowProvider>