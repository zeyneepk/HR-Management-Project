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

    // Employees are sorted by their IDs
    employees.sort((a, b) => a.id - b.id);

    return (
        <div className="employee-list-container">
            <h2>Çalışan Listesi</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Kalan İzin Günleri</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.leaveDays} gün</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <Link to="/home" className="button">Ana Sayfaya Dön</Link>
                <Link to="/" className="button">Çıkış Yap</Link>
            </div>
        </div>
    );
};

export default EmployeeList;
