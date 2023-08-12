import React, { useState } from 'react';
import { Table, Text, Button, Modal,Radio, Input, Flex,Loader, Notification } from '@mantine/core';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface TablesProps {
  users: User[];
  onUpdateUser: (userId: number, newName: string, newEmail: string) => void;
  onDeleteUser: (userId: number) => void; 
}

function Tables({ users,onUpdateUser,onDeleteUser }: TablesProps) {
  // const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [deleteUserId, setDeleteUserId] = React.useState<number | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: 'red' | 'green';
  } | null>(null);


  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId)
    // setDeleteUserId(userId);
    setIsOpen(true);
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setName(user.name);
    setEmail(user.email);
    setGender(user.gender);
    setStatus(user.status);
    setIsOpenEdit(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteUserId !== null) {
      setLoading(true);
      // deleteUser(deleteUserId);
      try {
        await onDeleteUser(deleteUserId);
        const updatedUsers = users.filter((user) => user.id !== deleteUserId);
        setDeleteUserId(null);
        setNotification({ message: 'User deleted successfully', color: 'green' });
        setIsOpen(false);
        // setUsers(updatedUsers);
      } catch (error) {
        console.error(error);
        setNotification({ message: 'Failed to delete user', color: 'red' });
      }
      setLoading(false);
      // onDeleteUser(deleteUserId);
      close();
    }
  };
  const handleConfirmEdit = async () => {
    if (editUser !== null) {
      setLoading(true);
      try {
        await onUpdateUser(editUser.id, name, email); // Trigger the onUpdateUser function from the parent
        const updatedUsers = users.map((user) =>
          user.id === editUser.id ? { ...user, name, email, gender, status } : user
        );
        setNotification({ message: 'User updated successfully', color: 'green' });

        // Update users state here if needed
        setIsOpenEdit(false);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };
  
  

  return (
    <Table>
      {loading && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <Loader />
        </div>
      )}

      {notification && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <Notification color={notification.color}>{notification.message}</Notification>
        </div>
      )}
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Gender</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.gender}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.status}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <Button
                size="xs"
                color="blue"
                variant="outline"
                onClick={() => handleEditClick(user)}
              >
                Edit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                size="xs"
                color="red"
                variant="outline"
                onClick={() => handleDeleteClick(user.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

      <Modal opened={isOpen} onClose={()=>setIsOpen(false)} title="Confirm Deletion" centered>
        <Text size="xl" weight={700} align="center" mb="lg">
          Are you sure you want to delete this user?
        </Text>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="sm" color="red" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
          &nbsp;&nbsp;&nbsp;
        </div>
      </Modal>

      <Modal opened={isOpenEdit} onClose={() => setIsOpenEdit(false)} centered  size="md" // Set the size to your desired responsive value
      >
        <Text size="xl" weight={700} align="center" mb="lg">
          Are you sure you want to Edit this user?
        </Text>
        <Text size="md" align="center">
          Name
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
          <Text size="md" align="center">
          Email
       </Text>
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
              justify={{ sm: 'center' }}
            >
              <Radio label="Male" value="male" />
              <Radio label="Female" value="female" />
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
              justify={{ sm: 'center' }}
            >
            <Radio label="Active" value="active" />
            <Radio label="Inactive" value="inactive" />
            </Flex>
          </Radio.Group>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button size="sm" color="red" onClick={handleConfirmEdit}>
            Confirm Edit
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button size="sm" onClick={() => setIsOpenEdit(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Table>
  );
}

export default Tables;
