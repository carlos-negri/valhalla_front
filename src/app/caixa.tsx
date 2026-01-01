// src/app/caixa.tsx
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useCaixa } from '../contexts/CaixaContext';

export default function CaixaPage() {
  const { transacoes, saldo, adicionarTransacao } = useCaixa();
  const [menuAberto, setMenuAberto] = useState(false);

  function adicionaTeste(tipo: 'entrada' | 'saida') {
    const novo = {
      id: `t${Date.now()}`,
      tipo,
      descricao: tipo === 'entrada' ? 'Teste entrada' : 'Teste saída',
      valor: +(Math.random() * 200).toFixed(2),
      data: new Date().toISOString().split('T')[0],
    };

    adicionarTransacao(novo);
  }

  function formatMoney(v: number) {
    try {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
    } catch (e) {
      return `R$ ${v.toFixed(2)}`;
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Caixa" onMenuPress={() => setMenuAberto(true)} />

      <View style={styles.content}>
        <Text style={styles.title}>Saldo</Text>
        <Text style={styles.saldo}>{formatMoney(saldo)}</Text>

        <View style={styles.actions}>
          <Button title="Adicionar Entrada (teste)" onPress={() => adicionaTeste('entrada')} />
          <View style={{ height: 8 }} />
          <Button title="Adicionar Saída (teste)" onPress={() => adicionaTeste('saida')} />
        </View>

        <Text style={[styles.title, { marginTop: 24 }]}>Transações</Text>

        <FlatList
          style={{ marginTop: 12 }}
          data={transacoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.desc}>{item.descricao}</Text>
                <Text style={styles.date}>{item.data}</Text>
              </View>

              <Text style={[styles.valor, item.tipo === 'entrada' ? styles.entrada : styles.saida]}>
                {item.tipo === 'entrada' ? '+' : '-'} {formatMoney(item.valor)}
              </Text>
            </View>
          )}
        />
      </View>

      <Sidebar visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },
  saldo: { fontSize: 28, color: '#FFFFFF', marginTop: 8, fontWeight: '800' },
  actions: { marginTop: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#151515',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  desc: { color: '#FFFFFF', fontWeight: '600' },
  date: { color: '#AAAAAA', marginTop: 4 },
  valor: { fontWeight: '700' },
  entrada: { color: '#4caf50' },
  saida: { color: '#ff6b6b' },
});
