// src/app/lista.tsx
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useAgendamentos } from '../contexts/AgendamentoContext';

export default function ListaAgendamentos() {
  const { agendamentos } = useAgendamentos();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Agendamentos" onMenuPress={() => setMenuAberto(true)} />

      <View style={styles.content}>
        <Text style={styles.title}>Agendamentos</Text>

        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.servico}>{item.servico}</Text>
              <Text style={styles.cliente}>{item.cliente}</Text>
              <Text style={styles.meta}>
                {item.data} às {item.hora}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum agendamento encontrado</Text>
          }
        />
      </View>

      <Sidebar visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#151515',
  },
  servico: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cliente: {
    color: '#FFFFFF',
    marginTop: 4,
  },
  meta: {
    color: '#DDDDDD',
    marginTop: 6,
  },
  empty: {
    marginTop: 24,
    textAlign: 'center',
    color: '#AAAAAA',
  },
});
