import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = '';
let scoreInstance = null;

socket.on('response', (data) => {
  console.log(data);
});

socket.on('newHighScore', (data) => {
  console.log(`highScore: ${data.uuid}, score: ${data.score}`);
  if (scoreInstance && data.score) {
    scoreInstance.setHighScore(data.score);
  }
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

const setScoreInstance = (instance) => {
  scoreInstance = instance;
};

export { sendEvent, setScoreInstance };
