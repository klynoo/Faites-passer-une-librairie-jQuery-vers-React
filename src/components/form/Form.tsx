import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "../Dropdown";
import COUNTRIES from "../../constants/countries";
import DEPARTEMENTS from "../../constants/departements";
import { useFormLogic, FormInputs } from "./useFormLogic";
import useEmployeeStore from "../Store";

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
  };

  return (
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
          className="custom-datepicker"
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

      <InputField
        label="ZipCode"
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        error={errors.zipCode || null}
      />

      <Dropdown
        options={DEPARTEMENTS.map((departement) => ({
          label: departement,
          value: departement,
        }))}
        onSelect={(value: string) => handleDropdownChange("department", value)}
        label="department"
        selectedValue={formData.department}
      />
      {errors.department && <ErrorMessage>{errors.department}</ErrorMessage>}

      <SubmitButton type="submit">S'inscrire</SubmitButton>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const FieldContainer = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "#007bff")};
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
