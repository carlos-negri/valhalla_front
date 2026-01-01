import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCliente } from '../../contexts/ClienteContext';
import { styles } from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function Sidebar({ visible, onClose }: Props) {
  const router = useRouter();
  const { logout } = useCliente();

  if (!visible) return null;

  function navegar(rota: '/dashboard' | '/lista' | '/caixa' | '/agendar') {
    onClose();
    router.replace(rota);
  }

  function sair() {
    logout();
    onClose();
    router.replace('/');
  }

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.container} onPress={() => {}}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Valhalla Barbearia e Studio</Text>

          <TouchableOpacity style={styles.item} onPress={() => navegar('/dashboard')} activeOpacity={0.8} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={styles.itemText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navegar('/lista')} activeOpacity={0.8} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={styles.itemText}>Agendamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navegar('/caixa')} activeOpacity={0.8} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={styles.itemText}>Caixa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navegar('/agendar')} activeOpacity={0.8} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={styles.itemText}>Agendar</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.logout} onPress={sair} activeOpacity={0.8} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </ScrollView>
      </Pressable>
    </Pressable>
  );
}
