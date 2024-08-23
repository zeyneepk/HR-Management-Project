import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeaves, getEmployees } from '../api/api';

const HomeEmployee = () => {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // İzin verilerini al
        getLeaves().then(response => {
            setLeaves(response.data);
        }).catch(error => {
            console.error('Error fetching leaves:', error);
        });

        // Çalışan verilerini al
        getEmployees().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.error('Error fetching employees:', error);
        });
    }, []);

    return (
        <div className="employee-list-container">
            <h2>İzin Listesi</h2>
            <ul>
                {leaves.map(leave => {
                    const employee = employees.find(emp => emp.id === leave.employee_id);
                    return (
                        <li key={leave.id}>
                            {leave.startDate} - {leave.endDate} : {leave.days_requested} gün izin kullandı. 
                            Kalan izin : {employee ? employee.leaveDays : 'Bilinmiyor'} gün
                        </li>
                    );
                })}
            </ul>
            
            <Link to="/">Çıkış Yap</Link>
        </div>
    );
};

export default HomeEmployee;
