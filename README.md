# TaskNote 📝

TaskNote is a modern, lightweight web application designed to help users efficiently manage **tasks** and **notes** in a structured and intuitive way. It provides a flexible organization system using **folders** and **projects**, making it ideal for personal productivity, study planning, or small project tracking.

---

## ✨ Features

- **Local Storage Persistence**

  - All folders, projects, tasks, and notes are saved using the browser’s `localStorage`
  - Data persists across page reloads without requiring a backend

- **Task & Note Management**

  - Create, update, and delete tasks and notes
  - Keep information clean, minimal, and easy to access

- **Folder-Based Organization**

  - Create folders to group related content
  - Each folder can contain projects, tasks, and notes

- **Project Structuring**

  - Projects can be created inside a specific folder **or exist independently (free projects)**
  - Each project can include its own tasks and notes
  - Enables flexible organization without forcing a strict hierarchy

- **Flexible Task & Note Relationships**

  - Tasks and notes can be:

    - Linked to a specific **project**
    - Linked directly to a **folder**
    - Created as **free items** without any parent

  - This flexibility allows users to organize content based on their workflow and preferences

---

## 🛠 Tech Stack

- **Frontend Framework:** React.js
- **Language:** TypeScript
- **Styling:** CSS, TailwindCSS
- **Routing:** React Router DOM
- **Charts & Visualization:** Recharts
- **Icons:** React Icons
- **Utilities:** nanoid

---

## 📂 Application Structure

- **Folders**

  - Can contain projects, tasks, and notes

- **Projects**

  - Belong to a specific folder
  - Can include related tasks and notes

- **Tasks & Notes**

  - Can exist independently or be linked to a project

This hierarchical structure helps keep data organized and easy to manage as complexity grows.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mahmoud46/TaskNote-Advanced-Todo.git

# Navigate to the project directory
cd TaskNote-Advanced-Todo

# Install dependencies
npm install
```

### Run the App

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

**TaskNote** – Simple, structured, and efficient task & note management.
