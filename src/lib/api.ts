import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_KEY = import.meta.env.VITE_X_API_KEY || '';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `API-KEY ${API_KEY}`,
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
});

export async function fetchPlans() {
  const res = await apiClient.get('/v2/items/plans?limit=10');
  return res.data?.data?.response ?? res.data?.data ?? res.data ?? [];
}

export async function fetchFeatures() {
  const res = await apiClient.get('/v2/items/features?limit=20&sort=sort_order');
  return res.data?.data?.response ?? res.data?.data ?? res.data ?? [];
}

export async function fetchTestimonials() {
  const res = await apiClient.get('/v2/items/testimonials?limit=10');
  return res.data?.data?.response ?? res.data?.data ?? res.data ?? [];
}

export async function submitWaitlist(payload: {
  email: string;
  company_name?: string;
  team_size?: string;
  use_case?: string;
  status?: string;
}) {
  const res = await apiClient.post('/v2/items/waitlist', { data: payload });
  return res.data;
}
