import React, { useCallback, useState } from 'react';
import './CompanyForm.css';
import { CompanyModel } from './types';

type PropType = {
  handleSubmit: (state: CompanyModel) => void;
  closeModal: (close: boolean) => void;
  value: CompanyModel;
};

const CompanyForm = ({ handleSubmit, closeModal, value }: PropType) => {
  const initialState: CompanyModel = value;

  const { id, ...rest } = initialState;

  const [state, setState] = useState(initialState);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = ['products', 'employees'].includes(name)
      ? value.split(',') :
      name === 'noOfEmployees'
        ? Number(value)
        : value;

    setState({
      ...state,
      [name]: parsedValue,
    });
  }, [state, setState]);

  const submitForm = useCallback((event) => {
    event.preventDefault();
    handleSubmit(state);
    closeModal(false);
  }, [state, handleSubmit, closeModal]);

  return (
    <form method="POST" className="company-form" onSubmit={submitForm}>
      {
        Object.keys(rest).map(key => (
          <div className="company-form-item">
            <label>{key}</label>
            <input
              type="text"
              key={key}
              name={key}
              value={state[key as keyof CompanyModel]}
              onChange={handleChange}
            />
          </div>
        ))
      }
      <input type="submit" />
    </form> 
  );
};

export default CompanyForm;
