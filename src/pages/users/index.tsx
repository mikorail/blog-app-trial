import Layout from "@/components/layout";
import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser, searchUsers } from '../api/api';
import Tables from "../components/Tables";
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Container,Input,Button } from '@mantine/core';
import CreateUserForm from "../components/CreateUser";

interface User {
  id: number;
  name: string;
  email: string;
  gender:string;
  status: string;
}

export default function Users() {
const isMobile = useMediaQuery('(max-width: 767px)');
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function getUsers() {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser({ name, email, gender, status });
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (userId: number, newName: string, newEmail: string) => {
    try {
      await updateUser(userId, { name: newName, email: newEmail });
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, name: newName, email: newEmail } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleDeleteUser = async (userId: number) => {
    console.log("aaa")
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchUsers = async () => {
    try {
      const results = await searchUsers(searchTerm);
      setUsers(results); // Update the users state with search results
      setSearchResults([]); // Clear the search results state
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Layout title="Users Management Menu">
    <Container>
    <div className={`p-4 flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} section-user`}>
      <div className={`w-full lg:w-${isMobile ? 'full' : '1/3'} pr-4`}>
        <h2>All Users</h2>
        <div className="mb-4 flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search term"
            value={searchTerm}
            width={20}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-1 w-1/3 dark:bg-gray-700 text-white"
          />
          <Button
            onClick={handleSearchUsers}
            className="bg-blue-500 text-black px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
          >
            Search
          </Button>
        </div>
  
        <Tables users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
      </div>
  
      <div className={`w-full lg:w-${isMobile ? 'full' : '2/3'} pr-4`}>
        <CreateUserForm onUserCreate={(user) => {}} />
      </div>
    </div>
  </Container>
  </Layout>
  );
}
