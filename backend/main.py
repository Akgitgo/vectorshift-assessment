from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# CORS middleware - allows frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if graph is a Directed Acyclic Graph (DAG)
    Returns True if no cycles exist, False if cycles found
    Uses DFS with recursion stack to detect back edges
    """
    # build adjacency list
    adj_list = {node.id: [] for node in nodes}
    
    for edge in edges:
        if edge.source in adj_list:
            adj_list[edge.source].append(edge.target)
    
    visited = set()
    rec_stack = set()  # recursion stack to track current path
    
    def has_cycle_dfs(node_id: str) -> bool:
        """DFS helper to detect cycles"""
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # check all neighbors
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if has_cycle_dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                # back edge found = cycle exists
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # check each connected component
    for node in nodes:
        if node.id not in visited:
            if has_cycle_dfs(node.id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Analyzes pipeline structure
    Returns: number of nodes, edges, and whether it forms a DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    print(f"Pipeline received: {num_nodes} nodes, {num_edges} edges")
    print(f"Is DAG: {is_dag_result}")
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }