import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, addLeaveEntry, updateLeaveDays, changeLeaveLimit} from '../api/api';

const LeaveEntry = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee, ] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getEmployees().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.error('Error fetching employees:', error);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        changeLeaveLimit(selectedEmployee, leaveDays).then(response => {
            setMessage(`İzin hakkı ${selectedEmployee} için ${leaveDays} gün olarak güncellendi.`);
        }).catch(error => {
            setMessage('İşem başarısız!');
        });
    };

    return (
        <div className="form-container">
            <h2>İzin Girişi</h2>
            <form onSubmit={handleSubmit}>
                <select onChange={(e) => setSelectedEmployee(e.target.value)} value={selectedEmployee}>
                    <option value="">Çalışan Seç</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
                <input type="number" placeholder="İzin Gün Sayısı" onChange={(e) => setLeaveDays(parseInt(e.target.value) || 0)} value={leaveDays} />
                <button type="submit">Kaydet</button>
            </form>
            {message && <p>{message}</p>}      
            <Link to="/home">Ana Sayfaya Dön</Link>
        </div>
    );

};

export default LeaveEntry;