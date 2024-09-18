import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get<{ Params: { pollId: string } }>('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const socket = connection;
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
  
    const { pollId } = getPollParams.parse(request.params)

   voting.subscribe(pollId, (message) => {
    socket.send(JSON.stringify(message));
   })
  });
}
