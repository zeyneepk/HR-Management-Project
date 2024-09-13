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
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New state for handling errors

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

    const handleDepartmentSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter departments based on input
        setFilteredDepartments(
            departments.filter(dept =>
                dept.department_name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleSelectDepartment = (deptId, deptName) => {
        setEmployee({ ...employee, department: deptId });
        setSearchQuery(deptName);
        setFilteredDepartments([]); // Hide dropdown after selection
    };

    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            addDepartment({ department_name: newDepartment }).then(response => {
                setDepartments([...departments, response.data]);
                setEmployee({ ...employee, department: response.data.id});
                setMessage('Yeni departman başarıyla eklendi.');
                setNewDepartment('');
                setIsAddingDepartment(false);
            }).catch(error => {
                console.error('Error adding department:', error);
                setMessage('Departman eklenirken bir hata oluştu.');
            });
        } else {
            setMessage('Departman adı boş olamaz.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');  // Clear previous error messages
        addEmployee(employee)
            .then(response => {
                setMessage('Çalışan başarıyla eklendi.');
                setEmployee({
                    firstName: '',
                    lastName: '',
                    department: '',
                    email: '',
                    password: ''
                });
                setSearchQuery('');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    // Handle specific backend error (e.g., duplicate email or invalid input)
                    setErrorMessage(error.response.data); // Show the error message from the backend
                } else {
                    setMessage('Çalışan eklenirken bir hata oluştu.');
                }
            });
    };

    return (
        <div className="form-container">
            <h2>Çalışan Veri Girişi</h2>
            {message && <p>{message}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
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

                {/* Department Dropdown with Search */}
                <div className="department-input-container">
                    <input
                        type="text"
                        placeholder="Departman Ara"
                        value={searchQuery}
                        onChange={handleDepartmentSearchChange}
                    />
                    {filteredDepartments.length > 0 && (
                        <ul className="department-dropdown">
                            {filteredDepartments.map(dept => (
                                <li
                                    key={dept.id}
                                    onClick={() => handleSelectDepartment(dept.id, dept.department_name)}
                                >
                                    {dept.department_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Button to add new department if not found */}
                <div style={{ marginTop: '10px' }}>
                    <button
                        type="button"
                        onClick={() => setIsAddingDepartment(true)}>
                        Yeni Departman Ekle
                    </button>
                </div>

                {/* New Department Input */}
                {isAddingDepartment && (
                    <div>
                        <input
                            type="text"
                            placeholder="Yeni Departman Adı"
                            onChange={(e) => setNewDepartment(e.target.value)}
                            value={newDepartment}
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
