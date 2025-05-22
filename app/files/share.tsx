import { useState } from 'react'; 
import { StyleSheet, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
// import { apiFetch } from '@/constants/api'; // plus utilisé ici
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpeg', 'jpg'];
const MAX_SIZE = 200 * 1024; // 200 Ko

export default function ShareFileScreen() {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
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

    console.log('DocumentPicker result:', result);

    if (result.canceled === false) {
      if (result.assets && Array.isArray(result.assets) && result.assets.length > 0) {
        setFile(result.assets[0]);
      } else {
        setFile(result);
      }
    }
  };

  const handleShareFile = async () => {
    if (!file || !file.name) {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier.');
      return;
    }

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
      const payload = {
        user: '/api/users/1',  // relation attendue sous forme d'URI
        nomOriginal: file.name,
        nomServeur: `server_${file.name}`,
        dateEnvoi: new Date().toISOString(),
        extension: ext,
        taille: size,
      };

      console.log('Payload envoyé:', JSON.stringify(payload));

      const response = await fetch('http://127.0.0.1:8000/api/fichiers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'Accept': 'application/ld+json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Réponse serveur:', data);

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      Alert.alert('Succès', 'Données partagées avec succès.');
      setFile(null);
    } catch (error) {
      Alert.alert('Erreur', 'Échec du partage des données.');
      console.error(error);
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
          {file && file.name ? `Fichier : ${file.name}` : 'Choisir un fichier'}
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
