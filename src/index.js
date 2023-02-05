const express = require('express');
require('./db/dbConnect');
require('dotenv').config();
const userRouter = require('./router/user')
const taskRouter = require('./router/course')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));