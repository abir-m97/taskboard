 # Taskboard

## Project description
Taskboard is a Kanban-style task management application built with React and TypeScript. It is my final project in the JavaScript course I'm studying. 
Users can create tasks, change their status and organize them into three columns to do, in progress and done. 

## Technologies

- React
- TypeScript
- JavaScript
- HTML and CSS
- Node.js
- Express
- Fetch API
- Json for data storage

## Features
- View tasks in a Kanban board.
- Create tasks with a title, description and status.
- Change the status of tasks.
- Delete tasks.
- Display loading and error messages.
- Save tasks through the backend.

## Project structure

```text
taskboard/
├── backend/
│   ├── data/
│   │   └── tasks.json
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── TaskCard.tsx
    │   ├──assets/
    │   ├── types/
    │   │   └── types.ts
    │   ├── hooks/
    │   ├── services/
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx
    ├── .gitignore
    ├── .oxlintrc.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── README.md

    
    
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task's status |
| DELETE | `/tasks/:id` | Delete a task |

## Getting started

### Prerequisites

- Node.js
- npm

### 1. Start the backend

Open a terminal in the project folder and run:

```bash
cd backend
npm install
node server.js
```

The backend runs on `http://localhost:3000`.

### 2. frontend

Open a second terminal from the `taskboard` folder:

```bash
cd frontend
npm install
npm run dev
```

## Tests & Deployment

Tests deployment have not been added yet.

## Known issues+ future improvements

- Add unit tests.
- Deploy.
- Improve the application further.
