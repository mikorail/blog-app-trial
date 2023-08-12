// utils/api.ts
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_BASE_URL;
const databaseUrl = process.env.DATABASE_URL;

const API_BASE_URL = 'https://gorest.co.in/public/v2'
const token = '3cb7c1721a12d3d09c33415ce755b4feafd5a82907c380129da02af32f6e4948'

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

interface Comment {
  id: number;
  post_id:number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  gender:string;
  status:string;
}

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId: number): Promise<Post> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching post');
  }
};

// Fetch comments for a post by post ID
export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching comments');
  }
};

// Fetch a user by ID
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

// Create a user
export const createUser = async (userData: { name: string; email: string, gender: string, status:string }): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Update a user by ID
export const updateUser = async (userId: number, userData: { name: string; email: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Error updating user');
  }
};

// Delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Error deleting user');
  }
};


// Search users by name or email
export const searchUsers = async (searchTerm: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
        name: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error searching users');
  }
};
