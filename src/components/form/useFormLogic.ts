import { useState } from "react";
import { validationRules } from "./rulesForm";

export interface FormInputs {
  firstName: string;
  lastName: string;
  date: Date | null;
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

export const useFormLogic = (initialState: Omit<FormInputs, "date">) => {
  const [formData, setFormData] =
    useState<Omit<FormInputs, "date">>(initialState);
  const [date, setDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<
    Record<keyof FormInputs, string | undefined>
  >({
    firstName: undefined,
    lastName: undefined,
    date: undefined,
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
      date: undefined,
      street: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
      department: undefined,
    };

    validationRules.forEach(({ field }) => {
      if (field === "date") {
        // Validation de la date (state local) séparément
        newErrors.date = validateField(field, date);
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

  const setDateWithValidation = (selectedDate: Date | null) => {
    setDate(selectedDate);

    // Valider immédiatement la date
    setErrors((prev) => ({
      ...prev,
      date: validateField("date", selectedDate),
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

      // Vérifie si des erreurs sont présentes
      if (Object.values(newErrors).some((error) => error !== undefined)) {
        setErrors(newErrors);
      } else {
        // Si pas d'erreurs, on reset et on appelle onSuccess
        setErrors({
          firstName: undefined,
          lastName: undefined,
          date: undefined,
          street: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          department: undefined,
        });
        onSuccess({ ...formData, date });
      }
    };

  return {
    formData,
    date,
    errors,
    setDate: setDateWithValidation,
    handleChange,
    handleDropdownChange,
    handleSubmit,
  };
};
