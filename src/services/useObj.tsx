import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { NouvelObjet, Objet } from '../types/TabParamList';

const STORAGE_KEY = 'objets';

function useObjetsStore() {
  const [objets, setObjets] = useState<Objet[]>([]);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const brut = await AsyncStorage.getItem(STORAGE_KEY);
        if (brut !== null) setObjets(JSON.parse(brut) as Objet[]);
      } catch (e) {
        console.warn('Lecture impossible', e);
      } finally {
        setCharge(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!charge) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(objets)).catch((e) =>
      console.warn('Écriture impossible', e)
    );
  }, [objets, charge]);

  const ajouter = useCallback((donnees: NouvelObjet) => {
    const objet: Objet = {
      ...donnees,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      creeLe: Date.now(),
    };
    setObjets((liste) => {
      const base = donnees.turn
        ? liste.map((o) => ({ ...o, turn: false }))
        : liste;
      return [objet, ...base];
    });
  }, []);

  const supprimer = useCallback((id: string) => {
    setObjets((liste) => liste.filter((o) => o.id !== id));
  }, []);

  const tourSuivant = useCallback(() => {
    setObjets((liste) => {
      if (liste.length === 0) return liste;
      const i = liste.findIndex((o) => o.turn);
      const prochain = (i + 1) % liste.length; 
      return liste.map((o, idx) => ({ ...o, turn: idx === prochain }));
    });
  }, []);

  return { objets, charge, ajouter, supprimer, tourSuivant };
}

type ObjetsContextType = ReturnType<typeof useObjetsStore>;
const ObjetsContext = createContext<ObjetsContextType | null>(null);

export function ObjetsProvider({ children }: { children: ReactNode }) {
  const valeur = useObjetsStore();
  return <ObjetsContext.Provider value={valeur}>{children}</ObjetsContext.Provider>;
}

export function useObjets() {
  const ctx = useContext(ObjetsContext);
  if (!ctx) throw new Error('useObjets doit être utilisé dans un <ObjetsProvider>');
  return ctx;
}