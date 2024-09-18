import { FastifyInstance } from "fastify";

export async function pollResults(app: FastifyInstance) {
  app.get<{ Params: { pollId: string } }>('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const socket = connection;

    socket.on('message', (message: string) => {
      console.log('Message received:', message);

      socket.send('you sent: ' + message);
    });
  
    const interval = setInterval(() => {
      if (socket.readyState === socket.OPEN) {
        socket.send('ping');
      }
    }, 500);
  

    socket.on('close', () => {
      clearInterval(interval);
    });

  });
}
