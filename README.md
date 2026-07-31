# 🧠 Mind Matcher — Neumorphic Memory Card Game

A premium, highly interactive, and visually stunning **Memory Card Matching Game** web application. Built using **Next.js (App Router)** and **Tailwind CSS**, it features a soft pastel neumorphic aesthetic, playful animations, and fully decoupled React state-management.

Ideal for students and developers learning about React state, timer hooks, CSS 3D transitions, and modern responsive layouts.

---

## ✨ Features

- **Easy, Medium, and Hard Modes**: Choose between Easy (4x4, 8 pairs), Medium (6x6, 18 pairs), or Hard (6x8, 24 pairs) to scale the board size dynamically.
- **Pastel Neumorphic Design**: Built using custom outset/inset shadows, smooth buttons, and interactive card surfaces that respond to clicks with tactile micro-interactions.
- **Tactile Card Flipping**: Gorgeous 3D rotations (`perspective-1000`, `preserve-3d`, and `backface-hidden`) for realistic visual feedback.
- **Smart Timer & Move Counter**:
  - The running stopwatch formats time as `MM:SS`.
  - Timer starts automatically on the **first card flip** and pauses immediately upon victory.
  - Moves counter increments every time two cards are selected.
- **Pure CSS Confetti Victory Overlay**: Lightweight, high-performance confetti floating animation when you successfully complete the game.
- **Responsive Layout**: Designed mobile-first, looking equally stunning on small phone screens, tablets, and wide desktop displays.
- **Zero-Dependency Core**: Managed entirely with built-in React hooks (`useState`, `useEffect`, `useCallback`, `useRef`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **UI & Logic**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
- **Typography**: [Nunito font](https://fonts.google.com/specimen/Nunito) (Google Fonts)

---

## 🚀 Getting Started

Follow these steps to run the game locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### 2. Install Dependencies
Run this command from the project root:
```bash
npm install
```

### 3. Run Development Server
Start the local server with:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing!

### 4. Build for Production
To verify page compilation and create an optimized production build:
```bash
npm run build
npm start
```

---

## 🌎 Deployment Guide

You can easily host this project on **Vercel** using one of the following methods:

### Method A: Deploy via GitHub Import (Recommended)
1. Initialize a git repository locally:
   ```bash
   git init
   git add .
   git commit -m "feat: initial memory game commit"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect your local repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
4. Log into [Vercel](https://vercel.com) and click **"Add New"** > **"Project"**.
5. Import your new GitHub repository, keep default configuration settings, and click **"Deploy"**.

### Method B: Deploy via Vercel CLI
If you prefer deploying directly from your terminal:
1. Run the Vercel initialization utility:
   ```bash
   npx vercel
   ```
2. Log in if prompted, then follow the command prompts to configure and publish:
   - *Set up and deploy?* **Yes**
   - *Which scope?* (Select your personal account)
   - *Link to existing project?* **No**
   - *What's your project's name?* `mind-matcher-game`
   - *In which directory is your code located?* `./`
   - *Want to modify settings?* **No** (Vercel automatically detects Next.js configurations).
3. After a brief build check, Vercel will output a live deployment URL! To promote it to production, run:
   ```bash
   npx vercel --prod
   ```

---

## 📖 Edge Cases Handled

- **Rapid Clicking Lock**: Clicking a third card while a mismatch is flipping back is ignored.
- **Double Clicking**: Clicking the same card twice does nothing and does not double-count moves.
- **Solved Card Ignores**: Clicking already matched cards does not trigger updates.
- **First Flip Timer**: Timer starts strictly on the first card clicked, rather than page load.
- **Timer Stoppage**: Timer stops instantly on the final match, retaining the player's exact score.
