# 🧠 Slingshot Dev Intelligence

## Real-Time Cognitive Signature & Developer Performance Engine for VS Code

Slingshot Dev Intelligence is an AI-powered VS Code extension that analyzes real-time developer behavior to generate contextual cognitive insights directly inside the editor.

Built for the AMD Slingshot National Hackathon.

---

## 🚀 Vision

Modern developer tools optimize code.  
This tool optimizes the developer behind the code.

Slingshot Dev Intelligence transforms behavioral signals like typing speed, focus continuity, and interaction density into a structured Cognitive Signature — helping developers understand their productivity state in real time.

---

## 🧠 What It Does

This extension runs fully locally and:

- Tracks typing velocity  
- Monitors editor interaction patterns  
- Detects context switching  
- Computes Focus Score  
- Estimates Burnout Risk  
- Generates Cognitive Stability Index  
- Provides real-time behavioral nudges  
- Displays a live performance dashboard  

All analysis happens locally. No behavioral data leaves the system.

---

## 📊 Core Features

### 1. Live Cognitive Signature Dashboard

Automatically opens when VS Code launches and updates every 5 seconds.

Displays:

- Typing Speed (keys per minute)  
- Focus Score (0–100)  
- Burnout Risk (Low / Moderate / High)  
- Cognitive Stability Index  
- Real-time Cognitive Load Timeline  

---

### 2. AI Recommendation Engine

Context-aware nudges based on behavioral state:

- “You appear to be thinking. Stay intentional.”  
- “Deep Focus Mode detected. Protect this flow state.”  
- “High burnout risk detected. Take a short break.”  
- “Workflow stabilized.”  

Designed to support productivity without interrupting developer flow.

---

### 3. Behavioral Analytics Engine

Combines:

- Typing velocity  
- Interaction frequency  
- Focus continuity  
- Activity fluctuations  

Into a composite Cognitive Stability Index representing performance resilience.

---

## 🏗 System Architecture

VS Code Events  
→ Tracker Module  
→ Analyzer Engine  
→ Profile Generator  
→ Webview Dashboard + AI Notifications  

Core Modules:

- tracker.ts – Captures editor behavior signals  
- analyzer.ts – Computes focus, burnout, and stability metrics  
- profileGenerator.ts – Generates cognitive state classification  
- webview.ts – Renders dashboard UI  
- extension.ts – Coordinates tracking and updates  



```
+----------------------+
|   VS Code Events     |
|  (Typing, Edits,     |
|   File Switch, Idle) |
+----------+-----------+
           |
           v
+----------------------+
|      Tracker.ts      |
|  Captures raw        |
|  behavioral signals  |
+----------+-----------+
           |
           v
+----------------------+
|     Analyzer.ts      |
|  - Typing Speed      |
|  - Focus Score       |
|  - Burnout Risk      |
|  - Stability Index   |
+----------+-----------+
           |
           v
+----------------------+
| profileGenerator.ts  |
|  Generates cognitive |
|  state classification|
+----------+-----------+
           |
           v
+----------------------+
|   extension.ts       |
|  Orchestration Layer |
|  + AI Notifications  |
+----------+-----------+
           |
           v
+----------------------+
|    webview.ts        |
|  Live Dashboard UI   |
|  + Chart.js Timeline |
+----------------------+
```
---

## 🔐 Privacy-First Design

- No cloud dependency  
- No external API calls  
- No behavioral data storage  
- 100% local processing  

Built with privacy by architecture.

---

## 🛠 Technology Stack

- TypeScript  
- VS Code Extension API  
- Chart.js (real-time graph rendering)  
- Node.js runtime  

---

## 📈 Why This Matters

Most developer tools optimize code quality.  
Slingshot Dev Intelligence introduces human-centric performance intelligence.

Potential applications include:

- Developer wellness systems  
- Behavioral fingerprint research  
- Adaptive AI tooling  
- Burnout prediction engines  
- Enterprise productivity analytics  

This prototype demonstrates the foundation for a scalable Developer Intelligence Platform.

---

## 🧪 Running in Development Mode

1. Clone the repository  
2. Run `npm install`  
3. Run `npm run compile`  
4. Press `F5` in VS Code to launch the Extension Development Host  

---

## 🌍 Future Roadmap

- Cross-device cognitive profile sync  
- Privacy-preserving team analytics  
- Behavioral anomaly detection  
- Research-backed burnout modeling  
- SaaS dashboard layer  
- Enterprise-grade developer intelligence  

---

## 🏁 Hackathon Context

Built for the AMD Slingshot National Hackathon.

This prototype demonstrates:

- Real-time behavioral modeling  
- Applied AI in developer tooling  
- Cognitive performance analytics  
- Local-first architecture  
- Human-centered systems design  

---

## 👩‍💻 Author

Devika Polavarapu  
B.Tech Information Technology  
AI & Cybersecurity Enthusiast  

GitHub: https://github.com/devikapolavarapu  
LinkedIn: https://linkedin.com/in/devika-polavarapu  

---

## 📜 License

MIT License
