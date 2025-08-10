import { useState } from 'react';

export default function ProjectUploadForm() {
  const [status, setStatus] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const endpoint = `https://${import.meta.env.VITE_HASURA_API}/v1/graphql`;
  const adminSecret = import.meta.env.VITE_HASURA_SECRET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Uploading image to Cloudinary…');

    const form = e.currentTarget;
    const file = form.file.files[0];
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const tags = form.tags.value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const githubLink = form.githubLink.value.trim();
    const previewLink = form.previewLink.value.trim();

    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('file', file);

    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );
      const cloudJson = await cloudRes.json();
      if (!cloudRes.ok) throw new Error(cloudJson.error?.message || 'Cloudinary failed');

      const imageUrl = cloudJson.secure_url;
      setStatus('Saving project…');
      const mutation = `
        mutation InsertProject($project: Project_insert_input!) {
          insert_Project_one(object: $project) { id }
        }
      `;

      const variables = {
        project: {
          title,
          description,
          tags,
          image: imageUrl,
          githubLink: githubLink || "",
          previewLink: previewLink || "",
        }
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminSecret && { 'x-hasura-admin-secret': adminSecret }),
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);

      setStatus(`✅ Project ID: ${data.insert_Project_one.id}`);
      form.reset();
      setFileName('No file chosen');
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'No file chosen');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        `max-w-xl w-full flex flex-col justify-center gap-5 mx-auto
         p-5 sm:p-8 bg-transparent m-8`
      }
      style={{
        minHeight: 320,
        maxHeight: 420,
      }}
    >
      <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2 leading-tight">
        Upload Project
      </h2>

      <div>
        <label className="block text-sm text-neutral-300 font-semibold mb-2">
          Project Image
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => document.getElementById('fileInput').click()}
            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-gray-900 rounded-lg font-medium transition"
          >
            Choose File
          </button>
          <span className="text-sm text-neutral-400 truncate max-w-[140px]">{fileName}</span>
        </div>
        <input
          id="fileInput"
          name="file"
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 gap-2">
        <label className="flex-1 flex flex-col gap-2 text-gray-300 font-semibold">
          Title
          <input
            name="title"
            required
            className="rounded-xl px-4 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition text-base"
          />
        </label>
        <label className="flex-1 flex flex-col gap-2 text-gray-300 font-semibold">
          Tags (comma-separated)
          <input
            name="tags"
            placeholder="React.js, Hasura"
            className="rounded-xl px-4 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition text-base"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-gray-300 font-semibold">
        Description
        <textarea
          name="description"
          rows={2}
          required
          className="rounded-xl px-4 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition text-base"
        />
      </label>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="githubLink"
          type="url"
          placeholder="GitHub (optional)"
          className="flex-1 rounded-xl px-4 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition text-base"
        />
        <input
          name="previewLink"
          type="url"
          placeholder="Preview (optional)"
          className="flex-1 rounded-xl px-4 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition text-base"
        />
      </div>

      <button
        type="submit"
        className="self-start mt-2 px-10 py-2 bg-teal-400 hover:bg-teal-300 text-gray-900 font-extrabold rounded-xl shadow-lg transition hover:scale-105"
      >
        Submit
      </button>

      {status && <p className="text-teal-400 mt-2">{status}</p>}
    </form>
  );
}
