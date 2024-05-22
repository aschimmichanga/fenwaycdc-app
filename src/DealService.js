// Example: DealService.js
import api from './api';

export const getDeals = async () => {
    try {
        const response = await api.get('/deals');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createDeal = async (deal) => {
    try {
        const response = await api.post('/deals', deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDeal = async (id, deal) => {
    try {
        const response = await api.put(`/deals/${id}`, deal);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteDeal = async (id) => {
    try {
        await api.delete(`/deals/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};
