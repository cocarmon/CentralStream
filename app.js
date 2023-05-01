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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['self'],
      scriptSrc: [
        '\'self\'',
        'wasm-unsafe-eval',
      ],
      mediaSrc: ['\'self\'', 'blob:'],
      workerSrc: ['\'self\'', 'blob:'],
      connectSrc: ['\'self\'', '*.live-video.net'],
      manifestSrc: ['\'self\''],
    },
  }),
);

const corsOrigin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.PROD_URL;
app.use(cors({ origin: corsOrigin }));

app.use(express.json());

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
