# GitHub Kanban Board

A React-based application that displays GitHub repository issues in a Kanban board format with drag-and-drop functionality.

### DEMO

[Live Preview](https://github-kanban-board-three.vercel.app/)

## Features

- Input field to enter GitHub repository URL (e.g., `https://github.com/facebook/react`)
- Loads issues using the GitHub API
- Three columns:
  - **ToDo**: All new (unassigned, open) issues
  - **In Progress**: Open issues with an assignee
  - **Done**: Closed issues
- Drag-and-drop functionality to:
  - Move issues between columns
  - Reorder issues within columns
- Persists issue positions between searches and browser sessions using localStorage
- Links to repository owner's profile and repository page
- Type-safe implementation with TypeScript

## Technologies Used

- **React 18**
- **TypeScript**
- **Ant Design**
- **Zustand**
- **React Testing Library**
- **react-dnd**
- **axios**
- **ESLint** and **Prettier**

## Getting Started

Follow these steps to set up the project locally

1.  **Clone the repo**

    ```bash
    git clone [https://github.com/sa4ok-1/Github-Kanban-Board.git]

    cd MultiClaster

    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run the project locally**
    ```bash
    npm start
    ```
