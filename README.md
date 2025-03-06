# GitHub Kanban Board

A React-based application that displays GitHub repository issues in a Kanban board format with drag-and-drop functionality.

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

- **React 18** with Hooks (no class components)
- **TypeScript** for static typing
- **Ant Design** as the UI library
- **Zustand** for state management
- **React Testing Library** for unit testing
- **react-dnd** for drag-and-drop functionality
- **axios** for API requests
- **ESLint** and **Prettier** for code quality and formatting

## Project Structure
