import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8082/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await api.post("auth/token", user);
    if (res.status === 200) {
      const userRole = res.data.result.roles[0];
      const token = res.data.result.token;

      localStorage.setItem("userRole", userRole);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", user.username);

      if (userRole === "ADMIN") {
        navigate("/dashboard");
      } else if (userRole === "USER") {
        navigate("/driveuser");
      }
      dispatch(loginSuccess(res.data));
      return res.data;
    } else {
      console.log("Not contact with API");
    }
  } catch (err) {
    dispatch(loginFailed());
    alert("Login failed. Please check your credentials.");
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());

  try {
    const res = await api.post("user/create", user);
    if (res.status === 200) {
      const userRole = res.data.result.roles[0];

      localStorage.setItem("userRole", userRole);

      dispatch(registerSuccess(res.data));
      toast.success("Register successfully");
      navigate("/login");
    } else {
      console.log("Not contact with API");
    }
  } catch (err) {
    dispatch(registerFailed());
    alert("Registration failed. Please try again.");
  }
};

export const getAllVehicle = async () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await api.get("vehicle/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching vehicles:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createVehicle = async (vehicleDTO) => {
  const response = await api.post("vehicle/add", vehicleDTO);
  return response.data;
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const response = await api.put(`vehicle/update/${vehicleId}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (vehicleId) => {
  const response = await api.delete(`vehicle/delete/${vehicleId}`);
  return response.data;
};

export const getVehicleById = async (vehicleId) => {
  const response = await api.get(`vehicle/${vehicleId}`);
  return response.data;
};

export const getAllDriver = async () => {
  const response = await api.get("driver/all");
  return response.data;
};

export const getDriverById = async (driverId) => {
  const response = await api.get(`driver/${driverId}`);
  return response.data;
};

export const updateDriver = async (driverId, driverData) => {
  const response = await api.put(`driver/update/${driverId}`, driverData);
  return response.data;
};

export const deleteDriver = async (driverId) => {
  const response = await api.delete(`driver/delete/${driverId}`);
  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await api.get(`user/username/${username}`);
  return response.data;
};
