import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface DropdownProps {
  options: { label: string; value: string; disabled?: boolean }[];
  onSelect: (value: string) => void;
  label?: string;
  direction?: "down" | "up";
  buttonStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  selectedValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label = "Select an option",
  direction = "down",
  buttonStyle,
  itemStyle,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string, disabled?: boolean) => {
    if (disabled) return;
    onSelect(value);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownLabel>{label}</DropdownLabel>
      <DropdownButton
        onClick={toggleDropdown}
        style={buttonStyle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        {selectedValue || label}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList direction={direction}>
          {options.map(({ label, value, disabled }, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleSelect(value, disabled)}
              disabled={disabled}
              style={itemStyle}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const DropdownLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Arrow = styled.span`
  margin-left: 8px;
`;

const DropdownList = styled.ul<{ direction: "down" | "up" }>`
  position: absolute;
  top: ${({ direction }) => (direction === "down" ? "100%" : "auto")};
  bottom: ${({ direction }) => (direction === "up" ? "100%" : "auto")};
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.li<{ disabled?: boolean }>`
  padding: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) => (disabled ? "#aaa" : "inherit")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "inherit" : "#f0f0f0")};
  }
`;
