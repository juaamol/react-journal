// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('./config/config', () => {
  return {
    CLOUDINARY_UPLOAD_PRESET: 'react-journal',
    CLOUDINARY_URL_UPLOAD: 'cloudinary_url',
  };
});

async function mockFetch(url: string, config: { [key: string]: any }) {
  switch (url) {
    case 'cloudinary_url': {
      return {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ secure_url: 'some_url' }),
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

beforeAll(() => jest.spyOn(global, 'fetch'));

beforeEach(() => (global.fetch as jest.Mock).mockImplementation(mockFetch));