import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import { prisma } from "../../lib/prisma";
import z from "zod";

interface PollOption {
  id: string;
  title: string;
  votes: number;
}

interface InitialResultsMessage {
  type: 'initialResults';
  results: PollOption[];
}

interface UpdateMessage {
  type: 'update';
  pollOptionId: string;
  votes: number;
}

export async function pollResults(app: FastifyInstance) {
  app.get<{ Params: { pollId: string } }>('/polls/:pollId/results', { websocket: true }, async (connection, request) => {
    const socket = connection;
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(request.params);

    // Search for the poll and its options with vote count
    const pollData = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          include: {
            votes: true, // add votes
          },
        },
      },
    });

    // Create an object to send with the option title and number of votes
    const results: PollOption[] = pollData?.options.map(option => ({
      id: option.id,
      title: option.title,
      votes: option.votes.length, // count the number of votes
    })) || [];

    // Sends initial results to the client
    const initialMessage: InitialResultsMessage = { type: 'initialResults', results };
    socket.send(JSON.stringify(initialMessage));

    // Subscription for real-time updates
    voting.subscribe(pollId, (message) => {
      const updateMessage: UpdateMessage = { type: 'update', pollOptionId: message.pollOptionId, votes: message.votes };
      socket.send(JSON.stringify(updateMessage));
    });
  });
}
