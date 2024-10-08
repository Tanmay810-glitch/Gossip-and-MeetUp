import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GridPostList from './GridPostList';
import { searchPosts } from '@/lib/appwrite/api';

type SearchResulsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResulsProps) => {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList 
                posts={searchedPosts.documents}
            />
        )
    }   

  return (
    <p className='text-light04 mt-10 text-center w-full'>
        No results found
    </p>
  )
}

export default SearchResults