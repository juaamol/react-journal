export async function fileUpload(file: any) {
  const viteEnv = import.meta.env || {};
  const cloudinaryUrl = viteEnv.VITE_CLOUDINARY_URL_UPLOAD;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', viteEnv.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const jsonResponse = await response.json();

      return jsonResponse.secure_url;
    } else {
      throw new Error('Unable to upload file');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
