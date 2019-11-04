import express from 'express';
import dotenv from 'dotenv';
import v1userRoute from './routes/v1/user';
import v1entryRoute from './routes/v1/entry';
import v2usersRoute from './routes/v2/user';
import v2entryRoute from './routes/v2/entry';

dotenv.config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./ui'));


app.use('/api/v1/auth', v1userRoute);
app.use('/api/v1', v1entryRoute);

app.use('/api/v2/auth', v2usersRoute);
app.use('/api/v2', v2entryRoute);
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
