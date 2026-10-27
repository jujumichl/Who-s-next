import { Button, StyleSheet, Text, View } from 'react-native';
import { useObjets } from '../services/useObj';

export default function HomeScreen() {
  const { objets, charge, tourSuivant } = useObjets();
  
  if (!charge) return <Text>Chargement…</Text>;

  const conducteur = objets.find((o) => o.turn);

  return (
    <View style={styles.conteneur}>
      {conducteur ? (
        <>
          <Text style={styles.label}>C'est au tour de</Text>
          <Text style={styles.nom}>{conducteur.nom}</Text>
          <Button title="Tour suivant" onPress={tourSuivant} />
        </>
      ) : (
        <Text style={styles.label}>
          Personne n'est désigné. Ajoute quelqu'un dans l'onglet Équipage.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  label: { fontSize: 18, color: '#666', textAlign: 'center' },
  nom: { fontSize: 40, fontWeight: '700', color: '#2563eb' },
});