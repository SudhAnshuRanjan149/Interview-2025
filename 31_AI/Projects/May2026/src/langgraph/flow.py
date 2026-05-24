try:
    import langgraph as lg
except Exception:
    lg = None

from ..agents.orchestrator import Orchestrator


def build_flow():
    if lg is None:
        print("langgraph not installed; flow is a placeholder")
        return None
    # Placeholder: build a simple flow wiring the orchestrator node
    flow = lg.Flow(name="multi_agent_orchestrator")
    orch_node = flow.add_function(Orchestrator)
    return flow


if __name__ == "__main__":
    f = build_flow()
    print("Flow created:", f)
