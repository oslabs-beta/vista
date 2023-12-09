import { NextResponse, NextRequest} from "next/server";


export async function middleware (req: NextRequest){
    console.log('inside the middleware')
    if (req.cookies.has('vista')) return;

    const response = NextResponse.next();
    response.cookies.set('vista', 'visualizer');
    return response;
}

export const config = {
    matcher: '/'
};