import { NextResponse, NextRequest} from "next/server";

// sets the cookie when visiting the homepage

export async function middleware (req: NextRequest){
    if (req.cookies.has('vista')) return;

    const response = NextResponse.next();
    response.cookies.set('vista', 'visualizer');
    return response;
}

export const config = {
    matcher: '/aldkjf'
};