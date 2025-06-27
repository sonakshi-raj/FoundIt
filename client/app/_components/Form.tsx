"use client";

import { useState } from "react";
type formProps = {
  userId: string;
};

type item = {
  type: string;
  title: string;
  description: string;
  location: string;
  dateLost: string;
  contact: string;
  createdByUser: string;
  isFound: boolean | null;
  isClaimed: boolean | null;
};

export default function Form({ userId }: formProps) {
  const [form, setForm] = useState<item>({
    type: "lost",
    title: "",
    description: "",
    location: "",
    dateLost: "",
    contact: "",
    createdByUser: "",
    isFound: false,
    isClaimed: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, type: e.target.value });
    if (e.target.value === "lost") {
      setForm({ ...form, isClaimed: null, isFound: false });
    } else {
      setForm({ ...form, isFound: null, isClaimed: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm((prev) => {
      const updatedForm = { ...prev, createdByUser: userId };
      console.log(updatedForm);
      return updatedForm;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-0 m-5">
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="type"
            value="lost"
            checked={form.type === "lost"}
            onChange={handleTypeChange}
          />
          Lost
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="found"
            checked={form.type === "found"}
            onChange={handleTypeChange}
          />
          Found
        </label>
      </div>

      <input
        name="title"
        placeholder="Item Name"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Last Seen Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateLost"
        value={form.dateLost}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        placeholder="Your Contact Info"
        value={form.contact}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Post {form.type === "lost" ? "Lost" : "Found"} Item
      </button>
    </form>
  );
}
