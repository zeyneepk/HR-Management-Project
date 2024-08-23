import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addEmployee } from '../api/api';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        department: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(employee).then(response => {
            setMessage('Çalışan başarıyla eklendi.');
        }).catch(error => {
            setMessage('Çalışan eklenirken bir hata oluştu.');
        });
    };

    return (
        <div className="form-container">
            <h2>Çalışan Veri Girişi</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="Ad" onChange={handleChange} value={employee.firstName} />
                <input type="text" name="lastName" placeholder="Soyad" onChange={handleChange} value={employee.lastName} />
                <input type="text" name="department" placeholder="Departman" onChange={handleChange} value={employee.department} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={employee.email} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={employee.password} />
                <button type="submit">Kaydet</button>
            </form>
            <Link to="/home">Ana Sayfaya Dön</Link>
            <Link to="/">Çıkış Yap</Link>
        </div>
    );
};

export default AddEmployee;