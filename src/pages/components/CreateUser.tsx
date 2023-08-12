import React, { useState } from 'react';
import { Input, Button, Paper, Text, Radio,Flex } from '@mantine/core';
import {createUser} from '../api/api';


interface CreateUserFormProps {
  onUserCreate: (user: User) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

function CreateUserForm({ onUserCreate }: CreateUserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male'); // Default to 'Male'
  const [status, setStatus] = useState('Active'); // Can be 'Active' or 'Inactive'

  const handleCreateUser = async () => {
    try {
      if (!name || !email) {
        return; // Prevent creating user with empty name or email
      }
  
      const newUser = await createUser({ name, email, gender, status });
      onUserCreate(newUser);
  
      // Clear form fields after user creation
      setName('');
      setEmail('');
      setGender('Male');
      setStatus('Active');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper p="sm" shadow="xs" radius="md" mt="lg">
      <Text size="lg" weight={700} mb="lg">
        Create User
      </Text>
      <Input
        label="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="Name"
        required
        error={name === '' ? 'Name is required' : ''}
        className="mb-2"
      />
      <Input
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        placeholder="Email"
        required
        type="email"
        error={email === '' ? 'Email is required' : ''}
        className="mb-2"
      />
      <Radio.Group label="Gender" value={gender} onChange={setGender} required>
      <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ sm: 'left' }}
            >
        <Radio label="Male" value="Male" />
        <Radio label="Female" value="Female" />
        </Flex>
      </Radio.Group>
      <Radio.Group
        label="Status"
        value={status}
        onChange={setStatus}
        required
        className="mb-2"
      >
        <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ sm: 'left' }}
            >
        <Radio label="Active" value="Active" />
        <Radio label="Inactive" value="Inactive" />
        </Flex>
      </Radio.Group>
      <Button color="blue" onClick={handleCreateUser}>
        Create
      </Button>
    </Paper>
  );
}

export default CreateUserForm;
