import { Container } from '@inferdi/inferdi';

export type RootContainer = ReturnType<typeof buildRootContainer>;

export function buildRootContainer() {
	return new Container({ fast: true });
}
