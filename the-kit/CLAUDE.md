# K.I.T — Autonomous AI System

This repository contains the frontend system for **K.I.T (Knowledge Integration Tool)**.

K.I.T is an autonomous AI assistant platform designed to:

- plan tasks
- reason about problems
- execute workflows
- assist users through chat and voice interfaces

---

# Core Philosophy

K.I.T should behave like a **modular AI operating system**.

The architecture must remain:

- modular
- scalable
- component-driven
- AI-friendly

Claude is allowed to refactor code **only if architecture improves**.

---

# Tech Stack

Frontend

React
TypeScript
Vite
TailwindCSS
ShadCN UI

Future integrations

OpenAI API
Claude API
Local LLMs
Supabase
n8n

---

# Project Structure

src/

components/
UI components and system modules

pages/
Main application routes

contexts/
Global state management

hooks/
Custom hooks

lib/
Utility functions and integrations

---

# Rules for Claude

Claude may:

- create new components
- improve UI structure
- refactor for clarity
- add AI integrations
- improve modularity

Claude must NOT:

- remove core architecture
- break working UI components
- rename major directories without reason

---

# Development Workflow

When implementing features:

1. create component
2. add logic
3. connect to system modules
4. test UI
5. ensure clean code

---

# Future Modules

The following systems will be added:

- AI reasoning engine
- tool execution engine
- memory system
- autonomous task agents
- plugin system
- API integrations

---

# Mission

K.I.T should evolve into a **complete AI command center** capable of:

- assisting users
- executing complex workflows
- interacting with external systems
- coordinating AI agents
