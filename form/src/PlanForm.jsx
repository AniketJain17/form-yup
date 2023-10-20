import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
      {forms.map((form, index) => {
        const validationSchema = Yup.object({
          planName: Yup.string()
            .required('Plan Name is required')
            .matches(/^[A-Za-z\s]+$/, 'Invalid characters in Plan Name'),

          frequency: Yup.string().required('Frequency is required'),

          priceInCAD: Yup.number().nullable(),

          idInCAD: Yup.string().when('priceInCAD', {
            is: price => price !== null && price !== '',
            then: Yup.string().required('ID In CAD is required when Price In CAD is provided'),
          }),

          priceInUSD: Yup.number().nullable(),

          idInUSD: Yup.string().when('priceInUSD', {
            is: price => price !== null && price !== '',
            then: Yup.string().required('ID In USD is required when Price In USD is provided'),
          }),
        });

        const formik = useFormik({
          initialValues: form,
          validationSchema: validationSchema,
          onSubmit: (values) => {
            handleSubmit(values);
          },
        });

        return (
          <form key={index} onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor={`planName${index}`}>Plan Name:</label>
              <input
                type="text"
                id={`planName${index}`}
                name={`planName`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.planName}
              />
              {formik.touched.planName && formik.errors.planName && (
                <div>{formik.errors.planName}</div>
              )}
            </div>

            <div>
              <label htmlFor={`frequency${index}`}>Frequency:</label>
              <select
                id={`frequency${index}`}
                name={`frequency`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.frequency}
              >
                <option value="" label="Select Frequency" />
                <option value="Mo" label="Monthly" />
                <option value="Yr" label="Yearly" />
              </select>
              {formik.touched.frequency && formik.errors.frequency && (
                <div>{formik.errors.frequency}</div>
              )}
            </div>

            <div>
              <label htmlFor={`priceInCAD${index}`}>Price In CAD:</label>
              <input
                type="number"
                id={`priceInCAD${index}`}
                name={`priceInCAD`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priceInCAD}
              />
              {formik.touched.priceInCAD && formik.errors.priceInCAD && (
                <div>{formik.errors.priceInCAD}</div>
              )}
            </div>

            <div>
              <label htmlFor={`idInCAD${index}`}>ID In CAD:</label>
              <input
                type="text"
                id={`idInCAD${index}`}
                name={`idInCAD`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idInCAD}
              />
              {formik.touched.idInCAD && formik.errors.idInCAD && (
                <div>{formik.errors.idInCAD}</div>
              )}
            </div>

            <div>
              <label htmlFor={`priceInUSD${index}`}>Price In USD:</label>
              <input
                type="number"
                id={`priceInUSD${index}`}
                name={`priceInUSD`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priceInUSD}
              />
              {formik.touched.priceInUSD && formik.errors.priceInUSD && (
                <div>{formik.errors.priceInUSD}</div>
              )}
            </div>

            <div>
              <label htmlFor={`idInUSD${index}`}>ID In USD:</label>
              <input
                type="text"
                id={`idInUSD${index}`}
                name={`idInUSD`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idInUSD}
              />
              {formik.touched.idInUSD && formik.errors.idInUSD && (
                <div>{formik.errors.idInUSD}</div>
              )}
            </div>

            <button type="submit">Submit</button>
          </form>
        );
      })}
      <button type="button" onClick={addForm}>
        Add Form
      </button>
    </div>
  );
};

export default PlanForm;
