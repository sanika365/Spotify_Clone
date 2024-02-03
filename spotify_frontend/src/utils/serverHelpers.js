import { backendUrl } from "./config";


export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await fetch(backendUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Handle server error
      throw new Error(
        `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    // Handle network error or other exceptions
    console.error("An error occurred while making the POST request:", error);
    return null; // Or throw error depending on your requirement
  }
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    console.log("Authentication token:", token);
    

  if (!token) {
    console.error("Authentication token is missing.");
    return null;
  }

  try {
    const response = await fetch(backendUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Failed to fetch:", response.status, response.statusText);
      return null;
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("An error occurred while fetching:", error.message);
    return null;
  }
};


export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};



const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};