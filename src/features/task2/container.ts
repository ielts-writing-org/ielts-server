import type { Container } from '@inferdi/inferdi';
import { registerTask2EvaluateContainer } from './evaluate/container';

export function registerTask2Container(c: Container) {
	return c.use(registerTask2EvaluateContainer);
}
