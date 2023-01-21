import React from 'react';
import { LoginPage } from '../pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />}></Route>
      <Route path='register' element={<RegisterPage />}></Route>
      <Route path='/*' element={<Navigate to='/auth/login' />}></Route>
    </Routes>
  );
};
