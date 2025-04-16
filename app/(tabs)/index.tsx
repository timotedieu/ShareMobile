import { useEffect, useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View } from 'react-native';
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

  const handlePress = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      Alert.alert('Accès refusé', 'Vous devez être connecté pour accéder à cette fonctionnalité.', [
        { text: 'Se connecter', onPress: () => router.push('/auth/login') },
        { text: 'Annuler', style: 'cancel' },
      ]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Bienvenue sur Share Mobile
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        {isAuthenticated
          ? 'Partagez vos fichiers.'
          : 'Connectez-vous ou inscrivez-vous pour accéder aux fonctionnalités.'}
      </ThemedText>
      <View style={styles.buttonContainer}>
        {isAuthenticated ? (
          <>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handlePress('/files/share')}>
              <Text style={styles.buttonText}>Partager un fichier</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => router.push('/auth/login')}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/auth/register')}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#1E90FF',
  },
  secondaryButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
