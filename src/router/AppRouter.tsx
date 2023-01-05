import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/router/JournalRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes />}></Route>
      <Route path='/journal/*' element={<JournalRoutes />}></Route>
    </Routes>
  );
};
