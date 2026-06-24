import dbConnect from "@/lib/db";
import NotesClient from "./components/NotesClient";


export default async function Home() {
  await dbConnect();
  return (
    <main className="container mx-auto p-4">
      <NotesClient />
    </main>
  );
}
