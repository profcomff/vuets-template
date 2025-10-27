import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { setupAuth } from '@profcomff/api-uilib';
import apiClient from '@/api';

export const useProfileStore = defineStore('profile', () => {
	const user_id = ref<number | null>(null);
	const email = ref<string | null>(null);
	const token = ref<string | null>(null);
	const groups = ref<number[] | null>(null);
	const indirectGroups = ref<number[] | null>(null);
	const userScopes = ref<string[] | null>(null);
	const sessionScopes = ref<string[] | null>(null);

	const full_name = ref<string | null>(null);

	const fromUrl = () => {
		const url = new URL(document.location.toString());
		const currToken = url.searchParams.get('token');
		const currId = url.searchParams.get('user_id');
		const currScopes = url.searchParams.get('scopes');
		if (currToken) {
			token.value = currToken;
		}
		if (currId) {
			user_id.value = +currId;
		}
		if (currScopes) {
			sessionScopes.value = currScopes.split(',');
		}

		setupAuth(token.value ?? undefined);
	};

	const TVOI_FF_TEST_TOKEN = import.meta.env.VITE_TVOI_FF_TOKEN;

	async function setupDevAdminSession(tvff_token: string | null) {
		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);

		const serviceScopes = [''];
		const serviceName = '';
		const scopes = serviceScopes.map(value => `${serviceName}.${value}`);

		const { data, error } = await apiClient.POST('/auth/session', {
			body: {
				scopes,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
			},
		});

		if (error) {
			console.log(error.detail);
			return;
		}
		user_id.value = data.id;
		token.value = data.token || '';
		sessionScopes.value = data.session_scopes ?? [];

		setupAuth(data.token || '');

		console.log(token);
	}

	async function setupDevUserSession(tvff_token: string | null) {
		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);
	}

	const isLogged = computed(() => token.value && token.value !== '');

	return {
		user_id,
		email,
		token,
		groups,
		indirectGroups,
		userScopes,
		sessionScopes,

		full_name,

		isLogged,

		fromUrl,
		setupDevAdminSession,
		setupDevUserSession,
	};
});
