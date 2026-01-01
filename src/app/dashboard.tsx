import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header
        title="Dashboard"
        onMenuPress={() => setMenuAberto(true)}
      />

      <View style={styles.content}>
        <Text style={styles.welcome}>Bem-vindo ao sistema</Text>
      </View>

      <Sidebar
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  welcome: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
