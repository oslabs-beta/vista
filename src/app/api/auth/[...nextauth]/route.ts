import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from '../../../../utils/database';
const bcrypt = require('bcrypt');

// resource: https://www.youtube.com/watch?v=A5ZN--P9vXM&pp=ygUObmV4dGF1dGggb2F1dGg%3D
const handler = NextAuth({

    // providers array allows nextauth to handle oauth; just need ot import the providers
    providers: [
        CredentialsProvider({
            // name to display on the sign-in form (e.g. 'Sign in with... )
            name: "Credentials",
            // 'credentials' is used to generate a form on the sign-in page
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // authorize is used to query db with provided credentials & authenticate user
            async authorize(credentials, req) {
                try{
                    // look up user
                    const query: string = 'SELECT * FROM users WHERE username=$1;'
                    const user: any = await db.query(query, [credentials?.username]); // TODO: type
                    // throw error if user does not exist in db
                    if(!user.rows[0]) {
                        throw new Error('username/password is incorrect');
                    }
                    // compare provided password to hash stored in db
                    const match = await bcrypt.compare(credentials?.password, user.rows[0].password);
                    if(match) {
                        // any object returned will be saved in user property of JWT 
                        return user;
                    } else {
                        // returning null results in an error being displayed that advises user to check their details
                        return null;
                    }    
                } catch(error) {
                    console.log('error with credential authentication: ', error);
                }
    
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

    ],
    // unsure of why we need this currently.
    secret: process.env.JWT_SECRET

    
})

export {handler as GET, handler as POST}