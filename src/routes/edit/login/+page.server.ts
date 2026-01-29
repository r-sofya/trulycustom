import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PB_ADMIN_PASSWORD } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('admin_auth');
    if (token === 'authenticated') {
        throw redirect(302, '/edit/projects');
    }
    return {};
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const password = formData.get('password') as string;

        if (password === PB_ADMIN_PASSWORD) {
            cookies.set('admin_auth', 'authenticated', {
                path: '/',
                httpOnly: true,
                secure: import.meta.env.PROD,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            throw redirect(302, '/edit/projects');
        }

        return fail(401, { error: 'Invalid password' });
    }
};
