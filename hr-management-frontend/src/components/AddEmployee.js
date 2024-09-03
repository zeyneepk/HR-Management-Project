import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addEmployee, getDepartments, addDepartment } from '../api/api';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        department: '',
        email: '',
        password: ''
    });

    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);

    useEffect(() => {
        getDepartments().then(response => {
            setDepartments(response.data);
        }).catch(error => {
            console.error('Error fetching departments:', error);
        });

        // Custom validation for email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                if (this.validity.typeMismatch) {
                    this.setCustomValidity('Lütfen geçerli bir e-posta adresi girin.');
                } else {
                    this.setCustomValidity('');
                }
                this.reportValidity();
            });
        }

        // Custom validation for password
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function () {
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                if (!passwordPattern.test(this.value)) {
                    this.setCustomValidity('Şifre en az 8 karakterden oluşmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
                } else {
                    this.setCustomValidity('');
                }
                this.reportValidity();
            });
        }

        // Custom validation for name and surname fields
        const nameInputs = document.querySelectorAll('input[name="firstName"], input[name="lastName"]');
        nameInputs.forEach(input => {
            input.addEventListener('input', function () {
                const namePattern = /^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/;
                if (!namePattern.test(this.value)) {
                    this.setCustomValidity('Bu alan sadece harf içermelidir.');
                } else {
                    this.setCustomValidity('');
                }
                this.reportValidity();
            });
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleDepartmentChange = (e) => {
        const selectedDept = e.target.value;
        if (selectedDept === 'new') {
            setIsAddingDepartment(true);
        } else {
            setEmployee({ ...employee, department: selectedDept });
            setIsAddingDepartment(false);
        }
    };

    const handleNewDepartmentChange = (e) => {
        setNewDepartment(e.target.value);
    };

    const handleAddDepartment = () => {
        addDepartment({ department_name: newDepartment }).then(response => {
            setEmployee({ 
                ...employee, 
                department: response.data.id 
            });
            setDepartments([...departments, response.data]);
            setIsAddingDepartment(false);
            setNewDepartment('');
            setMessage('Yeni departman başarıyla eklendi.');
        }).catch(error => {
            console.error('Error adding department:', error);
            setMessage('Departman eklenirken bir hata oluştu.');
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(employee).then(response => {
            setMessage('Çalışan başarıyla eklendi.');
            setEmployee({
                firstName: '',
                lastName: '',
                department: '',
                email: '',
                password: ''
            });
        }).catch(error => {
            setMessage('Çalışan eklenirken bir hata oluştu.');
        });
    };

    return (
        <div className="form-container">
            <h2>Çalışan Veri Girişi</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Ad"
                    onChange={handleChange}
                    value={employee.firstName}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Soyad"
                    onChange={handleChange}
                    value={employee.lastName}
                    required
                />

                <select
                    name="department"
                    onChange={handleDepartmentChange}
                    value={employee.department}
                    required
                >
                    <option value="">Departman Seç</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.id}>
                            {department.department_name}
                        </option>
                    ))}
                    <option value="new">Yeni Departman Ekle</option>
                </select>

                {isAddingDepartment && (
                    <div>
                        <input
                            type="text"
                            placeholder="Yeni Departman Adı"
                            onChange={handleNewDepartmentChange}
                            value={newDepartment}
                            required
                        />
                        <button type="button" onClick={handleAddDepartment}>
                            Departmanı Ekle
                        </button>
                    </div>
                )}

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={employee.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={employee.password}
                    required
                />
                <button type="submit">Kaydet</button>
            </form>
            <Link to="/home">Ana Sayfaya Dön</Link>
            <Link to="/">Çıkış Yap</Link>
        </div>
    );
};

export default AddEmployee;
