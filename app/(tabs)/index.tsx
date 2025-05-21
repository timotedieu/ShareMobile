import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { apiFetch } from '@/constants/api';
import { useRouter } from 'expo-router';

type File = {
  id: string;
  user_id: string;
  nom_original: string;
  nom_serveur: string;
  date_envoi: string;
  extension: string;
  taille: number;
};

export default function HomeScreen() {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await apiFetch('/fichiers');
        setFiles(data);
      } catch {
        // Optionnel : gestion d'erreur
      }
    };
    fetchFiles();
  }, []);

  const renderItem = ({ item }: { item: File }) => (
    <View style={styles.fileItem}>
      <ThemedText type="defaultSemiBold" style={styles.fileName}>{item.nom_original}</ThemedText>
      <View style={styles.fileMetaRow}>
        <ThemedText style={styles.fileMeta}>👤 {item.user_id}</ThemedText>
        <ThemedText style={styles.fileMeta}>📅 {new Date(item.date_envoi).toLocaleDateString()}</ThemedText>
      </View>
      <View style={styles.fileMetaRow}>
        <ThemedText style={styles.fileMeta}>📄 {item.extension.toUpperCase()}</ThemedText>
        <ThemedText style={styles.fileMeta}>💾 {(item.taille / 1024).toFixed(2)} Ko</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        <Text style={{ color: '#1E90FF' }}>Share</Text>
        <Text style={{ color: '#32CD32' }}>Mobile</Text>
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Partagez et consultez vos fichiers simplement
      </ThemedText>
      {files.length === 0 ? (
        <ThemedText style={styles.emptyText}>
          Aucun fichier trouvé.
        </ThemedText>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/files/share')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
        <Text style={styles.fabText}>Partager un fichier</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 36 : 56,
    paddingHorizontal: 0,
    backgroundColor: '#101014',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    width: '100%',
  },
  fileItem: {
    backgroundColor: '#181C24',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  fileName: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  fileMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  fileMeta: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  emptyText: {
    color: '#fff',
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 32,
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: -2,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
