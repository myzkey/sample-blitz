import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateQuestionInput = Pick<Prisma.QuestionCreateArgs, "data">
export default async function createQuestion({ data }: CreateQuestionInput, ctx: Ctx) {
  ctx.session.authorize()

  const question = await db.question.create({ data })

  return question
}
