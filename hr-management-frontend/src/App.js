import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import LeaveEntry from './components/LeaveEntry';
import UpdateLeaveLimit from './components/UpdateLeaveLimit';
import AddAdmin from './components/AddAdmin';
import './styles.css'; // Global CSS dosyasını dahil et

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    
                    <Route path="/home" element={
                        <div className="home-container">
                            <h1>Hoş Geldiniz</h1>
                            <p>Lütfen bir seçenek seçiniz:</p>
                            <ul className="home-links">
                                <li><Link to="/add">Çalışan Kaydı</Link></li>
                                <li><Link to="/leave">İzin Girişi</Link></li>
                                <li><Link to="/employee-list">Çalışan Listeleme</Link></li>
                                <li><Link to="/update-leave">İzin Hakkı Güncelleme</Link></li>
                                <li><Link to="/add-admin">Admin Ekleme</Link></li>
                            </ul>
                        </div>
                    } />
                    
                    <Route path="/add" element={<AddEmployee />} />
                    <Route path="/leave" element={<LeaveEntry />} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route path="/update-leave" element={<UpdateLeaveLimit />} />
                    <Route path="/add-admin" element={<AddAdmin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
