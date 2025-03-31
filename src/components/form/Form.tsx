import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "npm-bk";
import COUNTRIES from "../../constants/countries";
import DEPARTEMENTS from "../../constants/departements";
import { useFormLogic, FormInputs } from "./useFormLogic";
import useEmployeeStore from "../../store/Store";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => (
  <FieldContainer>
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FieldContainer>
);

const Form: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);

  const {
    formData,
    date,
    errors,
    setDate,
    handleChange,
    handleDropdownChange,
    handleSubmit,
  } = useFormLogic({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const onSubmitSuccess = (data: FormInputs) => {
    const newEmployee = {
      firstName: data.firstName,
      lastName: data.lastName,
      startDate: new Date().toISOString().split("T")[0], // Date actuelle
      department: data.department,
      dateOfBirth: date ? date.toISOString().split("T")[0] : "",
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    };

    addEmployee(newEmployee);
    console.log("Employé ajouté :", newEmployee);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <PageBackground>
      <FormContainer onSubmit={handleSubmit(onSubmitSuccess)}>
        <Title>Formulaire d'inscription</Title>

        <InputField
          label="Prénom"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName || null}
        />

        <InputField
          label="Nom"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName || null}
        />

        <FieldContainer>
          <Label>Date de naissance</Label>
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Sélectionnez une date"
            className="w-full px-4 py-2 bg-transparent focus:outline-none text-gray-700"
          />
          {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        </FieldContainer>

        <InputField
          label="Street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          error={errors.street || null}
        />

        <InputField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city || null}
        />

        <FieldContainer>
          <Label>State</Label>
          <Dropdown
            options={COUNTRIES.map((country) => ({
              label: country,
              value: country,
            }))}
            onSelect={(value: string) => handleDropdownChange("state", value)}
            label="state"
            selectedValue={formData.state}
          />
          {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
        </FieldContainer>

        <InputField
          label="ZipCode"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode || null}
        />

        <FieldContainer>
          <Label>Department</Label>
          <Dropdown
            options={DEPARTEMENTS.map((departement) => ({
              label: departement,
              value: departement,
            }))}
            onSelect={(value: string) =>
              handleDropdownChange("department", value)
            }
            label="department"
            selectedValue={formData.department}
          />
          {errors.department && (
            <ErrorMessage>{errors.department}</ErrorMessage>
          )}
        </FieldContainer>

        <SubmitButton type="submit">S'inscrire</SubmitButton>

        {success && (
          <SuccessMessage>Employé ajouté avec succès !</SuccessMessage>
        )}
      </FormContainer>
    </PageBackground>
  );
};

export default Form;

const PageBackground = styled.div`
  /* Large background, can be a gradient or solid color */
  min-height: 100vh;
  background: linear-gradient(120deg, #f0f0f0, #fafafa);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);

  /* Responsive design */
  @media (max-width: 500px) {
    max-width: 95%;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  color: #333;
  letter-spacing: 0.5px;
`;

const FieldContainer = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #444;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${({ error }) => (error ? "#e74c3c" : "#ccc")};
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ error }) => (error ? "#e74c3c" : "#3498db")};
    box-shadow: 0 0 0 3px
      ${({ error }) =>
        error ? "rgba(231, 76, 60, 0.2)" : "rgba(52, 152, 219, 0.2)"};
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.1s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 12px 20px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
`;
