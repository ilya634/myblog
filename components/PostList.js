// components/PostList.js
import PostCard from './PostCard';
import styles from '../styles/Home.module.css';

const PostList = ({ posts }) => {
  return (
    <div className={styles['post-list']}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
