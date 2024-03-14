// import { caller } from "@/server/trpc";
import { httpBatchLink } from "@trpc/client"

// export const serverClient = caller({
//     links: [
//         httpBatchLink({
//             url: "http://localhost:3000/api/trpc"
//         })
//     ]
// })