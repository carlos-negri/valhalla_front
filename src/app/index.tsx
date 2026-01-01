// src/app/index.tsx
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from './contexts/AuthContext';
import { api } from './services/api';
import { setItem } from './services/storage';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  async function entrar() {
    if (!email || !password) {
      Alert.alert('Prencha email e senha');
      return;
    }

    try {
      const response = await api.post('/login', { 
        email, 
        password 
      });
    
      const { token, user } = response.data;
      await signIn(token, user);

      await setItem('token', token);
      await setItem('user', JSON.stringify(user));

      console.log('Token:', token);
      console.log('User:', user);
    
      router.replace('/dashboard');
    }
    catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erro ao fazer login. Verifique suas credenciais.');
    }
    

    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identificação</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={entrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#f9f9f9',
  },

  form: {
    width: '10%',     
    maxWidth: 340,      
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
});
