 # Taskboard

## Project description
Taskboard is a Kanban-style task management application built with React and TypeScript. It is my final project in the JavaScript course I'm studying. 
Users can create tasks, change their status and organize them into three columns to do, in progress and done. 

## Live demo
Try the deployed application here: [Taskboard](https://taskboard-yh.netlify.app/)

## Technologies

- React
- TypeScript
- JavaScript
- HTML and CSS
- Node.js
- Express
- Fetch API
- JSON for data storage
- Netlify
- Render

## Features
- View tasks in a Kanban board.
- Create tasks with a title, description and status.
- Change the status of tasks.
- Delete tasks.
- Display loading and error messages.
- Save and get tasks through the backend API.

## Project structure

```text
taskboard/
├── backend/
│   ├── data/
│   │   └── tasks.json
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── requests.http
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── TaskCard.tsx
    │   ├── assets/
    │   ├── types/
    │   │   └── types.ts
    │   ├── utils/
    │   │   ├── taskUtils.test.ts
    │   │   └── taskUtils.ts
    │   ├── api.ts
    │   ├── App.css
    │   ├── App.tsx
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

## Component structure

App
 ├── create task form
 └── Kanban board
        ├──To do
        │   └── TaskCard
        ├── In progress
        │   └── TaskCard
        ├── Done
            └── TaskCard

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

The backend runs at:
`http://localhost:3000`.

## 2. Configure frontend
Create a .env file in the frontend directory and add the backend URL: 

```env
VITE_API_URL=http://localhost:3000
```

For the deployed application VITE_API_URL is configured in Netlify's environment variables to point to the deployed backend. 

### 3. Start frontend

Open a second terminal from the `taskboard` folder:

```bash
cd frontend
npm install
npm run dev
```
Open the URL displayed by VITe in your terminal.

## Tests 

There are three Jest tests. The tests check that an empty title returns false, a title with text returns true and a title only containing spaces returns false. Run the tests from the frontend directory:

```bash
npm test
```

All three tests pass. 
Production build can be checked with:

```bash
npm run build
```


## Deployment

- Frontend: Netlify
- Backend: Render

The deployed frontend communicates with the backend through REST API. 


## Limitations and future improvements
The application stores tasks in a JSON file instead of a database. The backend runs on Render´s free service without a Persistent disk. This means that changes saved to the JSON file are not guaranteed to remain after a restart. 
If I continue developing the application I  would like to use a database to store the tasks. 
