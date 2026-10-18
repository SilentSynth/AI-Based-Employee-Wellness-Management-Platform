const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("wellness_token");
  }
  return null;
}

export function setAuthToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("wellness_token", token);
  }
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("wellness_token");
    localStorage.removeItem("wellness_user");
  }
}

export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const userStr = localStorage.getItem("user");
    
    if (!userStr || userStr === "undefined" || userStr === "null") {
      return null;
    }
    
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Corrupted user data found. Clearing localStorage.", error);
    localStorage.removeItem("user");
    return null;
  }
};

export function setCurrentUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem("wellness_user", JSON.stringify(user));
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // If body is not FormData, default to application/json
  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "An error occurred with the request.");
  }

  return data;
}

export const authApi = {
  register: (email, password, role = "employee") =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    }),
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getProfile: () => apiRequest("/auth/me"),
};

export const checkinApi = {
  submitText: (text) =>
    apiRequest("/checkin/text", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest("/checkin/upload", {
      method: "POST",
      body: formData,
    });
  },
};

export const analyticsApi = {
  getEmotionReport: () => apiRequest("/analytics/emotion-report"),
};
