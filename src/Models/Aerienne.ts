import { Alimentaire } from "./Alimentaire.js" 
import { Cargaison } from "./Cargaison.js" 
import { Chimique } from "./Chimique.js" 
import { Materiel } from "./Materiel.js" 
import type { Produit } from "./Produit.js" 

export class Aerienne extends Cargaison {
  constructor(distance: number) {
    super(distance)
  }

  protected estProduitCompatible(produit: Produit): boolean {
    if (produit instanceof Chimique) {
      return false
    }
    return true
  }

  public calculerFrais(produit: Produit): number {
    const distance = this.getDistance()
    const poids = produit.getPoids()

    if (produit instanceof Alimentaire) {
      return poids * distance * 300
    } else if (produit instanceof Materiel) {
      return poids * 1000
    }

    return 0
  }
}
