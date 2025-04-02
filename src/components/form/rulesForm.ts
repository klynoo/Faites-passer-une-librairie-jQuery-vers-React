import { ValidationRule } from "./useFormLogic";

export const validationRules: ValidationRule[] = [
  {
    field: "firstName",
    validate: (value) => /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(String(value).trim()),
    errorMessage: "Le prénom doit contenir au moins 2 caractères.",
  },
  {
    field: "lastName",
    validate: (value) => /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(String(value).trim()),
    errorMessage: "Le nom doit contenir au moins 2 caractères.",
  },
  {
    field: "startDate",
    validate: (value) => value instanceof Date && !isNaN(value.getTime()),
    errorMessage: "La date est requise et doit être valide.",
  },
  {
    field: "dateOfBirth",
    validate: (value) => value instanceof Date && !isNaN(value.getTime()),
    errorMessage: "La date est requise et doit être valide.",
  },
  {
    field: "street",
    validate: (value) => typeof value === "string" && value.trim().length > 0,
    errorMessage: "La rue est requise et ne peut pas être vide.",
  },
  {
    field: "city",
    validate: (value) =>
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/.test(String(value).trim()),
    errorMessage: "La ville doit contenir au moins 2 caractères.",
  },
  {
    field: "state",
    validate: (value) => value !== "",
    errorMessage: "Vous devez choisir un state.",
  },
  {
    field: "zipCode",
    validate: (value) => /^\d{5}(-\d{4})?$/.test(String(value).trim()),
    errorMessage:
      "Le code postal doit être au format valide (5 chiffres ou 5+4).",
  },
  {
    field: "department",
    validate: (value) => value !== "",
    errorMessage: "Vous devez choisir un department.",
  },
];

export default validationRules;
