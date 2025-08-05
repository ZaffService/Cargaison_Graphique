import { Materiel } from "./Materiel.js" 

export class Incassable extends Materiel {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }
}
