import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../src/components/form/Form";

describe("Form Component", () => {
  test("affiche des erreurs lorsque les champs sont soumis vides", () => {
    render(<Form />);

    const submitButton = screen.getByText("S'inscrire");

    fireEvent.click(submitButton);

    expect(
      screen.getByText("Le prénom doit contenir au moins 2 caractères.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Le nom doit contenir au moins 2 caractères.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("La date est requise et doit être valide.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("La rue est requise et ne peut pas être vide.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("La ville doit contenir au moins 2 caractères.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vous devez choisir un state.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vous devez choisir un department.")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Le code postal doit être au format valide (5 chiffres ou 5+4)."
      )
    ).toBeInTheDocument();
  });

  test("supprime les erreurs lorsque des champs valides sont saisis", () => {
    render(<Form />);

    const firstNameInput = screen.getByLabelText("Prénom");
    const lastNameInput = screen.getByLabelText("Nom");
    const dateInput = screen.getByPlaceholderText("Sélectionnez une date");
    const streetInput = screen.getByLabelText("Street");
    const cityInput = screen.getByLabelText("City");
    const zipCodeInput = screen.getByLabelText("ZipCode");

    fireEvent.change(firstNameInput, { target: { value: "Jean" } });
    fireEvent.change(lastNameInput, { target: { value: "Dupont" } });
    fireEvent.change(dateInput, { target: { value: "2023-01-01" } });
    fireEvent.change(streetInput, { target: { value: "123 Rue Principale" } });
    fireEvent.change(cityInput, { target: { value: "Paris" } });
    fireEvent.change(zipCodeInput, { target: { value: "75001" } });

    const submitButton = screen.getByText("S'inscrire");
    fireEvent.click(submitButton);

    expect(
      screen.queryByText("Le prénom doit contenir au moins 2 caractères.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Le nom doit contenir au moins 2 caractères.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("La date est requise et doit être valide.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("La rue est requise et ne peut pas être vide.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("La ville doit contenir au moins 2 caractères.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Le code postal doit être au format valide (5 chiffres ou 5+4)."
      )
    ).not.toBeInTheDocument();
  });

  test("affiche une erreur si un champ devient invalide après modification", () => {
    render(<Form />);

    const firstNameInput = screen.getByLabelText("Prénom");

    fireEvent.change(firstNameInput, { target: { value: "Jean" } });
    fireEvent.change(firstNameInput, { target: { value: "J" } });

    expect(
      screen.getByText("Le prénom doit contenir au moins 2 caractères.")
    ).toBeInTheDocument();
  });

  test("affiche une erreur pour un code postal invalide", () => {
    render(<Form />);

    const zipCodeInput = screen.getByLabelText("ZipCode");

    fireEvent.change(zipCodeInput, { target: { value: "123" } });

    expect(
      screen.getByText(
        "Le code postal doit être au format valide (5 chiffres ou 5+4)."
      )
    ).toBeInTheDocument();
  });
});
