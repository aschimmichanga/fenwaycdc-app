// Example: DealService.js
import api from './api';

export const getDeals = async () => {
    try {
        const response = await api.get('/organizations');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createDeal = async (deal) => {
    try {
        const response = await api.post('/organizations', deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDeal = async (id, deal) => {
    try {
        const response = await api.put(`/organizations/${id}`, deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteDeal = async (id) => {
    try {
        await api.delete(`/organizations/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};
