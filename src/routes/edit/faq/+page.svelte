<script lang="ts">
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Modal from '$lib/components/ui/Modal.svelte';

	let { data } = $props();

	let isModalOpen = $state(false);
	let editingFaq: Record<string, unknown> | null = $state(null);
	let message = $state('');
	let isError = $state(false);
	let hasOrderChanged = $state(false);

	// Create a mutable copy of faqs for drag and drop
	let faqs: any[] = $state(data.faqs.map((f, i) => ({ ...f, order: f.order ?? i })));
	const flipDurationMs = 200;

	// Sync faqs when data changes (e.g., after create/update/delete)
	$effect(() => {
		faqs = data.faqs.map((f, i) => ({ ...f, order: f.order ?? i }));
		hasOrderChanged = false;
	});

	function openCreate() {
		editingFaq = null;
		isModalOpen = true;
	}

	function openEdit(faq: Record<string, unknown>) {
		editingFaq = faq;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		editingFaq = null;
	}

	function handleResult(result: { type: string }) {
		if (result.type === 'success') {
			message = editingFaq ? 'FAQ updated!' : 'FAQ created!';
			isError = false;
			closeModal();
		} else {
			message = 'Operation failed.';
			isError = true;
		}
		setTimeout(() => (message = ''), 3000);
	}

	function handleDndConsider(e: CustomEvent<{ items: typeof faqs }>) {
		faqs = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<{ items: typeof faqs }>) {
		faqs = e.detail.items;
		hasOrderChanged = true;
	}

	function getOrderData() {
		return JSON.stringify(faqs.map((f, i) => ({ id: f.id, order: i })));
	}
</script>

<div>
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-primary text-3xl font-bold">FAQ</h1>
			<p class="mt-1 text-surface-400">Manage frequently asked questions - drag to reorder</p>
		</div>
		<div class="flex gap-3">
			{#if hasOrderChanged}
				<form
					method="POST"
					action="?/reorder"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								message = 'Order saved!';
								isError = false;
								hasOrderChanged = false;
							} else {
								message = 'Failed to save order.';
								isError = true;
							}
							setTimeout(() => (message = ''), 3000);
							await update();
						};
					}}
				>
					<input type="hidden" name="order" value={getOrderData()} />
					<button
						type="submit"
						class="flex items-center gap-2 rounded-lg bg-success-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-success-700"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Save Order
					</button>
				</form>
			{/if}
			<button
				onclick={openCreate}
				class="flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary-600"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Create New
			</button>
		</div>
	</div>

	{#if message}
		<div
			class="mb-4 rounded-lg p-3 {isError
				? 'bg-error-700 text-white'
				: 'bg-success-700 text-white'}"
		>
			{message}
		</div>
	{/if}

	<!-- FAQ List -->
	<div
		class="space-y-4"
		use:dndzone={{ items: faqs, flipDurationMs }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each faqs as faq (faq.id)}
			<div
				animate:flip={{ duration: flipDurationMs }}
				class="group flex cursor-grab items-center gap-4 rounded-xl bg-surface-800 p-4 transition-colors hover:bg-surface-700 active:cursor-grabbing"
			>
				<!-- Drag Handle -->
				<div class="flex-shrink-0 text-surface-500 hover:text-surface-300">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 8h16M4 16h16"
						/>
					</svg>
				</div>

				<!-- Icon -->
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/20"
				>
					<svg
						class="h-6 w-6 text-primary-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1">
					<h3 class="truncate text-lg font-semibold text-white">{faq.question}</h3>
					<p class="mt-1 line-clamp-2 text-sm text-surface-400">{faq.answer}</p>
				</div>

				<!-- Edit Button -->
				<button
					aria-label="Edit FAQ"
					onclick={(e) => {
						e.stopPropagation();
						openEdit(faq);
					}}
					class="rounded-lg p-2 text-surface-400 opacity-0 transition-colors group-hover:opacity-100 hover:bg-primary-500/10 hover:text-primary-400"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</button>

				<!-- Delete Button -->
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								message = 'FAQ deleted!';
								isError = false;
							} else {
								message = 'Failed to delete.';
								isError = true;
							}
							setTimeout(() => (message = ''), 3000);
							await update();
						};
					}}
					onclick={(e) => e.stopPropagation()}
				>
					<input type="hidden" name="id" value={faq.id} />
					<button
						aria-label="Delete FAQ"
						type="submit"
						class="rounded-lg p-2 text-surface-400 opacity-0 transition-colors group-hover:opacity-100 hover:bg-error-500/10 hover:text-error-400"
						onclick={(e) => {
							if (!confirm('Delete this FAQ?')) e.preventDefault();
						}}
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</form>
			</div>
		{:else}
			<div class="text-center py-12 text-surface-400">
				<p>No FAQs yet. Click "Create New" to add one.</p>
			</div>
		{/each}
	</div>
</div>

<!-- Modal -->
<Modal bind:isOpen={isModalOpen} title={editingFaq ? 'Edit FAQ' : 'New FAQ'}>
	<form
		method="POST"
		action={editingFaq ? '?/update' : '?/create'}
		class="space-y-4"
		use:enhance={() => {
			return async ({ result, update }) => {
				handleResult(result);
				await update({ reset: !editingFaq });
			};
		}}
	>
		{#if editingFaq}
			<input type="hidden" name="id" value={editingFaq.id} />
		{/if}

		<div>
			<label for="question" class="mb-1 block text-sm font-medium text-surface-200">Question</label>
			<input
				id="question"
				type="text"
				name="question"
				value={editingFaq?.question ?? ''}
				required
				class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="answer" class="mb-1 block text-sm font-medium text-surface-200">Answer</label>
			<textarea
				id="answer"
				name="answer"
				rows="6"
				required
				class="w-full resize-y rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
				>{editingFaq?.answer ?? ''}</textarea
			>
		</div>

		<div class="flex gap-3 pt-2">
			<button
				type="button"
				onclick={closeModal}
				class="flex-1 rounded-lg border border-surface-600 px-4 py-2 text-surface-300 transition-colors hover:bg-surface-700"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="flex-1 rounded-lg bg-primary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-600"
			>
				{editingFaq ? 'Update' : 'Create'}
			</button>
		</div>
	</form>
</Modal>
