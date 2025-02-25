import { users } from "@/db/schema"
import { db } from "@/db"

export default function () {
    return db.select().from(users);
}