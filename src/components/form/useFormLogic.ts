import { useState } from "react";
import { validationRules } from "./rulesForm";

export interface FormInputs {
  firstName: string;
  lastName: string;
  startDate: Date | null;
  dateOfBirth: Date | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

export interface ValidationRule {
  field: keyof FormInputs;
  validate: (value: string | Date | null) => boolean;
  errorMessage: string;
}

export const useFormLogic = (
  initialState: Omit<FormInputs, "startDate" | "dateOfBirth">
) => {
  // State pour les champs non-date
  const [formData, setFormData] =
    useState<Omit<FormInputs, "startDate" | "dateOfBirth">>(initialState);

  // States séparés pour les deux dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [errors, setErrors] = useState<
    Record<keyof FormInputs, string | undefined>
  >({
    firstName: undefined,
    lastName: undefined,
    startDate: undefined,
    dateOfBirth: undefined,
    street: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    department: undefined,
  });

  // Fonction de validation pour un champ spécifique
  const validateField = (
    field: keyof FormInputs,
    value: string | Date | null
  ): string | undefined => {
    const rule = validationRules.find((r) => r.field === field);
    if (rule && !rule.validate(value)) {
      return rule.errorMessage;
    }
    return undefined;
  };

  // Validation complète du formulaire
  const validateForm = (): Record<keyof FormInputs, string | undefined> => {
    const newErrors: Record<keyof FormInputs, string | undefined> = {
      firstName: undefined,
      lastName: undefined,
      startDate: undefined,
      dateOfBirth: undefined,
      street: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
      department: undefined,
    };

    validationRules.forEach(({ field }) => {
      if (field === "startDate") {
        newErrors.startDate = validateField(field, startDate);
      } else if (field === "dateOfBirth") {
        newErrors.dateOfBirth = validateField(field, dateOfBirth);
      } else {
        newErrors[field] = validateField(field, formData[field]);
      }
    });

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof FormInputs;
      value: string;
    };

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Valider le champ immédiatement
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const setStartDateWithValidation = (selectedDate: Date | null) => {
    setStartDate(selectedDate);
    setErrors((prev) => ({
      ...prev,
      startDate: validateField("startDate", selectedDate),
    }));
  };

  const setDateOfBirthWithValidation = (selectedDate: Date | null) => {
    setDateOfBirth(selectedDate);
    setErrors((prev) => ({
      ...prev,
      dateOfBirth: validateField("dateOfBirth", selectedDate),
    }));
  };

  const handleDropdownChange = (name: keyof FormInputs, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =
    (onSuccess: (data: FormInputs) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors = validateForm();

      // Vérifie s'il y a au moins une erreur
      if (Object.values(newErrors).some((error) => error !== undefined)) {
        setErrors(newErrors);
      } else {
        // Si pas d'erreurs, on reset et on appelle onSuccess
        setErrors({
          firstName: undefined,
          lastName: undefined,
          startDate: undefined,
          dateOfBirth: undefined,
          street: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          department: undefined,
        });
        onSuccess({
          ...formData,
          startDate,
          dateOfBirth,
        });
      }
    };

  return {
    formData,
    startDate,
    dateOfBirth,
    errors,
    setStartDate: setStartDateWithValidation,
    setDateOfBirth: setDateOfBirthWithValidation,
    handleChange,
    handleDropdownChange,
    handleSubmit,
  };
};
