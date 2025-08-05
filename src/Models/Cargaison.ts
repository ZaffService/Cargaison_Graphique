import type { Produit } from "./Produit.js" 

export abstract class Cargaison {
  private distance: number
  private produits: Produit[]
  private readonly MAX_PRODUITS: number = 10

  constructor(distance: number) {
    this.distance = distance
    this.produits = []
  }

  public getDistance(): number {
    return this.distance
  }

  public getProduits(): Produit[] {
    return this.produits
  }

  public setDistance(distance: number): void {
    this.distance = distance
  }

  public ajouterProduit(produit: Produit): boolean {
    if (this.produits.length >= this.MAX_PRODUITS) {
      return false
    }

    if (!this.estProduitCompatible(produit)) {
      return false
    }

    this.produits.push(produit)
    return true
  }

  public nbProduits(): number {
    return this.produits.length
  }

  public sommeTotale(): number {
    let totalFrais = 0
    for (const produit of this.produits) {
      totalFrais += this.calculerFrais(produit)
    }
    return totalFrais
  }

  protected abstract estProduitCompatible(produit: Produit): boolean
  public abstract calculerFrais(produit: Produit): number
}
