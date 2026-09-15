
import {
  Client,
  ID,
  Storage,
  Databases,
  Query,
  Permission,
  Role
} from "appwrite";

import conf from "../conf/conf";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // =========================
  // DATABASE
  // =========================

  async createNewDocument({
    title,
    slug,
    content,
    featuredImage,
    status,
    userid
  }) {
    try {
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
        }
      });
    } catch (error) {
      console.error("createNewDocument:", error);
      return false;
    }
  }

  async updateDocument(
    slug,
    {
      title,
      content,
      featuredImage,
      status,
      userid
    }
  ) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userid
        }
      });
    } catch (error) {
      console.error("updateDocument:", error);
      return false;
    }
  }

  async DeleteDocument({ slug }) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        documentId: slug
      });

      return true;
    } catch (error) {
      console.error("DeleteDocument:", error);
      return false;
    }
  }

  async getDocument({ slug }) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        documentId: slug
      });
    } catch (error) {
      console.error("getDocument:", error);
      return false;
    }
  }

  async getAllDocument({ status = "active" } = {}) {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwrite_database_id,
        collectionId: conf.appwrite_collection_id,
        queries: [
          Query.equal("status", status)
        ]
      });
    } catch (error) {
      console.error("getAllDocument:", error);
      return false;
    }
  }

  // =========================
  // STORAGE
  // =========================

  async fileUploadService(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwrite_bucket_id,
        fileId: ID.unique(),
        file,
        permissions: [
          Permission.read(Role.any())
        ]
      });
    } catch (error) {
      console.error("fileUploadService:", error);
      return false;
    }
  }

  async fileDeleteService(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwrite_bucket_id,
        fileId
      });

      return true;
    } catch (error) {
      console.error("fileDeleteService:", error);
      return false;
    }
  }

  // Get the original file without image transformations
  getFileView(fileId) {
    return this.storage.getFileView({
      bucketId: conf.appwrite_bucket_id,
      fileId
    });
  }
}

const appwriteService = new Service();

export default appwriteService;
