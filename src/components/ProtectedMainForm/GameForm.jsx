import { useState } from 'react';

export default function GameForm() {
  const [status, setStatus] = useState('');
  const endpoint = `https://${import.meta.env.VITE_HASURA_API}/v1/graphql`;
  const adminSecret = import.meta.env.VITE_HASURA_SECRET;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');
    const form = e.currentTarget;
    const gameName = form.gameName.value.trim();
    const imageUrl = form.imageUrl.value.trim();

    setStatus('Uploading…');
    const query = `
      mutation InsertGameImage($game_name: String!, $image_url: String) {
        insert_game_images_one(
          object: { game_name: $game_name, image_url: $image_url },
          on_conflict: {
            constraint: game_images_game_name_key,
            update_columns: image_url
          }
        ) {
          id
        }
      }
    `;
    const variables = { game_name: gameName, image_url: imageUrl };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminSecret && { 'x-hasura-admin-secret': adminSecret }),
        },
        body: JSON.stringify({ query, variables }),
      });
      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);
      setStatus(`✅ Uploaded! ID: ${data.insert_game_images_one.id}`);
      form.reset();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        `max-w-xl w-full flex flex-col justify-center gap-6 mx-auto
         p-7 sm:p-10 bg-transparent`
      }
      style={{
        minHeight: 380,
      }}
    >
      <h2 className="text-3xl font-extrabold text-white drop-shadow mb-2 leading-tight">
        Upload Game Image
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-4 gap-4">
        <label className="flex-1 flex flex-col gap-2 text-gray-300 font-semibold">
          <span>Game Name</span>
          <input
            name="gameName"
            required
            className="rounded-xl px-5 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition"
            placeholder="Enter game name"
          />
        </label>
        <label className="flex-1 flex flex-col gap-2 text-gray-300 font-semibold">
          <span>Image URL</span>
          <input
            name="imageUrl"
            type="url"
            required
            className="rounded-xl px-5 py-2 text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 transition"
            placeholder="https://..."
          />
        </label>
      </div>

      <button
        type="submit"
        className="self-start mt-2 px-12 py-3 bg-teal-400 hover:bg-teal-300 text-gray-900 font-extrabold rounded-xl shadow-lg transition hover:scale-105"
      >
        Upload
      </button>

      {status && <p className="text-teal-400 mt-2">{status}</p>}
    </form>
  );
}
