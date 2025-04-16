import { useEffect, useState } from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { apiFetch } from '@/constants/api';

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiFetch('/auth/check'); 
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bienvenue sur Share Mobile</ThemedText>
      <ThemedText style={styles.subtitle}>
        {isAuthenticated
          ? 'Partagez vos fichiers et explorez notre blog.'
          : 'Connectez-vous ou inscrivez-vous pour accéder aux fonctionnalités.'}
      </ThemedText>
      {isAuthenticated ? (
        <>
          <Button title="Partager un fichier" onPress={() => router.push('/files/share')} />
          <Button title="Accéder au blog" onPress={() => router.push('/blog')} />
        </>
      ) : (
        <>
          <Button title="Se connecter" onPress={() => router.push('/auth/login')} />
          <Button title="S'inscrire" onPress={() => router.push('/auth/register')} />
        </>
      )}
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
