import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const signup = async (email, password) => {
    try {
        const response = await api.post('/signup', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
