import { Client, ID, Storage, Databases, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setProject(conf.appwrite_project_id).setEndpoint(conf.appwrite_url);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createNewDocument({ title, slug, content, featuredImage, status, userid }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        documentId: slug,
        data: { title, content, featuredImage, status, userid },
      });
    } catch (error) { console.error("createNewDocument", error); return false; }
  }

  async updateDocument(slug, { title, content, featuredImage, status, userid }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        documentId: slug,
        data: { title, content, featuredImage, status, userid },
      });
    } catch (error) { console.error("updateDocument", error); return false; }
  }

  async DeleteDocument({ slug }) {
    try {
      await this.databases.deleteDocument({ databaseId: conf.appwrite_database_id, collectionId: conf.appwrite_collection_id, documentId: slug });
      return true;
    } catch (error) { console.error("DeleteDocument", error); return false; }
  }

  async getDocument({ slug }) {
    try {
      return await this.databases.getDocument({ databaseId: conf.appwrite_database_id, collectionId: conf.appwrite_collection_id, documentId: slug });
    } catch (error) { console.error("getDocument", error); return false; }
  }

  async getAllDocument({ status = "active" } = {}) {
    try {
      return await this.databases.listDocuments({ databaseId: conf.appwrite_database_id, collectionId: conf.appwrite_collection_id, queries: [Query.equal("status", status)] });
    } catch (error) { console.error("getAllDocument", error); return false; }
  }

  async fileUploadService(file) {
    try { return await this.storage.createFile({ bucketId: conf.appwrite_bucket_id, fileId: ID.unique(), file }); }
    catch (error) { console.error("fileUploadService", error); return false; }
  }

  async fileDeleteService(fileId) {
    try { await this.storage.deleteFile({ bucketId: conf.appwrite_bucket_id, fileId }); return true; }
    catch (error) { console.error("fileDeleteService", error); return false; }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({ bucketId: conf.appwrite_bucket_id, fileId });
  }
}

export default new Service();
