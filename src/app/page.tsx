import getUsers from "@/actions/getUsers";

import Image from "next/image";

export default async function Home() {
  const users = await getUsers();
  return (
    <div className="max-w-screen-xl mx-auto">
      {JSON.stringify(users, undefined, 2)}
    </div>
  );
}
