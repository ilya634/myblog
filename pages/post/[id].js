// pages/post/[id].js
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import styles from '../../styles/Post.module.css'

const Post = ({ post }) => {
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
  const posts = [
    { id: '1', title: 'Первый пост', body: 'Это тело первого поста' },
    { id: '2', title: 'Второй пост', body: 'Это тело второго поста' },
    { id: '3', title: 'Третий пост', body: 'Это тело третьего поста' },
    { id: '4', title: 'Четвертый пост', body: 'Это тело четвертого поста' },
  ];

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const posts = [
    { id: '1', title: 'Первый пост', body: 'В последние годы безопасность данных стала одной из главных тем в интернете. Одна из мер, которая помогает защитить ваши данные, — это использование SSL-сертификата для вашего сайта. В этой статье мы объясним, что такое SSL и почему его стоит использовать.Что такое SSL? SSL (Secure Sockets Layer) — это протокол, который защищает данные, передаваемые между вашим сайтом и пользователями, с помощью шифрования. Он позволяет избежать перехвата конфиденциальной информации, такой как пароли, номера кредитных карт и другие персональные данные. Почему важен SSL сертификат? 1. Безопасность: он защищает информацию на вашем сайте. 2. SEO: Google учитывает наличие SSL сертификата как фактор ранжирования. Сайт с HTTPS будет иметь преимущество в поисковых системах. 3. Доверие пользователей: наличие зеленого замка рядом с адресом сайта вызывает доверие у пользователей.Если ваш сайт еще не имеет SSL-сертификата, настоятельно рекомендую установить его. Это не только улучшит безопасность, но и поможет в поисковом продвижении.'},
    { id: '2', title: 'Второй пост', body: 'Выбор хостинга — это важный шаг при запуске веб-сайта или проекта. Многие новички сталкиваются с трудностью, не зная, какие параметры хостинга критичны для успешной работы сайта. В этой статье мы рассмотрим основные факторы, на которые стоит обратить внимание при выборе хостинга. 1. Тип хостинга: виртуальный, выделенный или облачный. Для небольших сайтов подходит виртуальный хостинг, а для крупных проектов лучше выбрать выделенный сервер. 2. Скорость и производительность: выберите хостинг, который предлагает оптимальные скорости загрузки и стабильность работы. 3. Поддержка PHP, MySQL и других технологий: убедитесь, что хостинг поддерживает необходимые для вас технологии. 4. Стоимость: учитывайте свой бюджет, но помните, что дешевый хостинг не всегда гарантирует хорошее качество.Если вы выберете правильный хостинг, ваш сайт будет работать быстро и стабильно, а пользователи останутся довольны.' },
    { id: '3', title: 'Третий пост', body: 'Веб-разработка постоянно развивается, и появляются новые инструменты и фреймворки, которые делают создание приложений проще и быстрее. В этой статье мы рассмотрим 10 самых популярных фреймворков, которые используются для разработки веб-приложений. 1. React — один из самых популярных JavaScript-фреймворков для создания динамичных пользовательских интерфейсов. 2. Vue.js — легковесный и гибкий фреймворк, который легко интегрируется с существующими проектами. 3. Angular — мощный фреймворк от Google, предназначенный для создания сложных веб-приложений. 4. Django — Python-фреймворк, который подходит для создания полноценных веб-сайтов и приложений. 5. Ruby on Rails — фреймворк для создания веб-приложений с использованием Ruby. 6. Express.js — минималистичный фреймворк для Node.js, который подходит для построения серверных приложений. 7. Spring Boot — популярный фреймворк для создания Java-приложений. 8. Laravel — фреймворк для разработки веб-приложений на PHP. 9. Flask — легкий Python-фреймворк для создания простых веб-приложений. 10. ASP.NET Core — фреймворк от Microsoft для создания современных веб-приложений.Каждый из этих фреймворков имеет свои особенности и преимущества, поэтому выбор зависит от задач проекта. Все они могут помочь вам быстро и эффективно создать веб-приложение, будь то небольшое приложение или крупный корпоративный сервис.' },
    { id: '4', title: 'Четвертый пост', body: 'SEO (Search Engine Optimization) — это процесс оптимизации сайта для поисковых систем, чтобы он занимал высокие позиции в результатах поиска. В этой статье мы рассмотрим, что такое SEO и почему оно так важно для вашего бизнеса. Что включает в себя SEO? SEO состоит из нескольких аспектов: 1. Техническое SEO: улучшение структуры сайта, его скорости, мобильной адаптивности. 2. Контент SEO: создание качественного контента, который соответствует запросам пользователей. 3.*Внешняя оптимизация: привлечение внешних ссылок на ваш сайт (backlinks). 4. Аналитика: отслеживание позиций в поисковых системах, анализ трафика и поведенческих факторов. Почему SEO важно? 1. Увеличение трафика: качественная оптимизация помогает привлекать больше посетителей на ваш сайт. 2. Доверие пользователей: сайты, которые находятся на высоких позициях в поиске, чаще воспринимаются как авторитетные. 3. Конкуренция: хороший SEO помогает вам быть впереди конкурентов.Если вы хотите, чтобы ваш сайт был видимым и успешным, вам обязательно нужно вложиться в SEO. Это поможет не только увеличить трафик, но и повысить доверие пользователей.' },
  ];

  const pos = await prisma.Post.findMany();
  const post = pos.find((p) => p.id === params.id);

  return {
    props: {
      post,
    },
  };
}

export default Post;
