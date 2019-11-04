import express from 'express';
import dotenv from 'dotenv';
import v1userRoute from './routes/user';

dotenv.config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./ui'));


app.use('/api/v1/auth', v1userRoute);


app.get('/', (req, res) => res.send('Server Is On'));
app.use((req, res) => {
  res.status(400).send({
    status: 400,
    error: 'Bad Request',
  });
});
if (!module.parent) {
  app.listen(process.env.PORT || 8080);
}


export default app;
