import { Client, Account, ID ,Storage,Databases,Query } from "appwrite";
import conf from "../conf/conf";


class Service{

    client=new Client();
    databases
    storage

    constructor(){
        this.client.setProject(conf.appwrite_project_id).setEndpoint(conf.appwrite_url);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }
    async createNewDocument({title,slug,content,featuredImage,status,userid}){
        try{
            return await this.databases.createDocument({
                                        databaseId: conf.appwrite_database_id,
                                        collectionId: conf.appwrite_collection_id,
                                        documentId: slug,
                                        data: {
                                            title,
                                            content,
                                            featuredImage,
                                            status,
                                            userid

                                        },
                                        // permissions: [Permission.read(Role.any())], // optional
                                        // transactionId: '<TRANSACTION_ID>' // optional
                                    });
        }catch(error){
            console.log(error)
        }
    }
    
    async updateDocument(slug,{title,content,featuredImage,status,userid}){
        try{
            return await this.databases.updateDocument({
                                            databaseId: conf.appwrite_database_id,
                                            collectionId: conf.appwrite_collection_id,
                                            documentId:slug,
                                            data: {
                                            title,
                                            content,
                                            featuredImage,
                                            status,
                                            userid

                                        }, // optional
                                            // permissions: [Permission.read(Role.any())], // optional
                                            // transactionId: '<TRANSACTION_ID>' // optional
                                        });
        }catch(error){
            console.log(error)
        }
    }

    async DeleteDocument({slug}){
        try{
             await this.databases.deleteDocument({
                                    databaseId: conf.appwrite_database_id,
                                    collectionId: conf.appwrite_collection_id,
                                    documentId: slug,
                                    // transactionId: '<TRANSACTION_ID>' // optional
                                });
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getDocument({slug}){
        try {
            return await this.databases.getDocument({
                                        databaseId: conf.appwrite_database_id,
                                        collectionId: conf.appwrite_database_id,
                                        documentId: slug,
                                        // queries: [], // optional
                                        // transactionId: '<TRANSACTION_ID>' // optional
                                    });
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async getAllDocument({status="active"}){
        try{
            return await this.databases.listDocuments({
                                            databaseId:conf.appwrite_database_id,
                                            collectionId:conf.appwrite_collection_id,
                                            queries: [Query.equal("status",[status])], // optional
                                            // transactionId: '<TRANSACTION_ID>', // optional
                                            // total: false // optional
                                        });

        }catch(error){
            console.log(error)
            return false
        }
    }

    async fileUploadService(file){
        try{
            return await this.storage.createFile({
                                        bucketId: conf.appwrite_bucket_id,
                                        fileId: ID.unique(),
                                        file:file ,
                                        // permissions: [Permission.read(Role.any())] // optional
                                    });

        }catch(error){
            console.log(error)
            return false
        }
    }
    async fileDeleteService(fileId){
        try{
            await this.storage.deleteFile({
                                        bucketId: conf.appwrite_bucket_id ,
                                        fileId:file
                                    });
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getFilePreview(fileId){
        return await this.storage.getFilePreview({
            bucketId:conf.appwrite_bucket_id,
            fileId:fileId
        })
    }

}

const service=new Service();

export default service

