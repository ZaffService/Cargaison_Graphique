import { Alimentaire } from "./Alimentaire.js" // Ajout de .js
import { Cargaison } from "./Cargaison.js" // Ajout de .js
import { Fragile } from "./Fragile.js" // Ajout de .js
import { Materiel } from "./Materiel.js" // Ajout de .js
import { Chimique } from "./Chimique.js" // Ajout de .js
import type { Produit } from "./Produit.js" // Ajout de .js

export class Maritime extends Cargaison {
  private readonly FRAIS_BASE: number = 5000

  constructor(distance: number) {
    super(distance)
  }

  protected estProduitCompatible(produit: Produit): boolean {
    if (produit instanceof Fragile) {
      return false
    }
    return true
  }

  public calculerFrais(produit: Produit): number {
    const distance = this.getDistance()
    const poids = produit.getPoids()
    let fraisProduit = 0

    if (produit instanceof Alimentaire) {
      fraisProduit = poids * distance * 90
    } else if (produit instanceof Chimique) {
      const degreToxicite = (produit as Chimique).getDegreToxicite()
      fraisProduit = poids * 500 * degreToxicite + 10000
    } else if (produit instanceof Materiel) {
      fraisProduit = poids * distance * 400
    }

    return this.FRAIS_BASE + fraisProduit
  }
}
