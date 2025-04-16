import { useState } from 'react';
import { Button, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
// import { apiFetch } from '@/constants/api'; // API désactivée temporairement
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const { email: prefilledEmail } = useSearchParams();
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // await apiFetch('/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      // });
      Alert.alert('Succès', 'Connexion réussie (simulation)');
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.message || 'Échec de la connexion (simulation)';
      Alert.alert('Erreur', errorMessage);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Connexion</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="Créer un compte" onPress={() => router.push('/auth/register')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
