import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoginPage } from '../../../auth/pages';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../store/auth/auth-slice';
import { MemoryRouter } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import userEvent from '@testing-library/user-event';
import { notAuthenticatesState } from '../../fixtures/auth-fixtures';

jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../../../store/auth/thunks', () => ({
  startGoogleSignIn: () => 'startGoogleSignIn',
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatesState,
  },
});

describe('Test <LoginPage />', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it('Should show the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('Should sign in with google component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const googleButton = screen.getByLabelText('google');
    userEvent.click(googleButton);
    expect(dispatch).toHaveBeenCalledWith('startGoogleSignIn');
  });
});
