import { useAuthStore } from "@/stores/authStore";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  body?: any;
}

const API_BASE_URL = "http://localhost:9000/api";

const buildQueryString = (params: Record<string, any>) => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] != null) query.append(key, params[key].toString());
  }
  return query.toString() ? `?${query.toString()}` : "";
};

export const apiRequest = async (
  path: string,
  options: RequestOptions = {}
) => {
  const token = useAuthStore.getState().token;

  const { method = "GET", params, body, headers = {} } = options;
  const url = `${API_BASE_URL}${path}${params ? buildQueryString(params) : ""}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (res.status === 401) {
      useAuthStore.getState().logout();
    }
    
    if (!res.ok) {
      const errorMessage = data?.message || `Oops! Something went wrong ${res.status}`;
      throw new Error(errorMessage);
    } else {
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.message || "API request failed");
  }
};
