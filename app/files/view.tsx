import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { apiFetch } from '@/constants/api';

type File = {
  id: number;
  nomOriginal: string;
  nomServeur: string;
  dateEnvoi: string;
  extension: string;
  taille: number;
  user?: string;
};

export default function FilesTabScreen() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setError(null);
        const data = await apiFetch('/fichiers');
        setFiles(data['hydra:member'] || []);
      } catch (e: any) {
        setFiles([]);
        setError(e?.message || 'Erreur inconnue');
      }
    };
    fetchFiles();
  }, []);

  const renderItem = ({ item }: { item: File }) => (
    <View style={styles.fileItem}>
      <ThemedText type="defaultSemiBold" style={styles.fileName}>{item.nomOriginal}</ThemedText>
      <View style={styles.fileMetaRow}>
        <ThemedText style={styles.fileMeta}>👤 {item.user ? item.user.split('/').pop() : '-'}</ThemedText>
        <ThemedText style={styles.fileMeta}>📅 {new Date(item.dateEnvoi).toLocaleDateString()}</ThemedText>
      </View>
      <View style={styles.fileMetaRow}>
        <ThemedText style={styles.fileMeta}>📄 {item.extension?.toUpperCase()}</ThemedText>
        <ThemedText style={styles.fileMeta}>💾 {(item.taille / 1024).toFixed(2)} Ko</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Fichiers partagés
      </ThemedText>
      {error ? (
        <ThemedText style={[styles.emptyText, { color: 'red' }]}>
          Erreur : {error}
        </ThemedText>
      ) : files.length === 0 ? (
        <ThemedText style={styles.emptyText}>
          Aucun fichier trouvé.
        </ThemedText>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: '#101014',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1E90FF',
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
});
