# Task Management 

## 📌 Project Structure
```
task_management /
│── controller/
│   ├── task.controller.js
│   └── user.controller.js

│── db/
│   └── connection.js

│── middleware/
│   └── auth.js

│── model/
│   ├── task.model.js
│   └── user.model.js

│── route/
│   ├── task.route.js
│   └── user.route.js

│── node_modules/
│── app.js
│── .env
│── package.json
│── package-lock.json
```


### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Setup Environment Variables (.env)
```
DB_NAME = "task_management"
DB_HOST = "localhost"
DB_PASS = "task123"
DB_USER = "root"
JWT_SECRET = "key"

```

### 4️⃣ Start the Server
```
npm start
```

## 🚀 API Endpoints

# 🧑 User APIs

### Register User  
**POST** `/user/register`
```json
{
  "name": "demo",
  "email": "demo@test.com",
  "password": "123456"
}
```

### Login User  
**POST** `/user/login`
```json
{
  "email": "demo@test.com",
  "password": "123456"
}
```

# ✅ Task APIs

### Create Task  
**POST** `/task/create/task`
```json
{
  "title": "Complete project",
  "description": "Do task module",
  "status": "pending",
  "priority": "High",
}
```

### Get All Tasks  
**GET** `/task/get-all/task`

### Update Task  
**PUT** `/task/update/task/:id`
```json
{
  "status": "completed"
}
```

### Delete Task  
**DELETE** `/task/delete/task/:id`

## 🛠️ Tech Stack
- Node.js  
- Express.js  
- MySQL  
- JWT Auth  
