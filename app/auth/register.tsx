import { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { apiFetch } from '@/constants/api';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      Alert.alert('Succès', 'Inscription réussie');
      router.push({ pathname: '/auth/login', params: { email } });
    } catch (error) {
      Alert.alert('Erreur', 'Échec de l\'inscription');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Inscription</ThemedText>
      <TextInput
        style={[styles.input, styles.inputText, styles.inputRounded, styles.inputShadow]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, styles.inputText, styles.inputRounded, styles.inputShadow]}
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, styles.inputText, styles.inputRounded, styles.inputShadow]}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/auth/login')}>
        <Text style={styles.buttonText}>Retour à la connexion</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputText: {
    color: '#000',
  },
  inputRounded: {
    borderRadius: 25,
  },
  inputShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
    backgroundColor: '#007BFF', // Modern blue
  },
  secondaryButton: {
    backgroundColor: '#6C757D', // Neutral gray
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
