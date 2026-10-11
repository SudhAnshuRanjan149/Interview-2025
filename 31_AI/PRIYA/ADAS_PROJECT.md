One of my key projects at TCS was a multi-agent AI assistant for the Advanced Driver Assistance Systems, or ADAS, domain.

The objective was to build an intelligent assistant that could answer vehicle-related questions, retrieve relevant vehicle-signal information, and access external information when required, while supporting both offline and connected environments.

I developed the solution using Python and LangGraph, with an orchestrator coordinating three specialized agents: a Local agent, a Cloud agent, and a CAN agent.

The Local agent used an on-device language model to handle queries that could be answered locally, which helped support offline scenarios. The Cloud agent handled queries requiring external or real-time information by integrating tools such as weather, maps, and web search APIs. The CAN agent interacted with vehicle signals through Python CAN tools, allowing it to access relevant vehicle data.

For knowledge retrieval, I used LanceDB as the vector database. We stored vehicle-signal documentation and metadata for approximately one thousand vehicle signals, along with relevant user-profile information. This allowed the system to retrieve relevant context instead of relying only on the language model's internal knowledge.

LangGraph handled agent orchestration and workflow state, while MCP provided a standardized way to expose tools to the agent application. The system could route requests to the appropriate agent based on the query and the information or tools required.

One of the important architectural considerations was balancing local execution with cloud capabilities. The local model supported offline operation, while cloud tools enabled access to information that was not available locally. Integrating retrieval, specialized agents, and external tools helped create a more flexible assistant than a single LLM-based chatbot.

This project gave me practical experience with multi-agent orchestration, RAG, tool integration, local LLM deployment, and designing GenAI applications for resource-constrained edge environments.
