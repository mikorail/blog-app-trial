import Layout from "@/components/layout";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Text, Loader, Notification, Paper, Divider, Container } from '@mantine/core';
// import { CommentIcon } from '@tabler/icons';
import { fetchPostById, fetchCommentsByPostId } from '../api/api';
// import { Comment, Post } from '../types'; // Make sure to import the proper types


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

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        try {
          const fetchedPost = await fetchPostById(Number(id));
          setPost(fetchedPost);
        } catch (error) {
          setError('Error fetching post');
        }
      };

      const fetchCommentsData = async () => {
        try {
          const fetchedComments = await fetchCommentsByPostId(Number(id));
          setComments(fetchedComments);
        } catch (error) {
          setError('Error fetching comments');
        } finally {
          setLoading(false);
        }
      };

      fetchPostData();
      fetchCommentsData();
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Notification color="red" title="Error">
          {error}
        </Notification>
      </Container>
    );
  }

  return (
    <Layout title={post ? post.title : 'Post not found'}>
    <Container>
      {post ? (
        <Paper shadow="xs" p="md" className="mb-4">
          <Text size="xl" weight={700}>
            {post.title}
          </Text>
          <Text size="sm" color="gray" className="mb-2">
            User ID: {post.user_id}
          </Text>
          <Divider />
          <Text className="mt-3">{post.body}</Text>
        </Paper>
      ) : (
        <Text size="xl" weight={700} mt="lg">
          Post not found
        </Text>
      )}
  
      {comments?.length > 0 ? (
        <div className="mt-4">
          <Text size="lg" weight={500} mt="lg">
            Comments:
          </Text>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="my-4">
                <div className="flex items-start">
                  {/* <CommentIcon size={24} className="mr-2 mt-1" /> */}
                  <div>
                    <Text size="sm" weight={500}>
                      {comment.name} - {comment.email}
                    </Text>
                    <Text>{comment.body}</Text>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Text size="lg" mt="lg">
          No comments available.
        </Text>
      )}
    </Container>
  </Layout>
  
  );
}
