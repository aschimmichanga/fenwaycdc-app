// DiscountService.js
import api from './api';

export const getDiscounts = async (organizationId) => {
    try {
        const response = await api.get(`/organizations/${organizationId}/discounts`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createDiscount = async (organizationId, discount) => {
    try {
        const response = await api.post(`/organizations/${organizationId}/discounts`, { discount });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDiscount = async (organizationId, discountId, discount) => {
    try {
        const response = await api.put(`/organizations/${organizationId}/discounts/${discountId}`, discount);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteDiscount = async (organizationId, discountId) => {
    try {
        await api.delete(`/organizations/${organizationId}/discounts/${discountId}`);
    } catch (error) {
        throw error.response.data;
    }
};
