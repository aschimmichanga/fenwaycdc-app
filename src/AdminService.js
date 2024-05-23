import api from './api';

export const verifyPin = async (pin) => {
    try {
        const response = await api.post('/admin/verify-pin', { pin });
        return response.status === 200;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateAdminImage = async (imageUrl) => {
    try {
        const response = await api.put('/admin/image', { imageUrl });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAdminImage = async () => {
    try {
        const response = await api.get('/admin/image');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
