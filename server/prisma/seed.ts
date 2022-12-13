import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John doe',
            email: 'johndow@gmail.com',
            avatarUrl: 'http://github.com/correa96cl.png'
        }
    })


    const pool = await prisma.pool.create({
        data: {
            title: 'Example',
            code: 'CL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-11T20:50:52.621Z',
            firstTeamCountryCode: 'CL',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-11T20:50:52.621Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoint: 2,
                    secondTeamPoint: 2,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

}


main()