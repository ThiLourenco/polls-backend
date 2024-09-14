import fastify from 'fastify';
import cookie from '@fastify/cookie';
import websocket from '@fastify/websocket';
import { createPoll } from './routes/create-poll'
import { getPollById } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollResults } from './ws/poll-result';

const app = fastify()

app.register(cookie, {
  secret: process.env.SECRET,
  hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPollById)
app.register(voteOnPoll)

app.register(pollResults)

 app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
})