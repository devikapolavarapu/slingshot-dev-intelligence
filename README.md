# Slingshot Dev Intelligence

What if your code editor could understand not just what you write — but how you write it?

Slingshot Dev Intelligence is a real-time VS Code extension that analyzes developer behavior, coding patterns, and modification trends to generate contextual insights directly inside the editor. Instead of reacting after errors occur, it surfaces intelligent observations during development.

This project introduces a proactive development intelligence layer beyond traditional code assistants.

## Why This Matters

Modern tools focus on code completion and syntax validation. They do not understand developer behavior, coding rhythm, or structural modification patterns.

Developers often:
- Repeatedly refactor the same logic
- Introduce avoidable inconsistencies
- Enter inefficient modification loops
- Lose productivity momentum without realizing it

Slingshot Dev Intelligence transforms raw coding activity into actionable signals.

## How It Works

The extension continuously monitors real-time file activity inside VS Code. Every addition, deletion, and modification is captured and passed through a modular analysis pipeline.

The system:
- Tracks behavioral signals
- Identifies modification patterns
- Detects structural edit trends
- Generates contextual feedback
- Displays insights inside an integrated webview dashboard

An optional FastAPI backend supports scalable analytics and structured developer profiling.

## Core Capabilities

- Real-time behavioral tracking  
- Pattern-based code activity analysis  
- Developer insight generation  
- Integrated in-editor dashboard  
- Modular and extensible system design  
- Lightweight, non-intrusive execution  

## Architecture

VS Code Extension  
→ Tracker Module  
→ Analyzer Engine  
→ Profile Generator  
→ Webview Dashboard  

Optional Backend  
→ FastAPI-based analytics layer  

## Tech Stack

TypeScript  
VS Code Extension API  
FastAPI (Python)  
HTML, CSS, JavaScript  

## Installation

1. Clone the repository  
2. Run `npm install`  
3. Open in VS Code  
4. Press `F5` to launch the Extension Development Host  

## Demo

Demo Video: 

## Team

Devika Polavarapu  
Team Lead  
puppy567567@gmail.com  

Built for the AMD Slingshot Hackathon.

## Vision

This prototype represents the foundation of a context-aware engineering intelligence platform. The long-term direction includes deeper behavioral analytics, team-level productivity intelligence, and integration into modern development ecosystems.

The goal is simple: elevate development from reactive tooling to intelligent, insight-driven workflows.
