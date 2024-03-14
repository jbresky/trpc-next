import { publicProcedure, router } from "./trpc"
import { todos } from "@/src/db/schema"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { eq } from "drizzle-orm"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import * as z from "zod"

const sqlite = new Database("sqlite.db")
const db = drizzle(sqlite)

migrate(db, { migrationsFolder: "drizzle" })

export const appRouter = router({
    getTodos: publicProcedure.query(() => {
        return db.select().from(todos).all()
    }),
    addTodo: publicProcedure.input(z.string()).mutation((opts) => {
        db.insert(todos).values({ content: opts.input, done: 0}).run()
        return true
    }),
    setDone: publicProcedure
        .input(
            z.object({
                id: z.number(),
                done: z.number()
            })
        )
        .mutation(async (opts) => {
            db.update(todos)
                .set({ done: opts.input.done })
                .where(eq(todos.id, opts.input.id ))
                .run()
        })
})

export type AppRouter = typeof appRouter