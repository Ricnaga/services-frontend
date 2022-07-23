import { setupWorker } from 'msw';
import { rest_handlers } from './handlers';

export const mockServer = setupWorker(...rest_handlers);
