import { useState } from 'react';
import AuthGuard from './AuthGuard';
import SecretForm from './SecretForm';
import PasswordGate from './PasswordGate';

export default function ProtectedMainForm() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthGuard>
      {authenticated ? (
        <SecretForm />
      ) : (
        <PasswordGate onAuthenticated={() => setAuthenticated(true)} />
      )}
    </AuthGuard>
  );
}
