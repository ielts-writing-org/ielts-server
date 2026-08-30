import { task2EvaluateEndpoint } from './evaluate';
import { factory } from '@/shared/app-env';

export const task2Endpoint = factory.createApp();

task2Endpoint.route('/evaluate', task2EvaluateEndpoint);
