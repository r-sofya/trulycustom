<script lang="ts">
	import '../../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen bg-surface-900">
	<!-- Sidebar -->
	<aside class="flex w-64 flex-col border-r border-surface-700 bg-surface-800">
		<!-- Logo/Brand -->
		<a href="/" class="border-b border-surface-700 p-6 transition-colors hover:bg-surface-700">
			<h1 class="text-xl font-bold text-primary-400">TrulyCustom</h1>
			<p class="mt-1 text-xs text-surface-400">Content Manager</p>
		</a>

		<!-- Navigation -->
		<nav class="flex-1 p-4">
			<ul class="space-y-2">
				<li>
					<a
						href="/edit/projects"
						class="flex items-center gap-3 rounded-lg px-4 py-3 text-surface-200 transition-colors hover:bg-surface-700 hover:text-primary-400"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						Projects
					</a>
				</li>
				<li>
					<a
						href="/edit/faq"
						class="flex items-center gap-3 rounded-lg px-4 py-3 text-surface-200 transition-colors hover:bg-surface-700 hover:text-primary-400"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						FAQ
					</a>
				</li>
			</ul>
		</nav>

		<!-- Footer -->
		<div class="space-y-3 border-t border-surface-700 p-4">
			<a
				href="/"
				class="flex items-center gap-2 text-sm text-surface-400 transition-colors hover:text-primary-400"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to Site
			</a>
			<form method="POST" action="/edit/logout">
				<button
					type="submit"
					class="flex w-full items-center gap-2 text-sm text-surface-400 transition-colors hover:text-error-400"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					Logout
				</button>
			</form>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 p-8">
		{@render children()}
	</main>
</div>
