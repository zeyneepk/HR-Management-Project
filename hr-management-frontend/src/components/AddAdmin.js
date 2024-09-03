import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addAdmin } from '../api/api';

const AddAdmin = () => {
    const [admin, setAdmin] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    
    useEffect(() => {
        
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
        setAdmin({ ...admin, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addAdmin(admin).then(response => {
            setMessage('Admin başarıyla eklendi.');
            setAdmin({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
        }).catch(error => {
            setMessage('Admin eklenirken bir hata oluştu.');
        });
    };

    return (
        <div className="form-container">
            <h2>Admin Veri Girişi</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Ad"
                    onChange={handleChange}
                    value={admin.firstName}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Soyad"
                    onChange={handleChange}
                    value={admin.lastName}
                    required
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={admin.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={admin.password}
                    required
                />
                <button type="submit">Kaydet</button>
            </form>
            <Link to="/home">Ana Sayfaya Dön</Link>
            <Link to="/">Çıkış Yap</Link>
        </div>
    );
};

export default AddAdmin;
