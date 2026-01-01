import { Slot } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AgendamentoProvider } from '../contexts/AgendamentoContext';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { CaixaProvider } from '../contexts/CaixaContext';
import { ClienteProvider } from '../contexts/ClienteContext';

/**
 * 🚪 Gate de autenticação
 * FICA DENTRO do AuthProvider
 */
function AuthGate() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return <Slot />;
}

/**
 * 🌱 Root do app
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ClienteProvider>
          <AgendamentoProvider>
            <CaixaProvider>
              <AuthGate />
            </CaixaProvider>
          </AgendamentoProvider>
        </ClienteProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
