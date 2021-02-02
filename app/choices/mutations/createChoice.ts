import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateChoiceInput = Pick<Prisma.ChoiceCreateArgs, "data">
export default async function createChoice({ data }: CreateChoiceInput, ctx: Ctx) {
  ctx.session.authorize()

  const choice = await db.choice.create({ data })

  return choice
}
