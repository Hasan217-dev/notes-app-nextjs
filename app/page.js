import dbConnect from "@/lib/db";
import NotesClient from "./components/NotesClient";
import Note from "@/models/Note";

async function getNotes(){
  await dbConnect();
  const notes = await Note.find({}).sort({createdAt : -1}).lean()
  return notes.map((note)=>({
    ...note ,
    _id : note._id.toString()
  }))
}


export default async function Home() {
  const notes = await getNotes()
  console.log(notes)
  return (
    <main className="container mx-auto p-4">
      <NotesClient initialNotes={notes} />
    </main>
  );
}
