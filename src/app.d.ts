declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').AuthModel | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
