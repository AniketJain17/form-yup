import React, { useState } from 'react';
import PlanFormComponent from './PlanFormComponent';

const PlanForm = () => {
  const createForm = () => {
    return {
      planName: '',
      frequency: '',
      priceInCAD: null,
      idInCAD: '',
      priceInUSD: null,
      idInUSD: '',
    };
  };

  const [forms, setForms] = useState([createForm()]);

  const addForm = () => {
    setForms([...forms, createForm()]);
  };

  const handleSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div>
      {forms.map((form, index) => (
        <PlanFormComponent
          key={index}
          initialValues={form}
          onSubmit={handleSubmit}
        />
      ))}
      <button type="button" onClick={addForm}>
        Add Form
      </button>
    </div>
  );
};

export default PlanForm;
