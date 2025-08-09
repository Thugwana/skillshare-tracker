"use client";

import { useState } from "react";

export default function Home() {
  const [skills, setSkills] = useState<{ id: number; name: string; rating: string }[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rating) return;
    const newSkill = { id: Date.now(), name, rating };
    setSkills([...skills, newSkill]);
    setName("");
    setRating("");
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <header className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">SkillShare Tracker</h1>
        <p className="text-gray-600 mt-2">
          Track, manage, and improve your skills — one step at a time.
        </p>
      </header>

      {/* Skills List Section */}
      <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet</p>
        ) : (
          <ul className="space-y-2">
            {skills.map(skill => (
              <li
                key={skill.id}
                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
              >
                <span>
                  {skill.name} - ⭐ {skill.rating}
                </span>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Skill Form */}
      <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Skill</h2>
        <form onSubmit={addSkill} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Skill Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-28 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      </section>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillShare Tracker
      </footer>
    </main>
  );
}
