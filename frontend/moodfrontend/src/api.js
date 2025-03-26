import axios from "axios";
const Api_url="http://127.0.0.1:8000/";

export const registeruser= async (userdata)=>{
    return axios.post(`${Api_url}register/`,userdata);
}

export const loginuser =async (credentials)=>{
    return axios.post(`${Api_url}login/`,credentials);
}

export const submitMood = async (mood) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token is missing");

        console.log("Submitting mood:", mood); // Debugging

        const response = await axios.post(
            "http://127.0.0.1:8000/mood/", // Ensure the endpoint is correct
            { mood }, // Ensure correct payload structure
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Mood submitted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting mood:", error.response?.data || error.message);
    }
};





export const getMoodData = async () => {
    return await axios.get(`${Api_url}mood/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
};