// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';
import './config/cloudinary.js'; // Ensure cloudinary is configured
import userRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This is important for form-data
app.use(cookieParser());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(morgan('dev'));

// Routes
app.use('/api/user', userRouter);

// Test Route
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${process.env.PORT || 8000}` });
});

// Connect to database and start server
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});