One of my key projects at TCS was a multi-agent AI assistant for the Advanced Driver Assistance Systems, or ADAS, domain.

The objective was to build an intelligent assistant that could answer vehicle-related questions, retrieve relevant vehicle-signal information, and access external information when required, while supporting both offline and connected environments.

I developed the solution using Python and LangGraph, with an orchestrator coordinating three specialized agents: a Local agent, a Cloud agent, and a CAN agent.

The Local agent used an on-device language model to handle queries that could be answered locally, which helped support offline scenarios. The Cloud agent handled queries requiring external or real-time information by integrating tools such as weather, maps, and web search APIs. The CAN agent interacted with vehicle signals through Python CAN tools, allowing it to access relevant vehicle data.

For knowledge retrieval, I used LanceDB as the vector database. We stored vehicle-signal documentation and metadata for approximately one thousand vehicle signals, along with relevant user-profile information. This allowed the system to retrieve relevant context instead of relying only on the language model's internal knowledge.

LangGraph handled agent orchestration and workflow state, while MCP provided a standardized way to expose tools to the agent application. The system could route requests to the appropriate agent based on the query and the information or tools required.

One of the important architectural considerations was balancing local execution with cloud capabilities. The local model supported offline operation, while cloud tools enabled access to information that was not available locally. Integrating retrieval, specialized agents, and external tools helped create a more flexible assistant than a single LLM-based chatbot.

This project gave me practical experience with multi-agent orchestration, RAG, tool integration, local LLM deployment, and designing GenAI applications for resource-constrained edge environments.


**MY ROLE**

My role in this project was primarily as an AI Engineer, focusing on developing the multi-agent architecture and integrating the LLM, retrieval, and tool-calling components.

I worked with Python and LangGraph to implement the agent orchestration, coordinating the Local, Cloud, and CAN agents based on the task requirements.

I also worked on integrating LanceDB for retrieving relevant vehicle-signal documentation and metadata, and used Python FastMCP to expose tools for external information retrieval and vehicle-related interactions.

Another important part of my work was integrating local LLM execution on the NVIDIA Jetson Orin with cloud-based capabilities, so the system could support offline queries as well as requests requiring external information.

Overall, my contribution focused on agent orchestration, RAG integration, tool integration, and combining local and cloud AI capabilities into a unified ADAS assistant.

**CHALLENGE FACED**

One of the key challenges I faced in the ADAS multi-agent project was integrating local and cloud-based AI capabilities into a single workflow.

The Local agent ran an LLM on the NVIDIA Jetson Orin, while the Cloud agent depended on external APIs for information such as weather, maps, and web search. The challenge was that cloud-dependent operations required network connectivity, whereas the local agent needed to remain useful in offline scenarios.

My responsibility was to help integrate these capabilities through LangGraph and ensure that the orchestrator could route requests to the appropriate agent based on the task requirements.

I approached this by separating the agent responsibilities, integrating the required tools, and structuring the workflow so that locally supported requests could be handled on-device while requests requiring external information were routed to the Cloud agent.

This experience taught me the importance of designing AI systems around connectivity constraints, clear agent responsibilities, and graceful handling of unavailable services, rather than assuming that every model and tool would always be accessible.
