import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// added these console logs to make sure that we're processing the enf
console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)




// resource: https://www.youtube.com/watch?v=A5ZN--P9vXM&pp=ygUObmV4dGF1dGggb2F1dGg%3D
const handler = NextAuth({

    // providers array allows nextauth to handle oauth; just need ot import the providers
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // }),
        GoogleProvider({
            clientId: "5354437150-3nrov3m1foon5jpb4t4let2uu9anf4ep.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    // unsure of why we need this currently.
    secret: process.env.JWT_SECRET

    
})

export {handler as GET, handler as POST}