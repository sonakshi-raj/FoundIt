"use client";

import { useState, ChangeEvent } from "react";

type formProps = {
    action: string;
    method: string;
    handleSubmit: React.FormEvent<HTMLFormElement>;
};

const Form = ({ action, method, handleSubmit }: formProps) => {

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };
    return (
        <>
            <form action={action} method={method}>
                <label htmlFor="name">Name: </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="border rounded px-3 py-2"
                /> <br />

                <label htmlFor="rno">Roll Number: </label>
                <input
                    id="rno"
                    name="rno"
                    type="text"
                    required
                    className="border rounded px-3 py-2"
                /> <br />

                <label htmlFor="title">Lost item: </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="border rounded px-3 py-2"
                /> <br />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Post Notice</button>
            </form>
        </>
    );
};

export default Form;

/*// components/forms/ContactForm.js
'use client';

import Form from 'next/form';

export default function ContactForm() {
  return (
    <Form action="/api/contact" method="POST" className="flex flex-col gap-4 max-w-md mx-auto">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="border rounded px-3 py-2"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="border rounded px-3 py-2"
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        required
        className="border rounded px-3 py-2"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </Form>
  );
}
*/
