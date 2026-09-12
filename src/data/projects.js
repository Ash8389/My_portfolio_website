export const PROJECTS = {
  "ewallet": {
    id: "ewallet",
    name: "E-Wallet Backend System",
    category: "Distributed Systems / Microservices",
    flagship: true,
    shortDescription: "Production-grade digital wallet microservices system built with Java 21 & Spring Boot 3.3.4. Features isolated DBs, API Gateway JWT routing, REST transfers, and Kafka payment notifications.",
    longDescription: "A production-grade digital wallet system built with Java Spring Boot microservices. Handles user registration, wallet management, atomic balance transfers with pessimistic DB locking, idempotent payment processing, and asynchronous real-time payment notifications via Apache Kafka.",
    
    techStack: [
      "Java 21",
      "Spring Boot 3.3.4",
      "Spring Cloud Gateway",
      "Spring Security / JWT",
      "MySQL 8.0 (Separate DB per Service)",
      "Redis 7 (Balance & User Cache)",
      "Apache Kafka (Payment Events)",
      "Resilience4j (Circuit Breaker & Retry)",
      "Jakarta Validation",
      "Docker & Docker Compose",
      "GitHub Actions CI/CD"
    ],
    
    services: [
      { name: "API Gateway (8080)", desc: "JWT token validation, security header injection, request routing" },
      { name: "User Service (8081)", desc: "User registration, authentication, identity management, JWT issuance" },
      { name: "Wallet Service (8082)", desc: "Wallet creation, ledger balance management, atomic credit/debit operations" },
      { name: "Transaction Service (8083)", desc: "Transfer orchestration, idempotency validation, REST call to Wallet, Kafka event dispatch" },
      { name: "Notification Service (8084)", desc: "Consumes Kafka payment events to dispatch status notifications asynchronously" }
    ],
    
    highlights: [
      "Synchronous REST communication for critical wallet transfers requiring immediate balance validation",
      "Asynchronous event streaming via Apache Kafka for non-blocking notification fan-out",
      "Idempotency keys via Redis / DB to prevent duplicate charges under client network retries",
      "Pessimistic DB locking (SELECT FOR UPDATE) on wallet rows to guarantee balance consistency",
      "Gateway-level JWT validation injecting trusted identity headers (X-User-Id) to downstream services",
      "Floating-point-free precision using BigDecimal across all monetary operations"
    ],
    
    keyFlows: [
      "Transaction Service ──REST/SYNC──> Wallet Service (Debit/Credit balance update)",
      "Transaction Service ──EVENT/ASYNC──> Apache Kafka ──► Notification Service"
    ],

    architectureDiagram: `                         ┌────────────────────┐
                         │       CLIENT       │
                         └──────────┬─────────┘
                                    │
                                    ▼
                         ┌────────────────────┐
                         │    API GATEWAY     │
                         └──────────┬─────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ USER SERVICE │  │WALLET SERVICE│  │ TRANSACTION  │
          │              │  │              │  │   SERVICE    │
          └──────────────┘  └──────────────┘  └──────┬───────┘
                                                      │
                              ┌───────────────────────┴──────────────────────┐
                              │                                              │
                           REST / SYNC                                  EVENT / ASYNC
                              │                                              │
                              ▼                                              ▼
                       ┌──────────────┐                               ┌──────────────┐
                       │WALLET SERVICE│                               │ APACHE KAFKA │
                       │ Debit/Credit │                               └──────┬───────┘
                       └──────────────┘                                      │
                                                                              ▼
                                                                       ┌──────────────┐
                                                                       │ NOTIFICATION │
                                                                       │   SERVICE    │
                                                                       └──────────────┘`,

    decisions: [
      {
        title: "Sync REST for Transfers vs Async Kafka for Notifications",
        detail: "Money transfers require immediate synchronous answers (balance verification, debit/credit success), so Transaction Service calls Wallet Service via REST. Payment notifications do not block transaction completion, so Transaction Service publishes an event to Apache Kafka for asynchronous processing."
      },
      {
        title: "Idempotency Keys for Duplicate Protection",
        detail: "Every transfer request requires an Idempotency-Key header. Duplicate submissions return cached original transaction results without re-executing ledger updates."
      },
      {
        title: "Pessimistic DB Row Locking (SELECT FOR UPDATE)",
        detail: "Wallet balance updates utilize pessimistic database locks to serialize concurrent transfer operations on the same wallet, preventing race conditions."
      },
      {
        title: "JWT Validation at API Gateway",
        detail: "API Gateway validates authorization tokens and forwards injected X-User-Id headers downstream, isolating authentication logic to the gateway layer."
      }
    ],

    challenges: [
      {
        problem: "Race conditions when two transfers hit the same wallet simultaneously.",
        solution: "Implemented SELECT FOR UPDATE pessimistic row-level locking in MySQL combined with BigDecimal arithmetic to guarantee atomic balance mutations."
      },
      {
        problem: "Cascading failures during downstream notification service outages.",
        solution: "Decoupled Notification Service behind Apache Kafka topics and applied Resilience4j Circuit Breakers to insulate primary funds transfers."
      }
    ],
    
    github: "https://github.com/Ash8389/E-Wallet-Backend"
  },

  "flash-sale": {
    id: "flash-sale",
    name: "Flash Sale Inventory Engine",
    category: "High Concurrency / Distributed Systems",
    flagship: false,
    shortDescription: "High-concurrency flash sale & booking backend built with Java 21, Spring Boot, Redis Lua scripts, and Kafka to handle massive traffic without overselling.",
    longDescription: "A production-grade flash sale engine engineered to solve high-concurrency order placement and inventory reservation. Uses Redis atomic Lua scripts for sub-millisecond stock deductions and Kafka queues for async order persistence to MySQL.",
    
    techStack: [
      "Java 21",
      "Spring Boot 3.x",
      "Spring Security + JWT",
      "Redis 7 (Atomic Lua Scripts)",
      "Apache Kafka (Async Processing)",
      "MySQL 8.0 (JPA / Hibernate)",
      "Maven",
      "Docker"
    ],
    
    services: [
      { name: "API Gateway / Rate Limiter", desc: "Per-user sliding-window rate limiting via Redis counters (429 protection)" },
      { name: "Atomic Inventory Engine", desc: "Executes in-memory stock check and decrement via Redis Lua scripts" },
      { name: "Kafka Order Topic", desc: "Buffers confirmed purchase events to shield MySQL from write spikes" },
      { name: "Order Fulfillment Worker", desc: "Consumes Kafka purchase events and persists orders into MySQL DB" }
    ],

    highlights: [
      "Redis atomic Lua scripts guarantee zero overselling under thousands of parallel requests",
      "Per-user sliding window rate limiting prevents DDoS, brute-force, and bot abuse",
      "Asynchronous Kafka order processing offloads heavy disk I/O operations from hot request paths",
      "Strict transactional boundaries ensure data consistency between cache and relational DB"
    ],

    keyFlows: [
      "Client ──► Rate Limiter (Redis Counter) ──► Redis Atomic Lua Stock Decrement",
      "Stock Available ──► Apache Kafka Order Queue ──► Async Order Worker ──► MySQL Orders persistence",
      "Stock = 0 ──► Immediate HTTP 429/400 Reject (Out of Stock)"
    ],

    architectureDiagram: `                         ┌────────────────────┐
                         │       CLIENT       │
                         └──────────┬─────────┘
                                    │
                                    ▼
                         ┌────────────────────┐
                         │    RATE LIMITER    │
                         │   Redis Counter    │
                         └──────────┬─────────┘
                                    │
                                    ▼
                         ┌────────────────────┐
                         │ REDIS ATOMIC STOCK │
                         │     DECREMENT      │
                         └──────────┬─────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                    STOCK AVAILABLE        STOCK = 0
                         │                     │
                         ▼                     ▼
                ┌─────────────────┐    ┌─────────────────┐
                │   KAFKA ORDER   │    │      REJECT     │
                │      QUEUE      │    │  OUT OF STOCK   │
                └────────┬────────┘    └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  ORDER WORKER   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  MYSQL ORDERS   │
                └─────────────────┘`,

    decisions: [
      {
        title: "Atomic Inventory Decrement via Redis Lua Scripts",
        detail: "Executes stock check and decrement inside a single atomic Redis Lua script, eliminating race conditions and avoiding costly database lock waits during high traffic bursts."
      },
      {
        title: "Asynchronous DB Persistence Queue via Kafka",
        detail: "Offloads database disk persistence by publishing order creation events to Kafka, allowing DB workers to batch insert confirmed orders at a controlled rate."
      },
      {
        title: "Per-User Sliding-Window Rate Limiting",
        detail: "Restricts purchase attempts per user ID in Redis memory to mitigate bot network exploitation and prevent server overload."
      }
    ],

    challenges: [
      {
        problem: "Inventory overselling during concurrent purchase request bursts.",
        solution: "Pre-loaded stock into Redis memory and executed single-threaded atomic Lua decrements prior to database writing."
      },
      {
        problem: "Database write bottleneck under massive parallel traffic.",
        solution: "Buffered order creation requests in Apache Kafka topics, allowing background persistence workers to throttle DB insertions."
      }
    ],

    github: "https://github.com/Ash8389/FlashSaleEngine"
  },

  "codebase-rag": {
    id: "codebase-rag",
    name: "Codebase Q&A RAG System",
    category: "AI / Distributed RAG",
    flagship: false,
    shortDescription: "AI-powered RAG microservices system in Java Spring Boot for natural language Q&A over GitHub repositories, built with Kafka (KRaft), Qdrant, and Redis.",
    longDescription: "A distributed microservices platform that ingests public GitHub repositories, chunks source code, generates vector embeddings, stores them in Qdrant Vector DB, and synthesizes context-aware natural language answers via LLM semantic search.",

    techStack: [
      "Java 21",
      "Spring Boot 3.x",
      "Spring Cloud Gateway",
      "Apache Kafka 3.9.1 (KRaft)",
      "Qdrant Vector Database",
      "Redis 7 (LRU Cache)",
      "React (Vercel Frontend)",
      "Docker"
    ],

    services: [
      { name: "API Gateway", desc: "Single entry point for request routing, authentication, and rate limiting" },
      { name: "Ingest Service", desc: "Clones GitHub repositories, splits source files into chunks, publishes to Kafka" },
      { name: "Embedding Service", desc: "Consumes chunks from Kafka, generates vector embeddings, upserts to Qdrant" },
      { name: "Query Service", desc: "Checks Redis cache, performs vector similarity search on Qdrant, synthesizes answer" }
    ],

    highlights: [
      "Microservices architecture with isolated concerns connected via Apache Kafka (KRaft)",
      "One-click repository ingestion cloning and chunking any public GitHub repository",
      "High-performance vector similarity search stored in Qdrant vector database",
      "Redis LRU caching layer reducing redundant vector searches and LLM costs",
      "Live web interface deployed on Vercel"
    ],

    keyFlows: [
      "Ingestion: React Client ──► API Gateway ──► Ingest Service ──Kafka──► Embedding Service ──► Qdrant Vector Store",
      "Query: React Client ──► API Gateway ──► Query Service ──► Redis Cache ──► Qdrant Vector Store ──► LLM Synthesis"
    ],

    architectureDiagram: `                         ┌──────────────────────┐
                         │    REACT CLIENT      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     API GATEWAY      │
                         └──────────┬───────────┘
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                       ▼                         ▼
              ┌────────────────┐        ┌────────────────┐
              │ INGEST SERVICE │        │ QUERY SERVICE  │
              └───────┬────────┘        └───────┬────────┘
                      │                         │
                      │ Kafka                   │
                      ▼                         ▼
              ┌────────────────┐        ┌────────────────┐
              │   EMBEDDING    │        │     REDIS      │
              │    SERVICE     │        │     CACHE      │
              └───────┬────────┘        └───────┬────────┘
                      │                         │
                      ▼                         ▼
              ┌────────────────────────────────────┐
              │              QDRANT                │
              │           VECTOR STORE             │
              └────────────────────────────────────┘`,

    decisions: [
      {
        title: "Kafka Decoupling for Ingestion Pipeline",
        detail: "Decoupled heavy repository cloning and code chunking from embedding generation workers using Kafka queues, allowing asynchronous indexing without HTTP timeouts."
      },
      {
        title: "Redis LRU Response Caching",
        detail: "Cached common query responses in Redis to return sub-10ms answers for identical or frequent questions."
      },
      {
        title: "Qdrant Vector Storage with Source Metadata",
        detail: "Indexed dense vectors alongside file path and line number payloads to provide exact code citations in LLM responses."
      }
    ],

    challenges: [
      {
        problem: "Ingestion bottlenecks when processing large repositories.",
        solution: "Streamed code chunks through Apache Kafka (KRaft) topics to scale embedding workers horizontally."
      },
      {
        problem: "High latency and API cost on repeated natural language questions.",
        solution: "Implemented Redis response caching with TTL invalidation to serve frequent queries instantly."
      }
    ],

    github: "https://github.com/Ash8389/Codebase_Q-A"
  },

  "document-rag": {
    id: "document-rag",
    name: "Document Chat RAG Pipeline",
    category: "AI / FastAPI Microservices",
    flagship: false,
    shortDescription: "Microservices PDF RAG pipeline in Python FastAPI connected via Kafka, with Qdrant vector search, Redis chat memory, Cohere reranking, and Groq LLMs.",
    longDescription: "A production-grade Python microservices RAG system for conversing with PDF documents. Ingests PDFs, chunks text, publishes tasks via Kafka, stores vector embeddings in Qdrant, reranks candidates with Cohere, and generates answers via Groq LLMs.",

    techStack: [
      "Python 3.11",
      "FastAPI",
      "Apache Kafka",
      "Qdrant Vector DB",
      "Redis 7 (Chat Memory & Caching)",
      "Cohere Rerank API",
      "Groq LLM API",
      "Docker & Docker Compose"
    ],

    services: [
      { name: "FastAPI Ingest Service", desc: "Handles PDF file uploads, text extraction, and chunk generation" },
      { name: "Kafka Event Queue", desc: "Buffers document chunks asynchronously to embedding workers" },
      { name: "Embedding & Vector Store", desc: "Generates dense text embeddings and indexes into Qdrant" },
      { name: "RAG Query & Memory Service", desc: "Retrieves context from Qdrant, reranks via Cohere, maintains Redis chat history, calls Groq" }
    ],

    highlights: [
      "Cohere cross-encoder reranking applied to initial vector candidates for high precision",
      "Redis session memory maintaining multi-turn conversational context",
      "Event-driven architecture using Apache Kafka to decouple PDF processing from web requests",
      "Fully containerized microservices stack deployed with Docker Compose"
    ],

    keyFlows: [
      "Ingestion: PDF Upload ──► FastAPI Ingest ──► Text Chunking ──Kafka──► Embedding Worker ──► Qdrant Vector DB",
      "Query: User Question ──► FastAPI Query ──► Redis Chat Memory ──► Qdrant Vector Search ──► Cohere Cross-Encoder Reranker ──► Groq LLM"
    ],

    architectureDiagram: `INGESTION
─────────

┌──────────────┐
│  PDF UPLOAD  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   FASTAPI    │
│  INGESTION   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     TEXT     │
│ EXTRACTION   │
│ + CHUNKING   │
└──────┬───────┘
       │
       │ Kafka
       ▼
┌──────────────┐
│  EMBEDDING   │
│   WORKER     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    QDRANT    │
└──────────────┘


QUERY
─────

┌──────────────┐
│ USER QUESTION│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│FASTAPI QUERY │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ REDIS MEMORY │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ QDRANT SEARCH│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   RERANKER   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   GROQ LLM   │
└──────────────┘`,

    decisions: [
      {
        title: "Cohere Cross-Encoder Reranking",
        detail: "Initial vector search returns broad candidates; applying Cohere Rerank filters out semantic noise and passes only high-relevance chunks to Groq LLM."
      },
      {
        title: "Redis Sliding-Window Chat Memory",
        detail: "Maintained multi-turn chat history per user session in Redis with TTL expiration to enable conversational follow-up questions."
      }
    ],

    challenges: [
      {
        problem: "Irrelevant context chunks reducing LLM answer quality.",
        solution: "Integrated Cohere Reranker to re-score vector search outputs before injecting into prompt context."
      },
      {
        problem: "Web request timeouts during multi-page PDF processing.",
        solution: "Offloaded document chunking and vector indexing to background workers via Kafka event topics."
      }
    ],

    github: "https://github.com/Ash8389/document_rag_python"
  },

  "agent-reliability": {
    id: "agent-reliability",
    name: "Agent Reliability Layer",
    category: "AI Reliability / Middleware SDK",
    flagship: false,
    shortDescription: "Middleware SDK & REST API wrapping LLM agents to evaluate semantic consistency, detect NLI logical contradictions, and provide remediation recommendations.",
    longDescription: "A Python reliability framework for non-deterministic LLM agents. Runs queries across parallel execution passes, measures semantic variance, detects logical contradictions using Natural Language Inference (NLI), and returns actionable remediation guidelines.",

    techStack: [
      "Python 3.11",
      "FastAPI",
      "Pydantic v2",
      "Sentence-Transformers",
      "Pretrained NLI Models",
      "Groq API",
      "Asyncio",
      "Pytest (80+ passing tests)"
    ],

    services: [
      { name: "Reliability Layer Wrapper", desc: "Python SDK decorator wrapping any agent query function" },
      { name: "Parallel Agent Executor", desc: "Runs N concurrent agent queries asynchronously using Python asyncio" },
      { name: "Semantic Variance Engine", desc: "Layer 1: Computes Answer, Findings, and Citation variance scores" },
      { name: "NLI Contradiction Detector", desc: "Layer 2: Runs pretrained NLI cross-comparison to detect logical opposition" },
      { name: "Remediation Engine", desc: "Layer 3: Generates actionable recommendations (e.g. lower temp, add CoT, flag human review)" }
    ],

    highlights: [
      "Three-layered evaluation: Semantic Variance + NLI Contradiction + Remediation Rules",
      "Pretrained Natural Language Inference (NLI) model detects opposite assertions across runs",
      "Automated remediation recommendations advising system prompt and temperature tuning",
      "Non-intrusive 2-line code wrapper integrating cleanly into existing Python agent pipelines"
    ],

    keyFlows: [
      "User Query ──► Reliability Layer Wrapper ──► Asyncio Parallel Executor (N Passes)",
      "Parallel Execution ──► [Layer 1 Semantic Variance | Layer 2 NLI Logic Contradiction | Layer 3 Remediation Engine]",
      "Consolidated Output ──► Reliability Report, Variance Score & Audit Trail"
    ],

    architectureDiagram: `                         ┌─────────────────────┐
                         │     USER QUERY      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ RELIABILITY LAYER   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ PARALLEL EXECUTOR   │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
             ┌────────────┐  ┌────────────┐  ┌────────────┐
             │ SEMANTIC   │  │    NLI     │  │REMEDIATION │
             │  VARIANCE  │  │CONTRADICTION│ │   ENGINE   │
             └──────┬─────┘  └──────┬─────┘  └──────┬─────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ RELIABILITY REPORT  │
                         │ SCORE + AUDIT TRAIL │
                         └─────────────────────┘`,

    decisions: [
      {
        title: "NLI Contradiction Detection over Cosine Distance",
        detail: "Cosine embedding distance measures phrasing difference but misses logical opposition (e.g., 'safe' vs 'dangerous'). Pretrained NLI models explicitly evaluate logical entailment vs contradiction."
      },
      {
        title: "Automated Remediation Engine",
        detail: "Categorizes low-reliability causes and recommends targeted developer actions (e.g. lowering temperature for high answer variance, adding chain-of-thought for reasoning variance)."
      }
    ],

    challenges: [
      {
        problem: "Undetected LLM hallucinations in semantically similar responses.",
        solution: "Added Layer 2 NLI contradiction checks to flag logically conflicting statements across parallel runs."
      },
      {
        problem: "Execution latency overhead when running multiple agent passes.",
        solution: "Parallelized query executions concurrently using Python asyncio worker tasks."
      }
    ],

    github: "https://github.com/Ash8389/Agent-Reliability-Layer"
  },

  "tinyllama-tutor": {
    id: "tinyllama-tutor",
    name: "TinyLlama AI/ML Domain Tutor",
    category: "AI / LLM Fine-Tuning",
    flagship: false,
    shortDescription: "TinyLlama-1.1B fine-tuned with QLoRA to act as an AI/ML tutor explaining concepts in a structured Definition -> Intuition -> Example -> Summary format.",
    longDescription: "A specialized AI/ML domain tutor built by fine-tuning TinyLlama-1.1B using QLoRA on a custom instructional dataset. Explains concepts like attention, gradient descent, and autograd in a structured Definition -> Intuition -> Example -> Summary format, complete with synthetic data generation, SFTTrainer pipeline, and FastAPI comparative serving.",

    techStack: [
      "Python 3.10",
      "PyTorch",
      "Hugging Face Transformers",
      "PEFT / QLoRA (4-bit quantization)",
      "TRL (SFTTrainer)",
      "FastAPI (Serving Service)",
      "BitsAndBytes",
      "Google Colab GPU"
    ],

    services: [
      { name: "Dataset Grabber & Generator", desc: "Generates and cleans synthetic AI/ML instruction dataset" },
      { name: "QLoRA Fine-Tuner", desc: "4-bit NormalFloat quantization & LoRA adapter weight training via SFTTrainer" },
      { name: "Evaluation & Comparison", desc: "Evaluates base vs. fine-tuned answers side-by-side" },
      { name: "FastAPI Serving API", desc: "REST endpoint serving structured AI/ML tutor responses" }
    ],

    highlights: [
      "Custom dataset grabbing and formatting for AI/ML technical domain instruction",
      "Structured output format: Definition ➔ Intuition ➔ Code Example ➔ Summary",
      "4-bit NF4 QLoRA fine-tuning enabling efficient training on accessible GPU hardware",
      "FastAPI service providing comparative side-by-side evaluation between base and fine-tuned model"
    ],

    keyFlows: [
      "Custom Dataset (~1,150 Q&A pairs) ──► Tokenization & Prompt Formatting ──► TinyLlama 1.1B Base Model",
      "Base Model ──► QLoRA 4-bit Adapter Target Injection ──► Hugging Face TRL SFTTrainer Pipeline ──► Exported LoRA Weights",
      "Serving ──► FastAPI Service (Side-by-Side Base vs Fine-Tuned Model evaluation)"
    ],

    architectureDiagram: `┌──────────────────────────┐
│   INSTRUCTION DATASET    │
│      ~1,150 EXAMPLES     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ TOKENIZATION + TEMPLATE  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    TINYLLAMA 1.1B        │
│       BASE MODEL         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      QLoRA / PEFT        │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      SFT TRAINING        │
│    Hugging Face TRL      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    FINE-TUNED MODEL      │
└──────────────────────────┘`,

    decisions: [
      {
        title: "Custom Synthetic Dataset Generation for Domain Adaptation",
        detail: "Grabbed and structured specific AI/ML instruction pairs enforcing a 4-part Definition ➔ Intuition ➔ Example ➔ Summary schema."
      },
      {
        title: "QLoRA 4-Bit Quantization",
        detail: "Quantized base TinyLlama model to 4-bit NormalFloat while training low-rank adapters, enabling fine-tuning under low VRAM GPU constraints."
      }
    ],

    challenges: [
      {
        problem: "Unstructured or generic LLM responses on complex ML concepts.",
        solution: "Enforced strict 4-part explanation formatting in the fine-tuning dataset to train predictable, structured tutoring responses."
      },
      {
        problem: "GPU memory limits during model fine-tuning.",
        solution: "Combined 4-bit NF4 quantization with double quantization and gradient accumulation."
      }
    ],

    github: "https://github.com/Ash8389/finetune_tinyllama_ai_ml_tutor"
  }
};
