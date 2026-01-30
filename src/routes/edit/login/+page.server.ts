import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.pb.authStore.isValid) {
        throw redirect(303, '/edit/projects');
    }
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await locals.pb.collection('users').authWithPassword(email, password);
        } catch (error) {
            console.error('PocketBase auth error:', error);
            const errorMessage = error instanceof ClientResponseError
                ? error.message
                : 'Invalid credentials';
            return fail(400, { error: errorMessage, email });
        }

        throw redirect(303, '/edit/projects');
    }
};
