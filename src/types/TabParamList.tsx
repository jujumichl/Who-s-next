// Types des routes, partagés entre le navigateur et les écrans
export type TabParamList = {
  Accueil: undefined;
  Reglages: undefined;
};

export type Objet = {
  id: string;
  nom: string;
  turn: boolean;
  creeLe: number;
};
 
export type NouvelObjet = Omit<Objet, 'id' | 'creeLe'>;

export type turnOf = Objet;