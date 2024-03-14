'use client'

import { useState } from "react"
import { trpc } from "../_trpc/client"

export default function TodoList() {
    const getTodos = trpc.getTodos.useQuery()
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => getTodos.refetch()
    })
    const setDone = trpc.setDone.useMutation({
        onSettled: () => getTodos.refetch()
    })

    const [content, setContent] = useState("")

    return (
        <>
            <div className="flex flex-col gap-4">
                {getTodos.data?.map(todo => (
                    <div className="flex gap-3 items-center">
                        <input
                            id={`check-${todo.id}`}
                            type="checkbox"
                            checked={!!todo.done}
                            style={{ zoom: 1.5 }}
                            onChange={async () => {
                                setDone.mutate({
                                    id: todo.id,
                                    done: todo.done ? 0 : 1
                                })
                            }}
                        />
                        <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
                    </div>
                ))}

                <label>Content</label>
                <input
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="text-black"
                />
                <button className="" onClick={async () => {
                    if (content.length) {
                        addTodo.mutate(content)
                        setContent("")
                    }
                }}>Send</button>
            </div>
        </>
    )
}