import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteChoiceInput = Pick<Prisma.ChoiceDeleteArgs, "where">

export default async function deleteChoice({ where }: DeleteChoiceInput, ctx: Ctx) {
  ctx.session.authorize()

  const choice = await db.choice.delete({ where })

  return choice
}
