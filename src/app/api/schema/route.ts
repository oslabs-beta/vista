export async function GET(request:any) {

    console.log('inside api/schema GET route handler')

    return new Response('hello from /api/schem');
}