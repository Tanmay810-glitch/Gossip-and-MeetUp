import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import React from 'react'

type UserCardProps = {
    user: Models.Document;
}
const UserCard = ({ user } : UserCardProps) => {
    
  return (
    <div className='flex w-60 flex-col gap-2 content-center items-center border rounded-lg p-4 border-primary-500'>
      <img src={user.imageUrl} className='rounded-full' width={80} height={80} alt="" />
      <p className='text-lg font-bold'>{user.username}</p>
      <p className='text-light-3'>{user.email}</p>
      <p className='text-sm'>{user.bio}</p>
    </div>
  )
}

export default UserCard