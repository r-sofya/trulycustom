import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { createPocketBase } from '$lib/utils/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
    // Initialize PocketBase
    event.locals.pb = createPocketBase();

    // Load auth store from cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Refresh auth state if valid
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            event.locals.user = event.locals.pb.authStore.model;
        }
    } catch (_) {
        // Clear auth state on error
        event.locals.pb.authStore.clear();
        event.locals.user = undefined;
    }

    // Protect /edit routes
    if (event.url.pathname.startsWith('/edit') && !event.url.pathname.startsWith('/edit/login')) {
        if (!event.locals.pb.authStore.isValid) {
            throw redirect(303, '/edit/login');
        }
    }

    const response = await resolve(event);

    // Persist auth state to cookie
    response.headers.append(
        'set-cookie',
        event.locals.pb.authStore.exportToCookie({ httpOnly: true, secure: import.meta.env.PROD })
    );

    return response;
};
