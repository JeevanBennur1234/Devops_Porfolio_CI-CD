# DevOps Engineer Portfolio

A modern, responsive, and fully customizable personal portfolio website tailored for DevOps Engineers and Cloud Professionals. Built with React (Vite), Tailwind CSS, and Framer Motion.

## Features

- 🌓 **Dark/Light Mode**: First-class support for theming with automatic system preference detection.
- 📱 **Mobile-First Design**: Fully responsive layout that looks great on all devices.
- ✨ **Smooth Animations**: Engaging enter/scroll animations powered by Framer Motion.
- 🧩 **Component-Based**: Clean and modular architecture making it easy to extend.
- 📄 **Data-Driven**: All portfolio content (skills, projects, experience) is centralized in `src/data/content.js` for easy updates without touching UI code.
- ✉️ **Contact Form**: Pre-configured structure ready for integration with Formspree or EmailJS.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Contact Form (Optional but recommended)**
   To make the contact form functional, you'll need a backend service to send emails. [Formspree](https://formspree.io/) is recommended for its simplicity.
   - Create a Formspree account and a new form.
   - Create a `.env` file in the root of the project:
     ```env
     VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_endpoint_id
     ```

3. **Update Your Content**
   Open `src/data/content.js` and replace the placeholder data with your actual skills, projects, experience, and contact links.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```
   The optimized production build will be output to the `dist` folder.

## Project Structure

- `src/components/layout/`: Navigation bar, Footer, and structural components.
- `src/components/sections/`: Individual page sections (Hero, About, Projects, etc.).
- `src/data/content.js`: The central store for all your portfolio text data.
- `src/hooks/useTheme.jsx`: Custom hook managing dark/light mode logic.
- `tailwind.config.js`: Custom theme configuration (colors, fonts).

## Tech Stack

- **Framework**: React.js via Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Scrolling**: react-scroll
