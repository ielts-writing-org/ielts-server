import { validator } from 'hono-openapi';
import { chatRequestSchema } from './chat-client.port';

export const validateTask2ChatRequest = validator('json', chatRequestSchema);
