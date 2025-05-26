import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import  blogRoutes from './routes/blogRoutes';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});