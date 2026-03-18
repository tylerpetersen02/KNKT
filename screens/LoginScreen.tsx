import { useState } from 'react';
import { Text } from 'react-native';
import { FormScreen } from '../components/FormScreen';

export default function LoginScreen({ onLoginSuccess }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fields = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      value: email,
      onChange: setEmail,
      keyboardType: 'email-address' as const,
      error: error ? 'Invalid email or password' : undefined,
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: '••••••••',
      value: password,
      onChange: setPassword,
      secureTextEntry: true,
      error: error ? 'Invalid email or password' : undefined,
    },
  ];

  const handleSubmit = async () => {
    try {
      setError('');
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      // Simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <FormScreen
      title="KNKT"
      subtitle="Sign in to your account"
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      footerText={
        <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41' }}>
          Don't have an account?{' '}
          <Text style={{ color: '#F12838', fontWeight: '600' }}>
            Sign up
          </Text>
        </Text>
      }
    />
  );
}
