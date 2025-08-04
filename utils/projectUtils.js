const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const API_URL = `https://${import.meta.env.VITE_HASURA_API}/api/rest/get-projects`
const ADMIN_SECRET = import.meta.env.VITE_HASURA_SECRET;

export async function fetchProjects() {
  try {
    const res = await fetch(API_URL, {
      headers: { 'x-hasura-admin-secret': ADMIN_SECRET }
    });
    if (!res.ok) throw new Error('Failed to fetch projects');

    const data = await res.json();

    console.log('API raw data:', data);
    const projectsArray = Array.isArray(data.Project) ? data.Project : [];

    console.log('Extracted projects:', projectsArray);

    return projectsArray;
  } catch (err) {
    console.error('Error loading projects', err);
    return [];
  }
}

export async function submitProject({ title, description, tagsString, githubLink, previewLink, imageFile }) {
  try {
    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await fetch(CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });
      if (!cloudRes.ok) throw new Error("Image upload failed");
      const cloudData = await cloudRes.json();
      imageUrl = cloudData.secure_url;
    }

    const tagsArray = tagsString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload = {
      title,
      description,
      tags: tagsArray,
      githubLink,
      previewLink,
      image: imageUrl,
    };

    const res = await fetch(HASURA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify(projectPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Project insertion failed: ${errorText}`);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}