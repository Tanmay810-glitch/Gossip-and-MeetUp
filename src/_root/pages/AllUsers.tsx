import UserCard from '@/components/shared/UserCard';
import { useGetAllUsers } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import React from 'react'

const AllUsers = () => {
  const {
    data: users,
    isPending: isUserLoading,
    isError: isErrorPosts,
  } = useGetAllUsers();

  return (
    <div className='py-10 px-5 md:p-14'>
      {/* {posts?.documents.map((post: Models.Document) => (
          <PostCard post={post} key={post.caption} />
        ))} */}
          {isUserLoading && !users ? (
            <Loader />
          ) : (
            <ul className="flex flex-row flex-1 gap-4">
              {users?.documents.map((user: Models.Document) => (
                <UserCard user={user} key={user.accountId} />
              ))}
            </ul>
          )}
    </div>
  )
}

export default AllUsers