// submit.js - Fixed to properly count nodes and edges

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            // Make sure we only count actual edges, not undefined ones
            const validEdges = edges.filter(edge =>
                edge && edge.source && edge.target
            );

            const pipelineData = {
                nodes: nodes.map(node => ({ id: node.id })),
                edges: validEdges.map(edge => ({
                    source: edge.source,
                    target: edge.target
                }))
            };

            console.log('Submitting pipeline:', pipelineData);
            console.log('Node count:', pipelineData.nodes.length);
            console.log('Edge count:', pipelineData.edges.length);

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Backend response:', result);

            // Create alert message
            const dagStatus = result.is_dag ? 'Yes (Valid DAG)' : 'No (Contains Cycles)';
            const alertMessage = `Pipeline Analysis Results:\n\nNumber of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${dagStatus}\n\n${result.is_dag
                ? '✓ Your pipeline is valid and can be executed!'
                : '✗ Warning: Your pipeline contains cycles and cannot be executed as a DAG.'
                }`;

            alert(alertMessage);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: ${error.message}\n\nMake sure:\n1. Backend is running on http://localhost:8000\n2. CORS is properly configured\n3. Check browser console for details`);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000
        }}>
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};