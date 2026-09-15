import { personalInfo } from './personal';

export const resumeData = {
  personalInfo: {
    fullName: "Ashish Kumar Jha",
    title: "Backend-Focused Software Engineer | Java | Spring Boot | Distributed Systems",
    email: personalInfo.email,
    phone: "+91-83898 61365",
    location: "Siliguri, West Bengal",
    github: personalInfo.github,
    linkedin: personalInfo.linkedin
  },

  summary: "Backend-focused Software Engineer building Java/Spring Boot microservices and distributed systems with Kafka, Redis, MySQL, concurrency control, and event-driven architectures. Hands-on AI/ML experience spanning LLM fine-tuning, RAG, vector search, and Python-based model workflows.",

  education: [
    {
      institution: "Geeta University",
      degree: "B.Tech in Computer Science & Engineering",
      period: "2022–2026",
      details: "Focus on Data Structures, Algorithms, Distributed Systems, and Database Management."
    }
  ],

  experience: [
    /*
    {
      company: "Tech Application Development",
      role: "Software Development Intern",
      period: "2024",
      highlights: [
        "Collaborated with cross-functional development teams to build user-facing application features.",
        "Engineered optimized SQL relational database queries for high-performance data retrieval.",
        "Integrated RESTful API services with React components for responsive UI state updates."
      ]
    }
    */
  ],

  projects: [
    {
      title: "E-Wallet Backend",
      techStack: "Java 21 / Spring Boot / Microservices / Kafka / Redis / MySQL / AWS / API Gateway",
      services: "User Service, Wallet Service, Transaction Service, Notification Service, API Gateway",
      architectureNotes: "Transaction execution uses synchronous REST communication with the Wallet Service. Kafka is used after the transaction for asynchronous notification processing.",
      highlights: [
        "Multi-service distributed architecture with API Gateway routing.",
        "Synchronous REST balance validation and atomic balance updating.",
        "Asynchronous Kafka event publishing for notifications."
      ]
    },
    {
      title: "Flash Sale Engine",
      techStack: "Java 21 / Spring Boot / Redis / MySQL / Kafka / JWT / JMeter",
      highlights: [
        "High-concurrency inventory reservation engine built to handle traffic bursts.",
        "Atomic Lua script reservation in Redis to prevent inventory overselling.",
        "Asynchronous order queuing via Kafka and automated JMeter load testing."
      ]
    },
    {
      title: "Codebase Q&A — RAG System",
      techStack: "Spring Boot / Kafka / Qdrant / Redis",
      highlights: [
        "Repository ingestion and AST/chunk embedding pipeline.",
        "Vector search in Qdrant Vector DB with Redis query caching.",
        "Asynchronous Kafka processing pipeline returning contextual answers."
      ]
    },
    {
      title: "TinyLlama AI/ML Tutor",
      techStack: "TinyLlama-1.1B-Chat-v1.0 / PyTorch / Transformers / PEFT / TRL / QLoRA / SFT",
      highlights: [
        "Supervised fine-tuning (SFT) of TinyLlama-1.1B model on technical QA datasets.",
        "4-bit NF4 QLoRA parameter-efficient fine-tuning via Hugging Face TRL SFTTrainer.",
        "Evaluation against base model with side-by-side prompt benchmarking."
      ]
    }
  ],

  technicalSkills: {
    languages: "Java, Python, C++, JavaScript, SQL",
    backendAndDistributed: "Spring Boot, Spring Security, Microservices, REST APIs, Apache Kafka, Redis, MySQL, JPA/Hibernate, Resilience4j, System Design",
    aiMlAndLlm: "PyTorch, Hugging Face Transformers, PEFT, TRL, QLoRA, LoRA, SFT, RAG, Embeddings, Qdrant",
    toolsAndCloud: "Git, GitHub Actions, Docker, Docker Compose, AWS EC2, Maven, Swagger/OpenAPI, Apache JMeter"
  },

  competitiveProgramming: [
    {
      platform: "LeetCode",
      summary: "250 solved — Max Rating 1654",
      url: "https://leetcode.com/u/ashish8389/"
    },
    {
      platform: "GeeksforGeeks",
      summary: "300+ solved",
      url: "https://www.geeksforgeeks.org/profile/jhaashia3d6?tab=activity"
    },
    {
      platform: "Codeforces",
      summary: "Pupil — Max Rating 1381",
      url: "https://codeforces.com/profile/jhaashish270"
    },
    {
      platform: "CodeChef",
      summary: "2-Star — Max Rating 1514",
      url: "https://www.codechef.com/users/jhaashish270"
    },
    {
      platform: "AtCoder",
      summary: "451 — 8 Kyu",
      url: "https://atcoder.jp/users/ash8389"
    }
  ],

  pdfConfig: {
    pdfUrl: "/resume/Ashish-Kumar-Jha-Resume.pdf",
    fallbackUrl: "/Ashish-Kumar-Jha-Resume.pdf",
    downloadFilename: "Ashish-Kumar-Jha-Resume.pdf"
  }
};
