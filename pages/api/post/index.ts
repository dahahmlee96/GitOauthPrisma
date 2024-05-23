import { getSession } from "next-auth/react";
import { AuthOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
  const { title, content } = req.body;
  const session = await getServerSession(req, res, AuthOptions);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
