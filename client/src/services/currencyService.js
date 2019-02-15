import React from 'react'
import axios from 'axios'


//POST
export const postConversion = async (json) => {
    try {
        const res = await axios.post('/api/currency', json);
        return res.data;
    } catch (error) {
        console.log(error);
        const res = null;
        return res
    }
};