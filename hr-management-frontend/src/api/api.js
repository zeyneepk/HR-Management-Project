import axios from 'axios';

// Backend API URL
const API_URL = 'http://localhost:8080/api';

// Çalışanları Getirme
export const getEmployees = () => {
    return axios.get(`${API_URL}/employees`);
};

// Yeni Çalışan Ekleme
export const addEmployee = (employee) => {
    return axios.post(`${API_URL}/employees`, employee, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// İzin Günlerini Güncelleme
export const updateLeaveDays = (id, leaveDays) => {
    
    
    return axios.put(`${API_URL}/employees/${id}/leave`, leaveDays, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Yeni İzin Girişi Ekleme
export const addLeaveEntry  = (leaveEntry) => {
    return axios.post(`${API_URL}/leaves`, leaveEntry, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


//İzin hakkını güncelleme
export const changeLeaveLimit = (id, leaveDays) => {
    return axios.put(`${API_URL}/employees/${id}/update-leave`, leaveDays, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
