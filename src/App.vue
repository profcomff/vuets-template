<script setup lang="ts">
import { useProfileStore } from './store';
import { onMounted } from 'vue';

const profileStore = useProfileStore();

onMounted(async () => {
	profileStore.fromUrl();
	if (import.meta.env.MODE === 'development') await profileStore.setupDevAdminSession(null); // comment if you want only URL based auth in dev
});
</script>

<template>
	<main class="main">
		<Suspense>
			<RouterView />

			<template #fallback> Loading... </template>
		</Suspense>
	</main>
</template>

<style scoped>
.main {
	width: min(900px, 100%);
	margin: 0 auto;
	margin-top: 3rem;
}
</style>
