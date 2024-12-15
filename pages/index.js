// pages/index.js
import prisma from '../lib/prisma';
import { connection } from 'next/server'
import { useState } from 'react';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import PostCard from '../components/PostCard';
export default function Home({ posts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allPosts, setAllPosts] = useState(posts);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = { title, content };

    const res = await fetch('/api/createPost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      const createdPost = await res.json();
      setAllPosts([createdPost, ...allPosts]);
      setTitle('');
      setContent('');
    }
  };
  
  const handleSearch = (query) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className={styles['home-container']}>
      <h1>Блог</h1>
      <SearchBar onSearch={handleSearch} />
      <form className={styles.createPostForm} onSubmit={handleCreatePost}>
        <h2>Создать новый пост</h2>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.submitButton}>
          Создать
        </button>
      </form>
      <PostList posts={filteredPosts} />
    </div>
  );
}

export async function Component() {
  await connection()
  const value = process.env.NODE_ENV
}

export async function getStaticProps() {
  const posts = await prisma.Post.findMany();
  return {
    props: {
      posts,
    },
  };
}