import express from 'express';
import router from './routes/items.js';

const app = express();
app.use(express.json());

app.use('/api/items', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});