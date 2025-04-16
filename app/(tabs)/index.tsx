import { Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bienvenue sur Share Mobile</ThemedText>
      <ThemedText style={styles.subtitle}>
        Partagez vos fichiers et explorez notre blog.
      </ThemedText>
      <Button title="Partager un fichier" onPress={() => router.push('/files/share')} />
      <Button title="Accéder au blog" onPress={() => router.push('/blog')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginVertical: 16,
    textAlign: 'center',
  },
});
