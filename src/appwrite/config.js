/* eslint-disable no-useless-catch */

import confi from "../conf/confi";
import {Client, Databases, ID, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(confi.appwriteUrl)
            .setProject(confi.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId,
                }
                
            )
        } catch (error) {
            throw error;
            
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status,
                }

            )
        } catch (error) {
            throw error;
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug

            )
            return true;
        } catch (error) {
            throw error;
// This line is unreachable due to the throw statement above
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
            
        }
    }
    
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;

        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId){
        if (!fileId) {
            return null;
        }
        
        return this.bucket.getFileView(
            confi.appwriteBucketId,
            fileId
        );
    }

}

const service = new Service();

export default service;