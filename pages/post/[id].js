// pages/post/[id].js
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import styles from '../../styles/Post.module.css'

export default function Post ({ post })  {
  const router = useRouter();

  const handleBack = () =>{
    router.push('/');
  };
  
  if (router.isFallback) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.postContainer}>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postContent}>{post.content}</p>
      <button onClick={handleBack} className={styles.backButton}>
        Вернуться на главную
      </button>
    </div>
  );  
};

// Функция для получения данных для поста
export async function getStaticPaths() {
  const posts = await prisma.post.findMany({
    select: { id: true }, // Выбираем только ID постов
  });

  const paths = posts.map((post) => ({
    params: { id: post.id }, // ID из базы данных
  }));

  return { paths, fallback: true };
}


export async function getStaticProps({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id }, // Поиск по ID
  });

  if (!post) {
    return { notFound: true }; // Возвращает 404, если пост не найден
  }

  return {
    props: {
      post,
    },
  };
}

