import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import userLogin from  './routes/userLogin.js';
import postRoute from  './routes/postRoute.js';
import cookieParser from 'cookie-parser'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const URL = process.env.mongoURL;


app.use(cookieParser());
app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173', // Only allow this origin
//   credentials: true,               // Allow credentials (cookies, etc.)
// }));

app.use(cors({
  origin: 'https://hello-4-53n6.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/signup', userRoutes);
app.use('/', userLogin),
app.use("/addpost", postRoute)

mongoose.connect(URL)
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err);
})