import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { apiFetch } from '@/constants/api';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpeg', 'jpg'];
const MAX_SIZE = 200 * 1024;

export default function ShareFileScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    // Correction : DocumentPicker retourne un objet avec .type et .name/.size à la racine
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg',
      ],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleShareFile = async () => {
    if (!file || file.type !== 'success') {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier.');
      return;
    }

    // Correction : certains DocumentPicker ne donnent pas .size, il faut fallback à 0
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const size = file.size ?? 0;
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      Alert.alert('Erreur', 'Seuls les fichiers PDF, PNG, JPEG, JPG sont autorisés.');
      return;
    }
    if (size > MAX_SIZE) {
      Alert.alert('Erreur', 'Le fichier ne doit pas dépasser 200 Ko.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      // Ajout du fichier réel dans le formData
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type:
          ext === 'pdf'
            ? 'application/pdf'
            : ext === 'png'
            ? 'image/png'
            : 'image/jpeg',
      } as any);
      formData.append('nom_original', file.name);
      formData.append('nom_serveur', `server_${file.name}`);
      formData.append('date_envoi', new Date().toISOString());
      formData.append('extension', ext);
      formData.append('taille', `${size}`);

      await apiFetch('/fichiers', {
        method: 'POST',
        body: formData,
        headers: {
          // Ne pas forcer Content-Type ici, fetch le gère pour FormData
        },
      });

      Alert.alert('Succès', 'Fichier partagé avec succès.');
      setFile(null);
    } catch (error) {
      Alert.alert('Erreur', 'Échec du partage du fichier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        <Text style={{ color: '#1E90FF' }}>Partager</Text>
        <Text style={{ color: '#32CD32' }}> un fichier</Text>
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Sélectionnez un fichier PDF, PNG, JPEG ou JPG (max 200 Ko)
      </ThemedText>
      <TouchableOpacity
        style={styles.fileButton}
        onPress={handlePickFile}
        activeOpacity={0.85}
      >
        <Ionicons name="cloud-upload-outline" size={28} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.fileButtonText}>
          {file ? `Fichier : ${file.name}` : 'Choisir un fichier'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          (!file || loading) && styles.buttonDisabled,
        ]}
        onPress={handleShareFile}
        activeOpacity={0.85}
        disabled={!file || loading}
      >
        <Ionicons name="send" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>
          {loading ? 'Envoi...' : 'Partager'}
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 36 : 56,
    backgroundColor: '#101014',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 17,
    color: '#aaa',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 18,
    borderRadius: 22,
    backgroundColor: '#1E90FF',
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    paddingVertical: 16,
    borderRadius: 22,
    marginVertical: 18,
    justifyContent: 'center',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#32CD32',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
