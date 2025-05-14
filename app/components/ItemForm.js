'use client'

import { useEffect, useState } from "react";
import DropzoneUploader from "./DropzoneUploader";

export default function ItemForm({ mode, itemId})  {
  const [form, setForm] = useState({ name: '', author: '', content: '', imageUrl: '' });
    useEffect(() => {
        if (mode === 'edit' && itemId) {
            fetch(`/api/items/${itemId}`).then(res => res.json()).then(data => setForm(data));
        }
    }, [itemId, mode]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = mode === 'edit' ? 'PUT' : 'POST';
        const url = mode === 'edit' ? `/api/items/${itemId}` : `/api/items`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
            <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author" />
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            <DropzoneUploader onUpload={(url) => setForm({ ...form, imageUrl: url })} />
            <button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Item</button>
        </form>
    );
}