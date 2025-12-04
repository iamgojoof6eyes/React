import config from "../config/config";

import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor () {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({userId, title, content, featuredImage, status, slug}) {
        try {
            return await this.databases.createDocument(
                {
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteCollectionId,
                    documentId: slug,
                    data: {
                        userId,
                        title,
                        content,
                        featuredImage,
                        status
                    }
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                {
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteCollectionId,
                    documentId: slug,
                    data: {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                {
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteCollectionId,
                    documentId: slug
                }
            )
            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                {
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteCollectionId,
                    documentId: slug
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPosts(queries = [Query.equal("status", true)]) {
        try {
            return await this.databases.listDocuments(
                {
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteCollectionId,
                    queries
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                {
                    bucketId: config.appwriteBucketId,
                    fileId: ID.unique(),
                    file
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeFile(fileId) {
        try {
            await this.bucket.deleteFile(
                {
                    bucketId: config.appwriteBucketId,
                    fileId
                }
            )
            return true;
        } catch (error) {
            throw new Error(error);
            
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                {
                    bucketId: config.appwriteBucketId,
                    fileId
                }
            )
        } catch (error) {
            throw new Error(error);
            
        }
    }
}

const service = new Service()

export default service