import React, { useEffect, useState } from "react";
import axios from "axios";

const TestAPI = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/test")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Erreur :", error));
    }, []);

    return <h1>hello</h1>;
};

export default TestAPI;
