
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const adminEmails = ['jsmith@gmail.com'];

export const authOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: (credentials) => {
        // Add logic here to look up the user from the credentials supplied
  
        if (credentials.email === "jsmith@gmail.com" && credentials.password ==="123") {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id:2,
            name:"jsmith",
            email:"jsmith@gmail.com",
            image:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2a4ae1d-f0a6-4df1-90f2-d90ed54bbc19/dg2go53-adb38c8d-a597-4ba7-8b0f-4e78267fbf46.png/v1/fill/w_816,h_979/cool_sunglasses_kitty_hip_avatar_trendy_animal_cat_by_sytacdesign_dg2go53-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyYTRhZTFkLWYwYTYtNGRmMS05MGYyLWQ5MGVkNTRiYmMxOVwvZGcyZ281My1hZGIzOGM4ZC1hNTk3LTRiYTctOGIwZi00ZTc4MjY3ZmJmNDYucG5nIiwiaGVpZ2h0IjoiPD0yMzA0Iiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYzJhNGFlMWQtZjBhNi00ZGYxLTkwZjItZDkwZWQ1NGJiYzE5XC9zeXRhY2Rlc2lnbi00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.XkdLgzRdmAkpCmWQITytCNZL_UAMhfCOZY9kliieFkE",
          }
        } 
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        
      }
    })

 
  ],
  // adapter: MongoDBAdapter(clientPromise),


callbacks:{
  jwt:({token,user})=>{
    if(user){
      token.id = user.id
    }
    return token;
  },

  session: ({session, token}) => {
    if(token){
       session.id = token.id;
    }
    
    return session;
    },
  },
  secret:"test",
  jwt:{
    secret:"test",
    encryption:true,
  }
});


export default NextAuth(authOptions); 

export async function isAdminRequest(req,res){
  const session = await getServerSession(req,res,authOptions);
  // if(!adminEmails.includes(session?.user?.email)){
  //   res.status(40);
  //   throw new Error('not an admin');
  // }
}