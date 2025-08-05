import { Materiel } from "./Materiel.js" 

export class Fragile extends Materiel {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }
}
