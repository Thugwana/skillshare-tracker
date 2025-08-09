import { NextResponse } from "next/server";

let skills: { id: number; name: string; rating: string }[] = [];

// GET - fetch all skills
export async function GET() {
  return NextResponse.json(skills);
}

// POST - add a new skill
export async function POST(request: Request) {
  const { name, rating } = await request.json();
  const newSkill = { id: Date.now(), name, rating };
  skills.push(newSkill);
  return NextResponse.json(newSkill);
}

// DELETE - remove a skill
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  skills = skills.filter(skill => skill.id !== id);
  return NextResponse.json({ success: true });
}
