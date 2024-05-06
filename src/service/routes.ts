import { constrain } from '../utils';

export const GOOGLE_ROUTES = constrain({
    oauth: (params: string) => `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    userinfo: () => 'https://www.googleapis.com/oauth2/v3/userinfo',
    token: () => 'https://www.googleapis.com/oauth2/v4/token',
});
