import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AppwriteAuth{
    client=new Client();
    account;

    constructor(){
        this.client.setProject(conf.appwrite_project_id).setEndpoint(conf.appwrite_url);
        this.account=new Account(this.client)
    }

    async addUser({email,password,username}){
        try {
            const user=await this.account.create({userId:ID.unique(),email,password,name:username,})

            if(user){
                return await this.loginUser({email,password})
            }else{
                return user
            }
            
        } catch (error) {
            console.log("Appwrite User signup failed..!",error)
        }
    }
    async loginUser({email,password}){
        try{
            const loginUser=await this.account.createEmailPasswordSession({email,password})
            return loginUser
        }catch(error){
            console.log("Appwrite error loging in..!",error)
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            if(error.code===401){
                console.log("Appwrite cant access the correct user..!", error)
            return null
        }
            
        }
    }
    async logoutUser(){
        try{
            const result = await this.account.deleteSessions();
            return result
        }catch(error){
            console.log("lAppwrite ogout failed..!",error)
        }
    }

}

const appwriteAuth=new AppwriteAuth();

export default appwriteAuth 