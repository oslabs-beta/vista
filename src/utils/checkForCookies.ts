'use server'

import { cookies } from 'next/headers';

// checking for the cookies
export async function checkForCookies() {
    return cookies().get('vista')
}
