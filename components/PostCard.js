// components/PostCard.js
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const PostCard = ({ post }) => {
  return (
    <div className={styles['post-card']}>
      <h2>
        <Link href={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
};
export default PostCard;