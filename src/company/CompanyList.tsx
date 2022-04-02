import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import './CompanyList.css';
import Company from './Company';
import CompanyForm from './CompanyForm';
import AppModal from '../modal/Modal';
import { CompanyType, CompanyModel } from './types';

const URL = 'http://localhost:3001/api/v1/companies';
const val = {
  id: 0,
  organization: '',
  ceo: '',
  address: '',
  products: [],
  marketValue: '',
  country: '',
  noOfEmployees: 0,
  employees: [],
};

function CompanyList() {
  const [formValue, setFormValue] = useState<CompanyModel>(val); 
  const initialState: CompanyType[] = [];
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>(initialState);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setCompanies(res);
      });
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setFormValue(val);
  }, [setModalOpen]);

  const handleFormAction = useCallback((data: CompanyModel) => {
    const method = modalTitle === 'Create Company'
      ? 'POST'
      : 'PUT';

    const url = method === 'POST' ? `${URL}` : `${URL}/${data.id}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(res => res.json())
      .then((res: CompanyType) => {
        if (method === 'POST') {
          setCompanies([
            ...companies,
            res
          ]);
        } else {
          setCompanies(
            companies.map(c => c.id === res.id ? res : c)
          );
        }
      });
  }, [modalTitle, companies, setCompanies]);

  const handleCreate = useCallback(() => {
    setModalTitle('Create Company');
    setModalOpen(true);
  }, [setModalTitle, setModalOpen]);

  const handleEdit = useCallback(({ createdAt, updatedAt, ...data }: CompanyType) => {
    setModalTitle('Edit Company');
    setFormValue(data);
    setModalOpen(true);
  }, [setModalTitle, setFormValue, setModalOpen]);

  const handleDelete = useCallback((id: number) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(`${URL}/${id}`, options)
      .then(res => res.json())
      .then((res: CompanyType) => {
        setCompanies(
          companies.filter(c => c.id !== id)
        );
      });
  }, [companies, setCompanies]);

  return (
    <div className="company-list-container">
       <AppModal
        title={modalTitle}
        isOpen={modalOpen}
        close={handleModalClose}
      >
        <CompanyForm
          value={formValue}
          handleSubmit={handleFormAction}
          closeModal={setModalOpen}
        ></CompanyForm>
      </AppModal>

      <h1>Companies</h1>
      <div className="create-box">
        <button
          className="create-button"
          onClick={handleCreate}
        >Create</button>
      </div>
      <div className="company-list">
        {companies.map((item: any) => (
          <Company
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            key={item.id} data={item}
          ></Company>
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
