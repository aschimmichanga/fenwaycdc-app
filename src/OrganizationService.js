// Example: DealService.js
import api from './api';

export const getOrganization = async () => {
    try {
        const response = await api.get('/organizations');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createOrganization = async (deal) => {
    try {
        const response = await api.post('/organizations', deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateOrganization = async (id, deal) => {
    try {
        const response = await api.put(`/organizations/${id}`, deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteOrganization = async (id) => {
    try {
        await api.delete(`/organizations/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};
