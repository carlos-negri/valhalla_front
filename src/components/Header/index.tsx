import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  title: string;
  onMenuPress: () => void;
};

export function Header({ title, onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
