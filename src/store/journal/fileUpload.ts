import config from '../../config/config';
import { NoteImage } from './journal-slice';

export async function fileUpload(file: any): Promise<NoteImage> {
  const cloudinaryUrl = config.CLOUDINARY_URL_UPLOAD;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { public_id, secure_url } = await response.json();
      const image = { id: public_id, url: secure_url };

      return image;
    } else {
      throw new Error('Unable to upload file');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
