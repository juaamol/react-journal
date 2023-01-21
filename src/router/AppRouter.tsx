import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/router/JournalRoutes';
import { CheckingAuth } from '../ui/components';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {
  const status = useCheckAuth();
  return (
    <Routes>
      {status === 'checking' && <Route path='/*' element={<CheckingAuth />} />}
      {status === 'authenticated' && (
        <Route path='/*' element={<JournalRoutes />} />
      )}
      {status === 'not-authenticated' && (
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
