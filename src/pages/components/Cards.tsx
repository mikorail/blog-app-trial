import React from 'react';
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

interface CardsProps {
  posts: Post[];
}

export default function Cards({ posts }: CardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      {posts.map((post) => (
        <Card
          key={post.id}
          shadow="xs" // Adjust the shadow to make the card smaller
          padding="xs" // Adjust the padding to make the card smaller
          radius="sm"
          className="p-4" // Add some padding directly to the Card component
        >
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{post.title}</Text>
            <Badge color="pink" variant="light">
              {post.user_id}
            </Badge>
          </Group>

          <Text size="xs" color="dimmed"> {/* Adjust text size to make it smaller */}
            {post.body}
          </Text>

          <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="light" color="blue" fullWidth mt="md" radius="sm">
              View Post Detail
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
