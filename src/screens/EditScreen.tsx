import { useState } from 'react';
import {
    Button,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { useObjets } from '../services/useObj';

export default function EditScreen() {
    const { objets, charge, ajouter, supprimer } = useObjets();
    const [nom, setNom] = useState('');
    const [turn, setTurn] = useState<boolean | null>(null);

    const creer = () => {
        if (nom.trim() === '' || turn === null) return;
        ajouter({ nom: nom.trim(), turn });
        setNom('');
        setTurn(null);
    };

    if (!charge) {
        return (
            <View style={styles.centre}>
                <Text>Chargement…</Text>
            </View>
        );
    }
    return (
        <View style={styles.conteneur}>
            <View style={styles.formulaire}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={nom}
                    onChangeText={setNom}
                />
                <Text style={styles.txt}>C'est a son tour ?</Text>

                <View style={styles.zone}>
                    <Pressable
                        onPress={() => setTurn(true)}
                        style={({ pressed }) => [
                            styles.btn,
                            turn === true && styles.btnActif,
                            pressed && styles.btnPressed,
                        ]}
                    >
                        <Text style={styles.txt}>Oui</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setTurn(false)}
                        style={({ pressed }) => [
                            styles.btn,
                            turn === false && styles.btnActif,
                            pressed && styles.btnPressed,
                        ]}
                    >
                        <Text style={styles.txt}>Non</Text>
                    </Pressable>
                </View>

                <Button
                    title="Ajouter"
                    onPress={creer}
                    disabled={nom.trim() === '' || turn === null}
                />
            </View>

            <FlatList
                data={objets}
                keyExtractor={(o) => o.id}
                contentContainerStyle={styles.liste}
                ListEmptyComponent={<Text style={styles.vide}>Aucun membre pour l'instant.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.carte}>
                        <View style={styles.carteTexte}>
                            <Text style={styles.carteNom}>{item.nom}</Text>
                        </View>
                        <Button title="Suppr." color="#c0392b" onPress={() => supprimer(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centre: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    conteneur: { flex: 1, padding: 16, gap: 16 },
    formulaire: { gap: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    liste: { gap: 8 },
    vide: { color: '#666', textAlign: 'center', marginTop: 24 },
    carte: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
        padding: 12,
    },
    carteTexte: { flex: 1 },
    carteNom: { fontSize: 16, fontWeight: '600' },
    txt: {
        fontSize: 16,
        alignSelf: 'center',
    },

    btn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#ccc',
    },
    btnActif: { backgroundColor: '#4a90e2' },
    btnPressed: { opacity: 0.6 }, zone: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f2f2f2',
    },
});