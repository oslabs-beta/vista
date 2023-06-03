// import DB connection
import { db } from '../../../utils/database';


export async function POST(request: Request) {
    
    try {
        // const { username, password } = request.body;     // note from nestor: i don't think you can use request.body in nextjs13 anymore...https://www.youtube.com/watch?v=vrR4MlB7nBI potential solution: const body = await req.json()
        const body = await request.json()
        console.log(body)
        
        const queryStr = 'INSERT INTO users (username, password) VALUES ($1, $2);';

        const newUser: any = await db.query(queryStr, ['test', 'test']);

        console.log('this is the newUser -> ', newUser);

        return new Response(newUser);
        
    } catch(error) {
        console.log(error)
    }

}