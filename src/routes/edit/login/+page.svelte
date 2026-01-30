<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Admin Login | TrulyCustom</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-surface-900 p-4">
	<div class="w-full max-w-md">
		<div class="rounded-2xl bg-surface-800 p-8 shadow-xl">
			<div class="mb-8 text-center">
				<h1 class="text-2xl font-bold text-primary-400">TrulyCustom</h1>
				<p class="mt-2 text-surface-400">Content Manager Login</p>
			</div>

			{#if form?.error}
				<div
					class="mb-6 rounded-lg border border-error-500/20 bg-error-500/10 px-4 py-3 text-error-400"
				>
					{form.error}
				</div>
			{/if}

			<form method="POST" use:enhance class="space-y-4">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-surface-200">Email</label>
					<input
						id="email"
						type="email"
						name="email"
						required
						class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						placeholder="admin@example.com"
					/>
				</div>
				<div>
					<label for="password" class="mb-1 block text-sm font-medium text-surface-200"
						>Password</label
					>
					<input
						id="password"
						type="password"
						name="password"
						required
						class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-3 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
						placeholder="Enter admin password"
					/>
				</div>

				<button
					type="submit"
					class="w-full rounded-lg bg-primary-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
				>
					Sign In
				</button>
			</form>

			<p class="mt-6 text-center text-sm text-surface-500">
				<a href="/" class="transition-colors hover:text-primary-400">← Back to site</a>
			</p>
		</div>
	</div>
</div>
