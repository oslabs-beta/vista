import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // }),
        GoogleProvider({
            clientId: "5354437150-3nrov3m1foon5jpb4t4let2uu9anf4ep.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ],
    secret: process.env.JWT_SECRET

    
})

export {handler as GET, handler as POST}