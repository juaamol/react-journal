import { fileUpload } from './fileUpload';
import config from '../../config/config';

describe('Test file upload', () => {
  test('Should call fetch with the file and the correct endpoint', async () => {
    const file = 'Im a file';
    const secure_url = await fileUpload(file);
    const preset = config.CLOUDINARY_UPLOAD_PRESET;
    const firstCall = (fetch as jest.Mock).mock.calls[0];

    expect(firstCall[1].method).toEqual('POST');
    expect(firstCall[1].body.get('file')).toEqual(file);
    expect(firstCall[1].body.get('upload_preset')).toEqual(preset);
    expect((fetch as jest.Mock).mock.calls).toHaveLength(1);
    expect(secure_url).toBe('some_url');
  });

  test('Should fail upload', async () => {
    (fetch as jest.Mock).mockImplementation(() => ({ ok: false }));
    const file = 'Im a file';
    const error = new Error('Unable to upload file');
    await expect(async () => await fileUpload(file)).rejects.toThrow(error);
  });

  test('Should fail for unknown reason', async () => {
    const error = new Error('Unknown');
    const file = 'Im a file';
    (fetch as jest.Mock).mockImplementation(() => {
      throw error;
    });
    await expect(async () => await fileUpload(file)).rejects.toThrow(error);
  });
});
