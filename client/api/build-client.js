import axios from "axios";

// Get current user in server enviroment
export const getCurrentUser = async (headers) => {
	try {
		const response = await axios.get(
			"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
			{
				withCredentials: true,
				headers: headers,
			}
		);
        
		return response.data;
	} catch (error) {
		return { currentUser: "null" };
	}
};

