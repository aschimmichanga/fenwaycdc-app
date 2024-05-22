// DiscountService.js
import api from './api';

export const getDiscounts = async () => {
    try {
        const response = await api.get('/discounts');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createDiscount = async (discount) => {
    try {
        const response = await api.post('/discounts', discount);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDiscount = async (id, discount) => {
    try {
        const response = await api.put(`/discounts/${id}`, discount);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteDiscount = async (id) => {
    try {
        await api.delete(`/discounts/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};
