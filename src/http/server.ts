import fastify from 'fastify';
import { createPoll } from './routes/create-poll'
import { getPollById } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';

const app = fastify()

app.register(createPoll)
app.register(getPollById)
app.register(voteOnPoll)

 app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
})