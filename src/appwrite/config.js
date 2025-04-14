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

    async deleteost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug

            )
            return true;
        } catch (error) {
            throw error;
            return false;
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
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            throw error;
            return false;

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
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                confi.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error;
            
        }
    }

}

const service = new Service();

export default service;