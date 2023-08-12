'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from './api/api';
import Cards from './components/Cards';
import { HeaderMiddleTry } from './components/Navbars';
import Layout from '@/components/layout';

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Update loading state regardless of success or error
      }
    }

    getPosts();
  }, []);

  return (

    <Layout title='Dashboard'>
      <div className="p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Cards posts={posts} />
          </div>
        )}
      </div>
    </Layout>
  );
}
