import { Produit } from "./Produit.js" 

export abstract class Materiel extends Produit {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }
}
