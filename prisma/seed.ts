import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const sunimkoh = await prisma.user.upsert({
    where: { email: 'sunimkohlee@naver.com' },
    update: {},
    create: {
      email: 'sunimkohlee@naver.com',
      name: 'sunimkohlee',
      posts: {
        create: {
          title: 'sunimkoh',
          content: 'I am sunimkohlee',
          published: true,
        },
      },
    },
  });
  
  const dahahmlee = await prisma.user.upsert({
    where: { email: 'dahahmlee@gmail.com' },
    update: {},
    create: {
      email: 'dahahmlee@gmail.com',
      name: 'dahahmlee',
      posts: {
        create: {
          title: 'dahahmlee',
          content: 'I am dahahmlee',
          published: true,
        },
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
