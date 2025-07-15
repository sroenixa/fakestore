import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    //    matcher: ['/', '/(en|tr)/:path*']
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};