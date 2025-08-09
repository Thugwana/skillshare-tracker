"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [skills, setSkills] = useState<{ id: number; name: string; rating: string }[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetch("/api/skills")
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating }),
    });
    const newSkill = await res.json();
    setSkills([...skills, newSkill]);
    setName("");
    setRating("");
  };

  const deleteSkill = async (id: number) => {
    await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SkillShare Tracker</h1>

      <form onSubmit={addSkill} className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Skill</button>
      </form>

      <div className="max-w-md mx-auto mt-6">
        {skills.length === 0 && <p className="text-center text-gray-500">No skills added yet</p>}
        {skills.map(skill => (
          <div key={skill.id} className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
            <span>{skill.name} - ⭐ {skill.rating}</span>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
