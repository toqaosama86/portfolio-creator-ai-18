"use client";

import { useState } from "react";
import { supabase } from "../integrations/supabase/client"; // make sure you have this configured

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("wordpress");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let filePath = null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      filePath = `projects/${fileName}`;

      // Upload to bucket
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return;
      }
    }

    // Save project to DB
    const { error: dbError } = await supabase.from("projects").insert([
      {
        title,
        description,
        category,
        images: filePath ? [filePath] : [],
      },
    ]);

    if (dbError) {
      console.error("DB error:", dbError.message);
    } else {
      alert("✅ Project saved successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-900 p-6 rounded-lg max-w-lg mx-auto"
    >
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded text-black"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded text-black"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded text-black"
      >
        <option value="wordpress">Wordpress</option>
        <option value="coding">Coding</option>
        <option value="design">Design</option>
      </select>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Save Project
      </button>
    </form>
  );
}
