import { Server } from './shared/Server';
import { ExpressServer } from './detachables/ExpressServer';

try {
  // Create a server instance
  const server: Server = new ExpressServer();
  // Handle process terminations
  process.on('SIGINT', async () => {
    await shutdownServer(server);
  });
  process.on('SIGTERM', async () => {
    await shutdownServer(server);
  });
  // Start the server
  server.start();
} catch (error) {
  // Log errors thrown during start
  console.error('Error starting the server: ', (error as Error).message);
  // Terminate process
  process.exit(1);
}

async function shutdownServer(server: Server) {
  try {
    // Close connections to database
    await server.stop();
    // Terminate process
    process.exit(0);
  } catch (error) {
    // Log errors thrown during connections closing
    console.error(
      'Error closing database connections: ',
      (error as Error).message
    );
    // Terminate process
    process.exit(1);
  }
}
