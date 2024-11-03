from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:

    graph = defaultdict(list)
    for edge in edges:
        graph[edge["source"]].append(edge["target"])

    visited = set()
    path = set()

    def has_cycle(node: str) -> bool:
        if node in path:
            return True
        if node in visited:
            return False

        visited.add(node)
        path.add(node)

        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True

        path.remove(node)
        return False

    node_ids = [node["id"] for node in nodes]
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False

    return True


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineData):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag_result}
    except Exception as e:
        raise HTTPException(400, str(e))
