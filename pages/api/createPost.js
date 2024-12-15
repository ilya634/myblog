import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось создать пост' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
