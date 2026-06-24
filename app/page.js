import dbConnect from "@/lib/db";

export default async function Home() {
  await dbConnect();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Notes App</h1>
    </main>
  );
}
