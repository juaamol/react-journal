// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('./firebase/firebase-config', () => ({}));

async function mockFetch(url: string) {
  switch (url) {
    case 'cloudinary_url': {
      return {
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({ public_id: 'id', secure_url: 'secure_url' }),
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

beforeAll(() => jest.spyOn(global, 'fetch'));

beforeEach(() => (global.fetch as jest.Mock).mockImplementation(mockFetch));
