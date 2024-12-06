import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectroutes';
import taskRoutes from './routes/taskroutes';


dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(projectRoutes);
app.use(taskRoutes);


const uri = process.env.URI;
//const uri = "mongodb://root:example@localhost:27017/";
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})