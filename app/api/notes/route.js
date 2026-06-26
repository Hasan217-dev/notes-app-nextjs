import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// UPDATE NOTE
export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true, // ✅ ensures schema validation
      }
    );

    // ❗ Handle not found
    if (!updatedNote) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedNote,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE NOTE
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const deletedNote = await Note.findByIdAndDelete(id);

    // ❗ Handle not found
    if (!deletedNote) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}