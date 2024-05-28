import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash("1234", 10);
  const hashedPassword2 = await bcrypt.hash("1234", 10);

  const sunimkoh = await prisma.user.upsert({
    where: { email: "sunimkohlee@naver.com" },
    update: {},
    create: {
      email: "sunimkohlee@naver.com",
      password: hashedPassword1,
      name: "sunimkohlee",
      posts: {
        create: {
          title: "sunimkoh",
          content: "I am sunimkohlee",
          published: true,
        },
      },
    },
  });

  const dahahmlee = await prisma.user.upsert({
    where: { email: "dahahmlee@gmail.com" },
    update: {},
    create: {
      email: "dahahmlee@gmail.com",
      password: hashedPassword2,
      name: "dahahmlee",
      posts: {
        create: {
          title: "dahahmlee",
          content: "I am dahahmlee",
          published: true,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
