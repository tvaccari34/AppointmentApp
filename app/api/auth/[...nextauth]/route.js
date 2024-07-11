import NextAuth from "next-auth/next";

export const authOptions = {
    providers: [
        {
            id: "descope",
            name: "Descope",
            type: "oauth",
            wellKnown: `https://api.descope.com/${process.env.NEXT_PUBLIC_DESCOPE_CLIENT_ID}/.well-known/openid-configuration`,
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            clientId: process.env.NEXT_PUBLIC_DESCOPE_CLIENT_ID,
            clientSecret: "<Descope Access Key>",
            checks: ["pkce","state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async signIn(user, account, profile) {
            // Your logic here
            return true;
          }
    },
    callbackUrl: "http://localhost:5001/callback"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }