import express, { Express } from "express"
import route from "./route/route"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
const app = express()


mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB!);
}

const corsOptions = {
    origin: 'https://movie-tracker-mn2n6ur4d-brdorads-projects.vercel.app',
    credentials: true,
    optionSuccessStatus: 200
  };

app.use(express.json())
app.use(cors(corsOptions))
app.use("/", route)



app.listen(3000, () => {console.log("Running")})