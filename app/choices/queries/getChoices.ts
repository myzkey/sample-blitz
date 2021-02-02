import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetChoicesInput = Pick<Prisma.FindManyChoiceArgs, "where" | "orderBy" | "skip" | "take">

export default async function getChoices(
  { where, orderBy, skip = 0, take }: GetChoicesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const choices = await db.choice.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.choice.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    choices,
    nextPage,
    hasMore,
    count,
  }
}
