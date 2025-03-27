import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

export { app }