const bcrypt = require('bcrypt');
import { db } from '../../utils/database';


export type userData = {
    username: string,
    password: string,
}


// handle user login requests 
export async function POST(request: Request) {
    try {
        // get username & password
        const body: userData = await request.json();
        const { username, password } = body; // TODO: sanitize data

        // search for user in db
        const queryStr: string = 'SELECT * FROM users WHERE username=$1;';
        const user: any = await db.query(queryStr, [username]); // TODO: type

        // throw error if user does not exist in db
        if(!user.rows[0]) {
            throw new Error('username/password is incorrect');
        }

        // compare password to hash & handle accordingly
        const match = await bcrypt.compare(password, user.rows[0].password);

        if(match) {
            console.log('password matched, login succsesful');
            // TODO: add cookie & session
            
            return Response.redirect('http://localhost:3000/', 302); // TODO: use relative filepath, also status is being sent as 200
        } else {
            console.log('error with matching password');
            throw new Error('incorrect username/password')
        }

    } catch(error: any) { // TODO: type

        // TODO: configure global error handler
        console.log('error with user login in api/users GET handler');
        return new Response(error.message);
    }

}