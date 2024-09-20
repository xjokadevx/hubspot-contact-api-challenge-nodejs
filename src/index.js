import dotenv from 'dotenv';
import app from './config/server.js';

dotenv.config();
const { PORT } = process.env;

app.listen(PORT || 3300, () => {
  console.log('ONLINE ', PORT);
});
