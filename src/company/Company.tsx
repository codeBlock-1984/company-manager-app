import React, { useCallback } from 'react';
import './Company.css';

import { CompanyType } from './types';

type PropType = {
  data: CompanyType;
  handleEdit: (data: CompanyType) => void;
  handleDelete: (id: number) => void;
};

const Company = ({ data, handleEdit, handleDelete }: PropType) => {
  const {
    organization,
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees
  } = data;

  const onEdit = useCallback(() => {
    handleEdit(data);
  }, [data, handleEdit]);

  const onDelete = useCallback(() => {
    handleDelete(data.id);
  }, [data.id, handleDelete]);

  return (
    <div className="company">
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      <h1>{organization}</h1>
      <dl>
        <dt>CEO</dt>
        <dd>{ceo}</dd>
        <dt>Address</dt>
        <dd>{address}</dd>
        <dt>Products</dt>
        <dd>{products.join(', ')}.</dd>
        <dt>Market Value</dt>
        <dd>{marketValue}</dd>
        <dt>Country</dt>
        <dd>{country}</dd>
        <dt>No of Employees</dt>
        <dd>{noOfEmployees}</dd>
        <dt>Employees</dt>
        <dd>{employees.join(', ')}.</dd>
      </dl>
    </div>
  );
};

export default Company;
