# Slingshot Dev Intelligence

Slingshot Dev Intelligence is a real-time VS Code extension that observes developer coding behavior and generates contextual insights directly inside the editor. Unlike traditional AI assistants that focus only on code completion, this system analyzes coding activity patterns, file modifications, and behavioral trends to provide proactive development intelligence without interrupting workflow.

## Overview

Modern development tools are largely reactive. They highlight errors after compilation, suggest code completions, or depend heavily on explicit prompts. This project introduces a context-aware intelligence layer that continuously monitors development activity, interprets behavioral signals, and delivers structured insights in real time.

The system tracks file edits, addition and deletion patterns, coding frequency, and structural modification trends. These signals are analyzed to generate meaningful feedback through an integrated VS Code webview dashboard.

## Problem Statement

Developers frequently introduce repetitive structural changes, unnoticed inefficiencies, and avoidable inconsistencies during development. Productivity flow can degrade without visibility into behavioral patterns. Existing tools do not provide insight into how development activity evolves over time. This project addresses that gap by transforming raw coding activity into actionable intelligence.

## Solution Approach

The extension captures real-time file system events within VS Code and processes them through a modular analysis pipeline. Behavioral signals are interpreted to detect patterns such as rapid modification cycles, heavy deletion streaks, repeated edits in specific modules, and development intensity trends. The system then generates contextual insights and presents them through a clean webview interface.

An optional FastAPI backend extends the architecture by enabling structured profile generation, scalable analytics processing, and future-ready expansion toward team-level insights.

## Core Features

- Real-time file activity tracking  
- Behavioral pattern analysis engine  
- Developer activity profile generation  
- Integrated VS Code webview dashboard  
- Lightweight and non-intrusive execution  
- Modular and extensible architecture  

## Architecture

VS Code Extension  
→ Tracker Module (captures file events)  
→ Analyzer Engine (interprets behavioral signals)  
→ Profile Generator (creates structured insights)  
→ Webview Panel (renders feedback inside the editor)  
Optional: FastAPI Backend for extended analytics and scalability  

## Tech Stack

TypeScript  
VS Code Extension API  
FastAPI (Python)  
HTML, CSS, JavaScript (Webview UI)  

## Project Structure

src/  
├── extension.ts  
├── tracker.ts  
├── analyzer.ts  
├── profileGenerator.ts  
└── webview.ts  

## Installation

1. Clone the repository  
2. Run `npm install`  
3. Open the project in VS Code  
4. Press `F5` to launch the Extension Development Host  

## Demo

Demo video link: [Add Your Video Link Here]

## Team

Devika Polavarapu  
Team Lead  
puppy567567@gmail.com  

Built as part of the AMD Slingshot Hackathon.

## Vision

This prototype lays the foundation for a scalable, context-aware development intelligence platform that enhances productivity, identifies behavioral trends early, and augments engineering workflows beyond traditional code assistants. The long-term direction includes advanced analytics, team-level intelligence dashboards, and deeper integration into development ecosystems.
