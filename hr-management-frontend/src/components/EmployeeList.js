import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../api/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.error('Error fetching employees:', error);
        });
    }, []);


    employees.sort((a, b) => a.id - b.id);

    return (
        <div className="employee-list-container">
            <h2>Çalışan Listesi</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.id} - {employee.firstName} {employee.lastName} - {employee.leaveDays} gün izin kaldı
                    </li>
                ))}
            </ul>
            <Link to="/home">Ana Sayfaya Dön</Link>
            <Link to="/">Çıkış Yap</Link>
        </div>
    );
};

export default EmployeeList;