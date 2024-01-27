import { ChatWorkerHandler, ChatModule } from "@mlc-ai/web-llm";

// Hookup a chat module to a worker handler
const chat = new ChatModule();
const handler = new ChatWorkerHandler(chat);

// eslint-disable-next-line no-restricted-globals
self.onmessage = (msg) => {
  handler.onmessage(msg);
};
