// Single source of truth for facts about me. Consumed by About, /cv, JSON-LD,
// llms.txt, resume.json and the footer. Only add facts that are true.

export const profile = {
  name: "Naveen Rajan",
  aliases: ["Naveen Rajan SK", "Naveen Rajan Selvaraj Kannammal"],
  handle: "NavRjn",
  title: "Machine Learning Engineer",
  tagline: "Computer vision, autonomous systems and applied AI",
  location: "Vienna, Austria",
  email: "hello@navrjn.com",
  site: "https://navrjn.com",
  availability: "Available immediately",
  lookingFor:
    "Full-time, working-student, internship and freelance/contract roles in ML, computer vision and software engineering. Vienna on-site or remote within the EU.",
  links: {
    github: "https://github.com/NavRjn",
    linkedin: "https://www.linkedin.com/in/navrjn",
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "German", level: "B2 (CEFR)" },
  ],
  summary:
    "Software and ML engineer with five years of experience building AI systems integrated with real-world software infrastructure. Strong in system architecture and end-to-end ownership, with a track record of taking solutions from 0 to 1. Currently extending that background into LLM-based systems, agentic workflows and knowledge graphs.",
  workingStyle:
    "I'm strongest at diagnosing complex systems: reducing unstructured observations and telemetry to a specific failure mechanism, fixing the underlying issue without unnecessary rewrites, and designing the next system to avoid the same failure mode.",
  experience: [
    {
      org: "Flying4Home (clearBee)",
      place: "Vienna, Austria",
      title: "Founding Engineer, Computer Vision & Autonomy",
      period: "2021 – 2026",
      summary:
        "Early engineer and co-founder of an autonomous drone startup (5–8 people). Progressed from part-time prototyping while studying to full-time technical ownership of the perception and navigation stack.",
      steps: [
        { period: "2021 – 2023", text: "Early engineering: small aerospace parts in Fusion 360, C++/ArduPilot debugging and refactoring, ROS/Gazebo simulation and testing." },
        { period: "2023 – 2024", text: "Prototyping and software: electronics prototypes incl. SMD soldering, Python tooling for Raspberry Pi/IoT, first versions of the Android app controlling DJI drones, classical computer vision with OpenCV." },
        { period: "2024 – 2025", text: "Feature ownership: took primary ownership of the Android app, experimented with neural depth models, and established evaluation and benchmarking methods." },
        { period: "2025 – 2026", text: "Autonomous navigation: independently owned the computer-vision navigation system and its integration into the flight-control app." },
      ],
      bullets: [
        "Improved successful A→B autonomous indoor flights from <30% to ~97% in arbitrary indoor environments via multimodal recovery policies and sensor fusion (vision + IMU + fiducial).",
        "Achieved a stable 20 Hz control loop and inference on edge Android hardware.",
        "Architected a hierarchical Kotlin coroutine orchestration system for concurrent perception, telemetry and control; eliminated lifecycle leaks, zombie states and cross-pipeline contention.",
        "Combined classical CV (OpenCV, IMU/Kalman filtering) with pretrained monocular depth models (Depth Anything, MiDaS, ZoeDepth).",
        "Built system-wide observability with Grafana, Prometheus and Loki to diagnose intermittent hardware and software failures; experiment tracking with ClearML.",
        "Designed the full frontend, backend and database for the multi-platform control app (Android, iOS, React/FastAPI web) with Firebase auth and realtime database.",
        "Integrated and maintained components across Kotlin/Android, Python, C++, Raspberry Pi, ESP32 and the DJI SDK; led a 3–4 person technical team.",
        "Built financial models informing a business-model revision that raised projected EBITDA by 22%.",
      ],
    },
    {
      org: "Self-employed",
      place: "Austria",
      title: "Full-Stack Developer",
      period: "2018 – 2021",
      summary:
        "Built and deployed a localized e-commerce service for a niche grocery market during COVID-19 (Python backend, REST APIs, React frontend, Firebase), owning it from architecture through deployment, integrations and user support.",
      steps: [],
      bullets: [],
    },
  ],
  education: [
    {
      org: "Johannes Kepler University (JKU)",
      place: "Linz, Austria",
      title: "BSc Artificial Intelligence",
      period: "Oct 2023 – expected early 2027",
      summary:
        "Thesis on physics-informed neural networks: conditioning latent-space manifolds, comparing attention-based mechanisms with vector-set representations to solve under-determined families of nonlinear PDEs with a single model. Mathematics and statistics average 1.6; NLP practical grade 1 (Sehr gut).",
    },
  ],
  skills: [
    { group: "Languages", items: ["Python", "Kotlin", "TypeScript", "C++", "SQL", "Bash", "Java", "C#"] },
    { group: "ML & LLM systems", items: ["PyTorch", "ONNX", "Hugging Face", "LLMs & RAG", "LangChain", "Langfuse", "Ollama", "OpenAI API", "Vector databases", "PINNs", "Vision Transformers"] },
    { group: "Computer vision & perception", items: ["OpenCV", "YOLO", "Monocular depth (Depth Anything, MiDaS, ZoeDepth)", "Sensor fusion", "IMU / Kalman filtering", "Tracking & segmentation"] },
    { group: "Backend & data", items: ["FastAPI", "Pydantic", "REST", "PostgreSQL", "MongoDB", "Firebase", "Async pipelines"] },
    { group: "Frontend & mobile", items: ["React", "Astro", "Android (Jetpack Compose, Coroutines)", "iOS integration"] },
    { group: "Infra & observability", items: ["Docker", "CI/CD", "Git/GitHub/GitLab", "Grafana", "Prometheus", "Loki", "ClearML", "Linux/WSL"] },
    { group: "Robotics & embedded", items: ["DJI SDK", "ESP32", "Raspberry Pi", "ROS/Gazebo", "ArduPilot", "MQTT", "I2C", "Fusion 360"] },
    { group: "Testing", items: ["Playwright", "Espresso", "pytest", "Regression & contract tests", "LLM evaluation"] },
  ],
  beyondCode:
    "I fly the drones I write software for, solder my own boards, and model and film the product in Blender and DaVinci Resolve. I like the whole loop: from a CAD part to a flight log to a pitch.",
  awards: ["2nd place, StartupLive Global (pitch competition)"],
  press: [
    {
      outlet: "StartupValley",
      title: "clearBee on Die Höhle der Löwen (interview)",
      date: "2026-09-17",
      url: "https://startupvalley.news/de/clearbee-drohne-die-hoehle-der-loewen/",
    },
    {
      outlet: "netzwelt",
      title: "Die Fensterputz-Drohne clearBee aus Wien (Die Höhle der Löwen, VOX, 21 Sep 2026)",
      date: "2026-09-20",
      url: "https://www.netzwelt.de/news/258695-fensterputz-drohne-komplett-reinigt-sagen-loewen-clearbee.html",
    },
  ],
  knowsAbout: [
    "Computer vision",
    "Machine learning engineering",
    "Autonomous drones",
    "Sensor fusion",
    "Edge ML",
    "Kotlin coroutines",
    "LLM document intelligence",
    "Knowledge graphs",
    "Physics-informed neural networks",
    "Observability",
  ],
} as const;

export const mailto = `mailto:${profile.email}?subject=Opportunity%20%E2%80%94%20Naveen%20Rajan`;
