import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-toastify";

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
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (response.status === 401) useAuthStore.getState().logout();
    
    if (response.ok) {
      try {
        return await response.json();
      } catch {
        return null;
      }
    }

    const errorData = await response.json();
    if (errorData?.errors?.message) {
        toast.error(errorData.errors.message);
    } else {
      const errors = Object.entries(errorData?.errors || {});
      errors.forEach(([field, msgs]: [string, any]) => {
        if (Array.isArray(msgs)) {
          msgs.forEach((msg: string) => toast.error(`${field}: ${msg}`));
        } else {
          toast.error(`${field}: ${msgs}`);
        }
      });
    }
    return null;
  } catch (error: any) {
    toast.error("Failed to connect to the server.");
    throw error;
  }
};
