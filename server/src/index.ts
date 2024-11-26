import express, { Express } from "express"
import route from "./route/route"
import cors from "cors"
import bodyParser from "body-parser"
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
  };

app.use(express.json())
app.use(cors(corsOptions))
app.use("/", route)



app.listen(3000)