import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data.password = bcrypt.hashSync(args.data.password);
        return query(args);
      },
      async update({ args, query }) {
        if (args.data.password) {
          args.data.password = bcrypt.hashSync(args.data.password.toString());
        }
        return query(args);
      },
    },
  },
});

export default prisma;
