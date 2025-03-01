import { createClient } from '@profcomff/api-uilib';

const apiClient = createClient(import.meta.env.VITE_AUTH_API_BASE_URL);
export default apiClient;
