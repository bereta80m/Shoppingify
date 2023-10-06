"use client"
import React, { useState } from 'react';

function CheckboxList() {
  // Datos de ejemplo para los checkboxes
  const checkboxData = [
    { label: "Opción 1", checked: true },
    { label: "Opción 2", checked: false },
    { label: "Opción 3", checked: true },
    { label: "Opción 4", checked: false },
  ];

  // Estado para almacenar el estado checked de los checkboxes
  const [checkboxes, setCheckboxes] = useState(checkboxData);

  // Manejador de cambios de los checkboxes
  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  return (
    <div>
      {checkboxes.map((checkbox, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name="checkbox"
            className="w-6 h-6"
            checked={checkbox.checked}
            onChange={() => handleCheckboxChange(index)}
          />
          {checkbox.label}
        </label>
      ))}
    </div>
  );
}

export default CheckboxList;
