export abstract class Produit {
  private libelle: string
  private poids: number

  constructor(libelle: string, poids: number) {
    this.libelle = libelle
    this.poids = poids
  }

  public getLibelle(): string {
    return this.libelle
  }

  public getPoids(): number {
    return this.poids
  }

  public setLibelle(libelle: string): void {
    this.libelle = libelle
  }

  public setPoids(poids: number): void {
    this.poids = poids
  }

  // public abstract info(): void // Supprimé pour la gestion de l'affichage par l'interface
}
