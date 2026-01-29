import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Protect /edit routes (except login page)
    if (event.url.pathname.startsWith('/edit') && !event.url.pathname.startsWith('/edit/login')) {
        const token = event.cookies.get('admin_auth');

        if (token !== 'authenticated') {
            throw redirect(302, '/edit/login');
        }
    }

    return resolve(event);
};
