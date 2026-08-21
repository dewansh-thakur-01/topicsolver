# 🦊 TOPIC SOLVER — Adaptive Topic Mastery & AI Learning Engine

<div align="center">

![TOPIC SOLVER Logo](./public/images/topic_solver_logo.png)

### **Your Personalized 3D Path to Mastering Any Programming Topic**

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Live Demo](#-quick-start) • [Features](#-core-features) • [Curriculum](#-supported-tracks) • [Deployment](#-deployment) • [Architecture](#-project-structure)

</div>

---

## 📖 Overview

**TOPIC SOLVER** is an intelligent, adaptive learning platform engineered for the **Remote Learning Engagement Engine** challenge. Traditional educational platforms force students into rigid, one-size-fits-all curricula with identical difficulty regardless of prior experience. 

**TOPIC SOLVER** solves this by:
1. **Mapping Prior Knowledge**: An initial 10-question diagnostic assessment measures topic readiness and allows students to fast-track directly to their appropriate module level.
2. **Strict Sequential Mastery**: Enforces an $\ge 80\%$ (4/5) passing threshold per topic comprehension quiz before unlocking subsequent topics and modules.
3. **AI Error Mentorship**: Integrated with **CodeMentor AI**, which detects bugs in **Python**, **Java**, **SQL**, **DSA**, and **C** and gives non-spoiler conceptual clues instead of spoiling full code solutions.
4. **Multi-Language Accessibility**: Full native support for **Tamil (தமிழ்)**, **Telugu (తెలుగు)**, **Malayalam (മലയാളം)**, **Hindi (हिन्दी)**, and **English**.
5. **Rural Low-Bandwidth Mode**: Sub-50KB text and audio payload mode ensuring 100% fluid learning on 2G or unstable connections.

---

## ✨ Core Features

### 1. 🎯 10-Question Diagnostic Knowledge Check
- Automatically evaluates foundational knowledge across subjects.
- Dynamically places students into the curriculum based on score:
  - **$\ge 90\%$**: Advanced Placement (Module 4)
  - **$70\% - 89\%$**: Intermediate Fast-Track (Module 3)
  - **$50\% - 69\%$**: Developing Placement (Module 2)
  - **$< 50\%$**: Foundational Track (Module 1)

### 2. 🔒 Strict Sequential Topic & Module Locking
- **Initial State**: Level 1 of Module 1 is open to begin learning.
- **Criteria Pass Gate**: All subsequent topics in a module are locked until the preceding topic's 5-question quiz is passed with $\ge 80\%$.
- **Module Gate**: Modules unlock sequentially once the previous module's topics are mastered.
- **No Premature Navigation**: Next Level action buttons remain hidden until the passing criteria has been secured.

### 3. 🤖 CodeMentor — AI Coding Error Assistant
- Guides learners when they encounter compilation or runtime bugs.
- **Languages Supported**: Python, Java, SQL, Data Structures, and C.
- **Pedagogical Rule**: Provides 3-tier progressive hints explaining *why* the logic failed without rewriting the complete answer automatically.

### 4. 🌐 Native Multi-Language Translation System
Easily switch between regional languages with instant full-site translation:
- 🇬🇧 **English (`en`)**
- 🇮🇳 **Tamil (`ta`)** — தமிழ்
- 🇮🇳 **Telugu (`te`)** — తెలుగు
- 🇮🇳 **Malayalam (`ml`)** — മലയാളം
- 🇮🇳 **Hindi (`hi`)** — हिन्दी

### 5. 📊 Dynamic Strengths & Weaknesses Analytics
- Analyzes solved practice challenges, test case accuracy, and quiz misconceptions.
- Displays identified strengths with mastery percentages and recommendations.
- Highlights targeted improvement areas with root-cause insights and 1-click **`🚀 Solve Challenge`** and **`📖 Review Lesson`** action buttons.

### 6. ⚡ Low Data Mode (&lt;50KB)
- 1-click toggle switches heavy video streams to ultra-compact text, diagrams, and code snippets for seamless learning in remote or rural areas.

### 7. 🎨 Cyber Fox Mascot & 3D Visual Effects
- Glowing blue aura cyber fox sticker mascot.
- 3D isometric perspective cards with interactive hover effects.
- Dynamic **Flower Flow Celebration** upon topic completion.

---

## 📚 Supported Tracks

| Track | Subject Focus | Levels & Topics |
| :--- | :--- | :--- |
| ☕ **Java Mastery** | OOP, JVM Architecture, Multithreading, Exception Handling, Streams | 15+ Levels |
| 🐍 **Python Programming** | Data Types, List Comprehensions, Decorators, Generators, File I/O | 15+ Levels |
| 🗄️ **SQL & Databases** | DDL/DML, Relational Joins, Window Functions, Indexing, Normalization | 15+ Levels |
| ⚡ **Data Structures (DSA)** | Arrays, Linked Lists, Trees, Graphs, Dynamic Programming | 15+ Levels |
| 💻 **C Programming** | Pointers, Dynamic Memory (`malloc`/`free`), Structs, Bitwise Ops | 15+ Levels |

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: `canvas-confetti`, CSS 3D Perspective Transforms
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dewansh-thakur-01/topicsolver.git
   cd topicsolver
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to explore TOPIC SOLVER.

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. Push your latest changes to GitHub:
   ```bash
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository **`dewansh-thakur-01/topicsolver`**.
4. Framework Preset: **Next.js** (auto-detected).
5. Click **Deploy**.

### Deploying to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com).
2. Select **Import an existing project** $\to$ **GitHub**.
3. Choose **`topicsolver`**.
4. Build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
5. Click **Deploy Site**.

---

## 📁 Project Structure

```text
topicsolver/
├── app/
│   ├── layout.tsx              # Root HTML Layout with Navbar & Theme
│   ├── page.tsx                # 3D Hero Landing Page & Subject Selector
│   ├── courses/                # Courses Directory & Subject Syllabi
│   │   ├── page.tsx            # All Courses Catalog
│   │   └── [subjectId]/        # Modular Level Syllabus with Locking
│   ├── lessons/                # Interactive Lesson Viewer
│   │   └── [lessonId]/         # Topic Player, Video, and 5Q Quiz
│   ├── assessment/             # 10-Question Knowledge Check Assessment
│   ├── practice/               # Algorithmic Practice Workbench
│   ├── mentor/                 # CodeMentor AI Error Assistant
│   └── profile/                # Learner Profile, Strengths/Weaknesses & i18n
├── components/
│   ├── Navbar.tsx              # Left-aligned Navigation Bar with Language Dropdown
│   ├── AdaptiveQuizCard.tsx    # 5Q Randomized Quiz with 80% Threshold
│   ├── FlowerFlowCelebration.tsx# Floral Celebration Modal
│   ├── LanguageSelector.tsx    # Multi-Language Selector (Tamil, Telugu, etc.)
│   ├── MasteryBar.tsx          # OKR Progress Gauge
│   └── Hero3DVisual.tsx        # 3D Isometric Holographic Engine Graphic
├── lib/
│   ├── topicSolverData.ts      # Complete Course Curriculums, Quizzes & Problems
│   ├── translations.ts         # Full i18n Translation Dictionary
│   ├── adaptiveEngine.ts       # Diagnostic Placement & Difficulty Calibration
│   ├── quizRandomizer.ts       # Dynamic Question Randomizer & Clue Generator
│   ├── codeMentorEngine.ts     # AI Mentor Parser & Progressive Hint Engine
│   └── useTopicSolverStore.ts  # Zustand Global State & Performance Analytics
├── public/                     # Static Assets, Logos & Cyber Fox Mascot
└── package.json
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ for the Remote Learning Engagement Engine Challenge.</sub>
</div>
