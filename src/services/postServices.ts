import type { Post } from '../types';
import { dbService } from '../services/databaseService';

export async function getPosts(): Promise<Post[]> {
  return dbService.getPosts();
}

export async function getPostById(id: string): Promise<Post | null> {
  return dbService.getPostById(Number(id)) || null;
}

export async function createPost(formData: FormData): Promise<Post> {
  const title = formData.get('title') as string;
  const caption = formData.get('caption') as string;
  const imageFile = formData.get('image') as File;

  // In a real app, you would upload the image to a storage service
  // and get a URL back. For now, we'll just use a placeholder URL.
  const imageUrl = 'https://via.placeholder.com/300';

  // Assuming we have a current user with ID 1 for this example
  const authorId = 1;

  return dbService.createPost({ title, imageUrl, caption, authorId });
}