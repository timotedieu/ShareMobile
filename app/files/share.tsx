import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { apiFetch } from '@/constants/api';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ShareFileScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleShareFile = async () => {
    if (!file || file.type !== 'success') {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nom_original', file.name);
      formData.append('nom_serveur', `server_${file.name}`);
      formData.append('date_envoi', new Date().toISOString());
      formData.append('extension', file.name.split('.').pop() || '');
      formData.append('taille', `${file.size || 0}`);

      await apiFetch('/fichiers', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Succès', 'Fichier partagé avec succès.');
      setFile(null);
    } catch (error) {
      Alert.alert('Erreur', 'Échec du partage du fichier.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Partager un fichier</ThemedText>
      <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
        <Text style={styles.fileButtonText}>
          {file ? `Fichier sélectionné : ${file.name}` : 'Sélectionner un fichier'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleShareFile}>
        <Text style={styles.buttonText}>Partager</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#101014',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E90FF',
    textAlign: 'center',
  },
  fileButton: {
    width: '80%',
    padding: 14,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 25,
    marginVertical: 18,
    alignItems: 'center',
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
