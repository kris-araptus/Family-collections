import { dbService } from './databaseService';
import type { User, Collection } from '../types';

export async function getUserProfile(username: string): Promise<User | null> {
  return dbService.getUserByUsername(username) || null;
}

export async function getUserCollections(username: string): Promise<Collection[]> {
  const user = dbService.getUserByUsername(username);
  if (user) {
    return dbService.getCollections(user.id);
  }
  return [];
}