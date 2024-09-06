import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const URL = process.env.mongoURL;



app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'https://hello-4-53n6.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/signup', userRoutes);

mongoose.connect(URL)
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err);
})