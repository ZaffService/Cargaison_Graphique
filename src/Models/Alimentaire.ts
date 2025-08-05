import { Produit } from "./Produit.js"

export class Alimentaire extends Produit {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }

  // public info(): void { // Supprimé
  //   console.log(`--- Produit Alimentaire ---`)
  //   console.log(`Libellé: ${this.getLibelle()}`)
  //   console.log(`Poids: ${this.getPoids()} kg`)
  // }
}
