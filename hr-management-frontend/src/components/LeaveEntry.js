import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEmployees, addLeaveEntry } from '../api/api';

const LeaveEntry = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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

        if (startDate && endDate && selectedEmployee) {
            const daysRequested = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate number of days

            const leaveEntry = {
                employee: { id: selectedEmployee },
                startDate: startDate.toISOString(), // Ensure dates are in the correct format
                endDate: endDate.toISOString(),
                daysRequested
            };
            

            addLeaveEntry(leaveEntry).then(response => {
                setMessage(`İzin girişi başarılı: ${selectedEmployee} için ${daysRequested} gün.`);
            }).catch(error => {
                setMessage('İzin girişi başarısız!');
            });
        } else {
            setMessage('Lütfen tüm alanları doldurun!');
        }
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
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Başlangıç Tarihi" />
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="Bitiş Tarihi" />
                <button type="submit">Kaydet</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/home">Ana Sayfaya Dön</Link>
        </div>
    );
};

export default LeaveEntry;