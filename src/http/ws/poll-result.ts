import { FastifyInstance } from "fastify";

export async function pollResults(app: FastifyInstance) {
//   app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
//     connection.socket.on('message', (message: string) => {
//       connection.socket.send('you sent: ' + message);
//     });
  
//     // Enviar "ping" regularmente para manter a conexão viva
//     const interval = setInterval(() => {
//       if (connection.socket.readyState === connection.socket.OPEN) {
//         connection.socket.ping();
//       }
//     }, 30000); // A cada 30 segundos
  
//     // Limpar intervalo quando a conexão for fechada
//     connection.socket.on('close', () => {
//       clearInterval(interval);
//     });
//   });

app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
  connection.socket.on('message', (message: string) => {
    connection.socket.send('you sent: ' + message);
  });

  connection.socket.on('error', (err: any) => {
    console.error('WebSocket error:', err);
  });

  connection.socket.on('close', (code: any, reason: any) => {
    console.log(`WebSocket closed: ${code}, Reason: ${reason}`);
  });
});  
}