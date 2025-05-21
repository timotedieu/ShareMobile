import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { apiFetch } from '@/constants/api';

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

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await apiFetch('/fichiers');
        setFiles(data);
      } catch {
      }
    };
    fetchFiles();
  }, []);

  const renderItem = ({ item }: { item: File }) => (
    <View style={styles.fileItem}>
      <ThemedText type="defaultSemiBold">{item.nom_original}</ThemedText>
      <ThemedText>Envoyé par l'utilisateur ID : {item.user_id}</ThemedText>
      <ThemedText>Date d'envoi : {new Date(item.date_envoi).toLocaleDateString()}</ThemedText>
      <ThemedText>Extension : {item.extension}</ThemedText>
      <ThemedText>Taille : {(item.taille / 1024).toFixed(2)} Ko</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Fichiers partagés
      </ThemedText>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: {
    marginTop: 16,
    width: '100%',
  },
  fileItem: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },
});
