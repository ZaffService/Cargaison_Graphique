import { Aerienne } from "./Models/Aerienne.js"
import { Alimentaire } from "./Models/Alimentaire.js"
import { Chimique } from "./Models/Chimique.js"
import { Fragile } from "./Models/Fragile.js"
import { Incassable } from "./Models/Incassable.js"
import { Maritime } from "./Models/Maritime.js"
import { Routiere } from "./Models/Routiere.js"
import type { Cargaison } from "./Models/Cargaison.js"
import type { Produit } from "./Models/Produit.js"

const cargaisons: Cargaison[] = []
let currentProduct: Produit | null = null

// DOM Elements
const productForm = document.querySelector("#product-form") as HTMLFormElement
const productTypeSelect = document.querySelector("#product-type") as HTMLSelectElement
const productLibelleInput = document.querySelector("#product-libelle") as HTMLInputElement
const productPoidsInput = document.querySelector("#product-poids") as HTMLInputElement
const chimiqueFieldsDiv = document.querySelector("#chimique-fields") as HTMLDivElement
const productToxiciteInput = document.querySelector("#product-toxicite") as HTMLInputElement
const productMessageDiv = document.querySelector("#product-message") as HTMLDivElement
const currentProductDisplayDiv = document.querySelector("#current-product-display") as HTMLDivElement
const cargaisonSelect = document.querySelector("#cargaison-select") as HTMLSelectElement
const addProductToCargaisonBtn = document.querySelector("#add-product-to-cargaison") as HTMLButtonElement
const addProductMessageDiv = document.querySelector("#add-product-message") as HTMLDivElement
const cargaisonsContainerDiv = document.querySelector("#cargaisons-container") as HTMLDivElement

function initializeCargaisons() {
  cargaisons.push(new Aerienne(500))
  cargaisons.push(new Maritime(2000))
  cargaisons.push(new Routiere(150))
  renderCargaisons()
  populateCargaisonSelect()
}


function renderCargaisons() {
  cargaisonsContainerDiv.innerHTML = "" 
  cargaisons.forEach((cargaison, index) => {
    const cargaisonType =
      cargaison instanceof Aerienne ? "Aérienne" : cargaison instanceof Maritime ? "Maritime" : "Routière"
    const cargaisonElement = document.createElement("div")
    cargaisonElement.className = "bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
    cargaisonElement.innerHTML = `
            <h3 class="text-xl font-semibold mb-2 text-blue-700">${cargaisonType} (Distance: ${cargaison.getDistance()} km)</h3>
            <p class="text-gray-700">Produits: <span class="font-medium">${cargaison.nbProduits()} / 10</span></p>
            <p class="text-gray-700">Coût Total: <span class="font-bold text-lg text-green-600">${cargaison.sommeTotale().toLocaleString("fr-FR")} F</span></p>
            <div class="mt-3">
                <h4 class="text-md font-medium text-gray-800">Détails des Produits:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600" id="products-list-${index}">
                    ${cargaison
                      .getProduits()
                      .map(
                        (p) => `
                        <li>
                            ${p.getLibelle()} (${p.getPoids()} kg) 
                            ${p instanceof Chimique ? ` - Toxicité: ${p.getDegreToxicite()}` : ""}
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        `
    cargaisonsContainerDiv.appendChild(cargaisonElement)
  })
}

function populateCargaisonSelect() {
  cargaisonSelect.innerHTML = ""
  cargaisons.forEach((cargaison, index) => {
    const cargaisonType =
      cargaison instanceof Aerienne ? "Aérienne" : cargaison instanceof Maritime ? "Maritime" : "Routière"
    const option = document.createElement("option")
    option.value = String(index)
    option.textContent = `${cargaisonType} (ID: ${index + 1}, ${cargaison.nbProduits()} produits)`
    cargaisonSelect.appendChild(option)
  })
}

function displayMessage(element: HTMLElement, message: string, isError = false) {
  element.textContent = message
  element.className = `mt-4 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`
}

function updateCurrentProductDisplay() {
  if (currentProduct) {
    currentProductDisplayDiv.innerHTML = `
            <span class="font-semibold">${currentProduct.getLibelle()}</span> 
            (${currentProduct.getPoids()} kg)
            ${currentProduct instanceof Chimique ? ` - Toxicité: ${currentProduct.getDegreToxicite()}` : ""}
        `
    currentProductDisplayDiv.classList.remove("bg-gray-50")
    currentProductDisplayDiv.classList.add("bg-blue-50")
  } else {
    currentProductDisplayDiv.textContent = "Aucun produit créé"
    currentProductDisplayDiv.classList.remove("bg-blue-50")
    currentProductDisplayDiv.classList.add("bg-gray-50")
  }
}


productTypeSelect.addEventListener("change", () => {
  if (productTypeSelect.value === "Chimique") {
    chimiqueFieldsDiv.classList.remove("hidden")
    productToxiciteInput.setAttribute("required", "true")
  } else {
    chimiqueFieldsDiv.classList.add("hidden")
    productToxiciteInput.removeAttribute("required")
  }
})

productForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const type = productTypeSelect.value
  const libelle = productLibelleInput.value
  const poids = Number.parseFloat(productPoidsInput.value)
  const toxicite = productToxiciteInput.value ? Number.parseInt(productToxiciteInput.value) : undefined

  try {
    let newProduct: Produit
    switch (type) {
      case "Alimentaire":
        newProduct = new Alimentaire(libelle, poids)
        break
      case "Chimique":
        if (toxicite === undefined || isNaN(toxicite)) {
          throw new Error("Le degré de toxicité est requis pour les produits chimiques.")
        }
        newProduct = new Chimique(libelle, poids, toxicite)
        break
      case "Fragile":
        newProduct = new Fragile(libelle, poids)
        break
      case "Incassable":
        newProduct = new Incassable(libelle, poids)
        break
      default:
        throw new Error("Type de produit inconnu.")
    }
    currentProduct = newProduct
    displayMessage(productMessageDiv, `Produit "${libelle}" créé avec succès !`, false)
    updateCurrentProductDisplay()
    productForm.reset() 
    chimiqueFieldsDiv.classList.add("hidden") 
  } catch (error: any) {
    displayMessage(productMessageDiv, `Erreur: ${error.message}`, true)
    currentProduct = null
    updateCurrentProductDisplay()
  }
})

addProductToCargaisonBtn.addEventListener("click", () => {
  if (!currentProduct) {
    displayMessage(addProductMessageDiv, "Veuillez d'abord créer un produit.", true)
    return
  }

  const selectedCargaisonIndex = Number.parseInt(cargaisonSelect.value)
  const selectedCargaison = cargaisons[selectedCargaisonIndex]

  if (!selectedCargaison) {
    displayMessage(addProductMessageDiv, "Veuillez sélectionner une cargaison valide.", true)
    return
  }

  const success = selectedCargaison.ajouterProduit(currentProduct)
  if (success) {
    displayMessage(
      addProductMessageDiv,
      `Produit "${currentProduct.getLibelle()}" ajouté à la cargaison ${selectedCargaisonIndex + 1}.`,
      false,
    )
    currentProduct = null 
    updateCurrentProductDisplay()
    renderCargaisons() 
    populateCargaisonSelect() 
  } else {
    let errorMessage = `Impossible d'ajouter "${currentProduct.getLibelle()}" à cette cargaison.`
    if (selectedCargaison.nbProduits() >= 10) {
      errorMessage = `La cargaison est pleine (max 10 produits). Impossible d'ajouter ce produit.`
    } else if (
      currentProduct instanceof Chimique &&
      (selectedCargaison instanceof Aerienne || selectedCargaison instanceof Routiere)
    ) {
      errorMessage = `Les produits chimiques ne sont pas autorisés dans les cargaisons ${selectedCargaison instanceof Aerienne ? "aériennes" : "routières"}.`
    } else if (currentProduct instanceof Fragile && selectedCargaison instanceof Maritime) {
      errorMessage = `Les produits fragiles ne sont pas autorisés dans les cargaisons maritimes.`
    }
    displayMessage(addProductMessageDiv, errorMessage, true)
  }
})

document.addEventListener("DOMContentLoaded", () => {
  initializeCargaisons()
  updateCurrentProductDisplay()
})
