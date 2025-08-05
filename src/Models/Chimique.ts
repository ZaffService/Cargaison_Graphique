import { Produit } from "./Produit"

export class Chimique extends Produit {
  private degreToxicite: number

  constructor(libelle: string, poids: number, degreToxicite: number) {
    super(libelle, poids)
    if (degreToxicite < 1 || degreToxicite > 10) {
      throw new Error("Le degré de toxicité doit être entre 1 et 10.")
    }
    this.degreToxicite = degreToxicite
  }

  public getDegreToxicite(): number {
    return this.degreToxicite
  }

  public setDegreToxicite(degreToxicite: number): void {
    if (degreToxicite < 1 || degreToxicite > 10) {
      throw new Error("Le degré de toxicité doit être entre 1 et 10.")
    }
    this.degreToxicite = degreToxicite
  }

  // public info(): void { // Supprimé
  //   console.log(`--- Produit Chimique ---`)
  //   console.log(`Libellé: ${this.getLibelle()}`)
  //   console.log(`Poids: ${this.getPoids()} kg`)
  //   console.log(`Degré de toxicité: ${this.degreToxicite}`)
  // }
}
