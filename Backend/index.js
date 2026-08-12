import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectdb } from "./config/connectdb.js"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"

dotenv.config()

const App = express()

App.use(express.json());
App.use(cors());

connectdb();

App.get("/", (req, res) => {
    res.json({ message: "Todo API is running" });
});

App.use("/api/auth", authRoutes)
App.use("/api/tasks", taskRoutes)

const PORT = process.env.PORT || 5050;

App.listen(PORT,()=>{
    console.log(`server running on the port ${PORT}`)
})
