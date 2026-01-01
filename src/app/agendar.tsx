// src/app/agendar.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Sidebar } from '../components/Sidebar';
import { useAgendamentos } from './contexts/AgendamentoContext';
import { useCliente } from './contexts/ClienteContext';
// Try to dynamically require the native datetime picker so the app won't crash if
// the dependency isn't installed. If it's missing we'll show a helpful alert.
let DateTimePicker: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@react-native-community/datetimepicker');
  DateTimePicker = mod?.default ?? mod;
} catch (e) {
  DateTimePicker = null;
}

const SERVICOS = [
  'corte máquina',
  'corte tesoura',
  'barba retoque',
  'barba completa',
  'combo barba e corte',
  'tattoo flash',
  'tattoo personalizada',
];

export default function Agendar() {
  const { adicionarAgendamento } = useAgendamentos();
  const { nome } = useCliente();
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);
  const [cliente, setCliente] = useState(nome || '');
  const [servico, setServico] = useState<string | null>(null);
  const [data, setData] = useState(''); // format YYYY-MM-DD
  const [hora, setHora] = useState(''); // format HH:MM
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeList, setShowTimeList] = useState(true);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  function validar() {
    if (!cliente.trim()) return 'Informe o nome do cliente.';
    if (!servico) return 'Selecione um serviço.';
    if (!data.match(/^\d{4}-\d{2}-\d{2}$/)) return 'Data inválida. Use AAAA-MM-DD.';
    if (!hora.match(/^\d{2}:\d{2}$/)) return 'Hora inválida. Use HH:MM.';
    return null;
  }

  function enviar() {
    const erro = validar();
    if (erro) {
      Alert.alert('Erro', erro);
      return;
    }

    const ag = {
      id: `ag${Date.now()}`,
      cliente: cliente.trim(),
      servico: servico as string,
      data,
      hora,
    };

    adicionarAgendamento(ag);
    // success feedback
    Alert.alert('Agendamento confirmado', 'O agendamento foi criado com sucesso.', [
      { text: 'OK', onPress: () => router.replace('/lista') },
    ]);
  }

  function onChangeDate(event: any, selected?: Date) {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      const d = selected;
      setTempDate(d);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setData(`${yyyy}-${mm}-${dd}`);
      // when date changes, keep the time list visible
      setShowTimeList(true);
    }
  }

  // generate 30 minute intervals between 06:00 and 22:30
  function generateIntervals() {
    const intervals: string[] = [];
    for (let h = 6; h <= 22; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        intervals.push(`${hh}:${mm}`);
      }
    }
    return intervals;
  }

  function isTimeSelectable(timeStr: string) {
    if (!data.match(/^\d{4}-\d{2}-\d{2}$/)) return false; // no date

    const [hh, mm] = timeStr.split(':').map(Number);
    const [yyyy, month, day] = data.split('-').map(Number);
    const target = new Date(yyyy, month - 1, day, hh, mm, 0);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    // must be at least 30 minutes (1800000 ms) in the future
    return diff >= 30 * 60 * 1000;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Header title="Agendar Serviço" onMenuPress={() => setMenuAberto(true)} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Cliente</Text>
        <Input value={cliente} onChangeText={setCliente} placeholder="Nome do cliente" />

        <Text style={[styles.label, { marginTop: 8 }]}>Serviço</Text>
        <View style={styles.servicos}>
          {SERVICOS.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.servicoItem, servico === s && styles.servicoSelected]}
              onPress={() => setServico(s)}
            >
              <Text style={[styles.servicoText, servico === s && styles.servicoTextSelected]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 12 }]}>Data</Text>
        <TouchableOpacity
          onPress={() => {
            if (!DateTimePicker) {
              Alert.alert(
                'Recurso ausente',
                'O seletor de data não está instalado. Instale `@react-native-community/datetimepicker` ou insira a data manualmente.'
              );
              return;
            }
            setShowDatePicker(true);
          }}
        >
          <Input value={data} editable={false} placeholder="2025-12-31" />
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 12 }]}>Hora</Text>
        <Input value={hora} editable={false} placeholder="Selecione um horário" />

        {showTimeList && (
          <View style={styles.timesContainer}>
            {generateIntervals().map(t => {
              const selectable = isTimeSelectable(t);
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    if (!data) {
                      Alert.alert('Selecione a data primeiro');
                      return;
                    }
                    if (!selectable) {
                      Alert.alert('Horário inválido', 'Não é possível agendar com menos de 30 minutos de antecedência.');
                      return;
                    }
                    setHora(t);
                  }}
                  style={[styles.timeItem, hora === t && styles.timeSelected, !selectable && styles.timeDisabled]}
                >
                  <Text style={[styles.timeText, hora === t && styles.timeTextSelected, !selectable && styles.timeTextDisabled]}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {showDatePicker && DateTimePicker && (
          <DateTimePicker value={tempDate} mode="date" display="default" onChange={onChangeDate} />
        )}

        <View style={{ marginTop: 20 }}>
          <Button title="Agendar" onPress={enviar} />
        </View>
      </ScrollView>

      <Sidebar visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 },
  label: { color: '#FFFFFF', fontWeight: '600', marginBottom: 6 },
  servicos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  servicoItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 8,
    marginBottom: 8,
  },
  servicoSelected: { backgroundColor: '#2b2b2b', borderColor: '#555' },
  servicoText: { color: '#FFFFFF' },
  servicoTextSelected: { fontWeight: '700' },
  timesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  timeItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 8,
    marginBottom: 8,
  },
  timeSelected: { backgroundColor: '#2b2b2b', borderColor: '#555' },
  timeDisabled: { opacity: 0.35, backgroundColor: '#111' },
  timeText: { color: '#FFFFFF' },
  timeTextSelected: { fontWeight: '700' },
  timeTextDisabled: { color: '#777' },
});
