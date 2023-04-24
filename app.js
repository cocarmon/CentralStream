const express = require('express');
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const path = require('path');

const socket = require('./utils/socketUtils');
const globalErrorHandler = require('./controllers/errorController');

require('dotenv').config();
// Routers
const streamRouter = require('./routes/streamRoute');
const authRouter = require('./routes/authRoute');
// const analyticsRouter = require('./routes/analyticsRoute');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.APP_URl || 'http://localhost:3000' }));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
  });
});

app.use('/api/streams', streamRouter);
app.use('/api/auth', authRouter);
// app.use('/api/analytics', analyticsRouter);

// Sends static file request to the client
app.use(express.static(path.resolve(__dirname, './client/build')));

// Any unrecognized route it returns the index.html
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(globalErrorHandler);

// Need http server for websockets
// Passes in express instance
const server = http.createServer(app);

// Instantiate web socket
socket(server);
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
