# Database Schema

## Users Collection
- `_id` (ObjectId): Unique identifier for each user.
- `posts` (Array of ObjectId): References Post IDs.
- `liked` (Array of ObjectId): References Like IDs.
- `name` (String): User's full name.
- `username` (String): User's unique username.
- `email` (String): User's email address.
- `bio` (String): Short biography of the user.
- `imageId` (String): ID of the user's profile image.
- `imageUrl` (String): URL of the user's profile image.
- `accountId` (String): Account ID for authentication.

## Saves Collection
- `_id` (ObjectId): Unique identifier for each save.
- `user` (ObjectId): References User ID.
- `post` (ObjectId): References Post ID.

## Posts Collection
- `_id` (ObjectId): Unique identifier for each post.
- `creator` (ObjectId): References Creator ID.
- `likes` (Array of ObjectId): References Like IDs.
- `caption` (String): Caption for the post.
- `tags` (Array of String): Tags related to the post.
- `imageUrl` (String): URL of the post's image.
- `imageId` (String): ID of the post's image.
- `location` (String): Location where the post was created.
