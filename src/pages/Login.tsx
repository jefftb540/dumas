import { useState } from 'react';
import { useAuth } from '../contexts/authContext';

export function Login() {
  const { signIn, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={onSubmit}>Login</button>
      {error}
    </div>
  );
}
