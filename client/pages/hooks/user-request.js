import axios from "axios";
import { useState } from "react";

// Signup hook
export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    // method === 'post', 'get', 'path'
    const doRequest = async () => {
        try {
            // on new submit set errors to null 
            setErrors(null);
            const response = await axios[method](url, body);
            console.log("Onsuccess: ", onSuccess);
            if(onSuccess){
                onSuccess(response.data);
            }

            return response.data
        } catch (error) {
            setErrors(				
                <div className="aler alert-danger">
                    <h4>Oooops...</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};