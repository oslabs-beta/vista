// import DB connection
import { db } from '../../utils/database';

// bcrypt
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// cookies
import { cookies } from 'next/headers';


// unused imports
import { redirect } from 'next/dist/server/api-utils';
import { PERMANENT_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';


interface UserData {
    username: string,
    password: string,
}

// add new user to db
export async function POST(request: Request) {
    
    try {
        // get username and password from POST req
        const body: UserData = await request.json(); // TODO: Sanitize Data
        const { username, password } = body;

        // check if user exists, return error if it does
        const checkUser: string = 'SELECT * FROM users WHERE username=$1;';
        const user: any = await db.query(checkUser, [username]); // TODO: type

        if(user.rows[0]) {
            throw new Error('that username is already taken');
        }

        // hash password
        const hashedPass: string = await bcrypt.hash(password, SALT_WORK_FACTOR);

        // create query string & add new user to db
        const queryStr: string = 'INSERT INTO users (username, password) VALUES ($1, $2);';
        const newUser: any = await db.query(queryStr, [username, hashedPass]); // TODO: type
        console.log('this is the newUser -> ', newUser);

        // create new session & add cookie to response
        // TS error seems to be an unresolved issue, but method still works

        return new Response(newUser.json());

    } catch(error: any) { // TODO: type

        // TODO: configure global error handler
        console.log('error with user sign up in api/users POST handler');

        return new Response(error.message);
    
    }

}