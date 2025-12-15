const API_BASE = "http://localhost:5000/api";

export const fetchHealth = async () => {
  const res = await fetch(`${API_BASE.replace("/api", "")}/api/health`);
  return res.json();
};

export const auth = {
  register: async (data) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  login: async (data) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

export const packages = {
  list: async () => {
    const res = await fetch(`${API_BASE}/packages`);
    return res.json();
  },
  get: async (id) => {
    const res = await fetch(`${API_BASE}/packages/${id}`);
    return res.json();
  },
  create: async (data, token) => {
    const res = await fetch(`${API_BASE}/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

export const bookings = {
  create: async (data, token) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  myBookings: async (token) => {
    const res = await fetch(`${API_BASE}/bookings/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },
  allBookings: async (token) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};

export const payments = {
  init: async (data, token) => {
    const res = await fetch(`${API_BASE}/payments/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  verify: async (data, token) => {
    const res = await fetch(`${API_BASE}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

export const reviews = {
  create: async (data, token) => {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPackageReviews: async (packageId) => {
    const res = await fetch(`${API_BASE}/reviews/package/${packageId}`);
    return res.json();
  }
};

export const enquiries = {
  submit: async (data) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

export const users = {
  getMe: async (token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },
  updateMe: async (data, token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  listUsers: async (token) => {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};
