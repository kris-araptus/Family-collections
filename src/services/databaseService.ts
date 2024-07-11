import Database from 'better-sqlite3';
import type { User, Post, Collection } from '../types';

const db = new Database('family_social.db');

// Initialize the database with tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    profilePicture TEXT,
    bio TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    imageUrl TEXT,
    caption TEXT,
    authorId INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS collection_posts (
    collectionId INTEGER,
    postId INTEGER,
    FOREIGN KEY (collectionId) REFERENCES collections(id),
    FOREIGN KEY (postId) REFERENCES posts(id),
    PRIMARY KEY (collectionId, postId)
  );
`);

export const dbService = {
  getUsers: (): User[] => {
    return db.prepare('SELECT * FROM users').all();
  },

  getUserByUsername: (username: string): User | undefined => {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  },

  createUser: (user: Omit<User, 'id'>): User => {
    const { lastInsertRowid } = db.prepare('INSERT INTO users (username, password, profilePicture, bio) VALUES (?, ?, ?, ?)').run(user.username, user.password, user.profilePicture, user.bio);
    return { id: lastInsertRowid, ...user };
  },

  getPosts: (): Post[] => {
    return db.prepare('SELECT posts.*, users.username as authorName FROM posts JOIN users ON posts.authorId = users.id').all();
  },

  getPostById: (id: number): Post | undefined => {
    return db.prepare('SELECT posts.*, users.username as authorName FROM posts JOIN users ON posts.authorId = users.id WHERE posts.id = ?').get(id);
  },

  createPost: (post: Omit<Post, 'id' | 'createdAt'>): Post => {
    const { lastInsertRowid } = db.prepare('INSERT INTO posts (title, imageUrl, caption, authorId) VALUES (?, ?, ?, ?)').run(post.title, post.imageUrl, post.caption, post.authorId);
    return { id: lastInsertRowid, createdAt: new Date().toISOString(), ...post };
  },

  getCollections: (userId: number): Collection[] => {
    return db.prepare('SELECT * FROM collections WHERE userId = ?').all(userId);
  },

  createCollection: (collection: Omit<Collection, 'id'>): Collection => {
    const { lastInsertRowid } = db.prepare('INSERT INTO collections (title, userId) VALUES (?, ?)').run(collection.title, collection.userId);
    return { id: lastInsertRowid, ...collection };
  },

  addPostToCollection: (collectionId: number, postId: number): void => {
    db.prepare('INSERT INTO collection_posts (collectionId, postId) VALUES (?, ?)').run(collectionId, postId);
  },

  getPostsInCollection: (collectionId: number): Post[] => {
    return db.prepare(`
      SELECT posts.*, users.username as authorName 
      FROM posts 
      JOIN users ON posts.authorId = users.id 
      JOIN collection_posts ON posts.id = collection_posts.postId 
      WHERE collection_posts.collectionId = ?
    `).all(collectionId);
  },
};