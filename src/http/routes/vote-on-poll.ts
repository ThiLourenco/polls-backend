import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import { redis } from "../../lib/redis"
import { randomUUID } from "crypto";
import { z } from "zod"
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })
    
    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessionId } = request.cookies

    if(sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          }
        }
      })

      if(userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id
          }
        })

        // decrement count vote previous
        const votes = await redis.zincrby(pollId, -1,  userPreviousVoteOnPoll.pollOptionId) 

        voting.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          votes: Number(votes),
        })

      } else if (userPreviousVoteOnPoll) {
        return reply.status(400).send({message: 'Você já votou nesse canditado'})
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true, 
        httpOnly: true,
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      }
    })

    // increment one in each poll
    const votes = await redis.zincrby(pollId, 1, pollOptionId) 

    // return title 
    const option = await prisma.pollOption.findUnique({
      where: {
        id: pollOptionId,
      },
      select: {
        title: true,
      },
    });

    voting.publish(pollId, {
      pollOptionId,
      votes: Number(votes),
    })
    
    return reply.status(201).send({
      optionTitle: option?.title
    })
  })
}