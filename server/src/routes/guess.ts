import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export  async function guessRoutes(fastify: FastifyInstance) {
    fastify.get('/guesses/count', async () => {

        const count = await prisma.guess.count();
        console.log("Count : ", count);

        return { count };
    }



    )
}