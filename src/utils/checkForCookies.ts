'use server'

import { cookies } from 'next/headers';

export async function checkForCookies() {
    const vistaCookie = cookies().get('vista')
    if (vistaCookie) return true;
    return false;
}
