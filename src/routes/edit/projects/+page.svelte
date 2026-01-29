<script lang="ts">
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Modal from '$lib/components/ui/Modal.svelte';

	let { data } = $props();

	let isModalOpen = $state(false);
	let editingProject: Record<string, unknown> | null = $state(null);
	let message = $state('');
	let isError = $state(false);
	let hasOrderChanged = $state(false);

	// Image upload state
	let isDraggingFile = $state(false);
	let selectedFile: File | null = $state(null);
	let previewUrl: string | null = $state(null);
	let fileInputRef: HTMLInputElement;

	// Create a mutable copy of projects for drag and drop
	let projects = $state(data.projects.map((p, i) => ({ ...p, order: p.order ?? i })));
	const flipDurationMs = 200;

	// Sync projects when data changes (e.g., after create/update/delete)
	$effect(() => {
		projects = data.projects.map((p, i) => ({ ...p, order: p.order ?? i }));
		hasOrderChanged = false;
	});

	function openCreate() {
		editingProject = null;
		isModalOpen = true;
	}

	function openEdit(project: Record<string, unknown>) {
		editingProject = project;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		editingProject = null;
		selectedFile = null;
		previewUrl = null;
	}

	function handleFileDrop(e: DragEvent) {
		e.preventDefault();
		isDraggingFile = false;
		const file = e.dataTransfer?.files[0];
		if (file && file.type.startsWith('image/')) {
			setSelectedFile(file);
		}
	}

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	}

	function setSelectedFile(file: File) {
		selectedFile = file;
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		previewUrl = URL.createObjectURL(file);
	}

	function removeSelectedFile() {
		selectedFile = null;
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		previewUrl = null;
		if (fileInputRef) fileInputRef.value = '';
	}

	function handleResult(result: { type: string }) {
		if (result.type === 'success') {
			message = editingProject ? 'Project updated!' : 'Project created!';
			isError = false;
			closeModal();
		} else {
			message = 'Operation failed.';
			isError = true;
		}
		setTimeout(() => (message = ''), 3000);
	}

	function handleDndConsider(e: CustomEvent<{ items: typeof projects }>) {
		projects = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<{ items: typeof projects }>) {
		projects = e.detail.items;
		hasOrderChanged = true;
	}

	function getOrderData() {
		return JSON.stringify(projects.map((p, i) => ({ id: p.id, order: i })));
	}
</script>

<div>
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-primary text-3xl font-bold">Projects</h1>
			<p class="mt-1 text-surface-400">Manage portfolio projects - drag to reorder</p>
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

	<!-- Projects List -->
	<div
		class="space-y-4"
		use:dndzone={{ items: projects, flipDurationMs }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each projects as project (project.id)}
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

				<!-- Thumbnail -->
				<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface-700">
					{#if project.imageUrl}
						<img src={project.imageUrl} alt={project.title} class="h-full w-full object-cover" />
					{:else}
						<div class="flex h-full w-full items-center justify-center text-surface-500">
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					{/if}
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1">
					<h3 class="truncate text-lg font-semibold text-white">{project.title}</h3>
					{#if project.tags?.length}
						<div class="mt-1 flex flex-wrap gap-2">
							{#each project.tags.slice(0, 3) as tag}
								<span class="rounded-full bg-primary-500/20 px-2 py-0.5 text-xs text-primary-400">
									{tag}
								</span>
							{/each}
						</div>
					{/if}
					<p class="mt-1 line-clamp-1 text-sm text-surface-400">
						{project.description || 'No description'}
					</p>
				</div>

				<!-- Edit Button -->
				<button
					onclick={(e) => {
						e.stopPropagation();
						openEdit(project);
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
								message = 'Project deleted!';
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
					<input type="hidden" name="id" value={project.id} />
					<button
						type="submit"
						class="rounded-lg p-2 text-surface-400 opacity-0 transition-colors group-hover:opacity-100 hover:bg-error-500/10 hover:text-error-400"
						onclick={(e) => {
							if (!confirm('Delete this project?')) e.preventDefault();
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
				<p>No projects yet. Click "Create New" to add one.</p>
			</div>
		{/each}
	</div>
</div>

<!-- Modal -->
<Modal bind:isOpen={isModalOpen} title={editingProject ? 'Edit Project' : 'New Project'}>
	<form
		method="POST"
		action={editingProject ? '?/update' : '?/create'}
		class="space-y-4"
		enctype="multipart/form-data"
		use:enhance={({ formData }) => {
			// Add the drag-dropped file to the form data
			if (selectedFile) {
				formData.set('image', selectedFile);
			}
			return async ({ result, update }) => {
				handleResult(result);
				await update({ reset: !editingProject });
			};
		}}
	>
		{#if editingProject}
			<input type="hidden" name="id" value={editingProject.id} />
		{/if}

		<div>
			<label for="title" class="mb-1 block text-sm font-medium text-surface-200">Title</label>
			<input
				id="title"
				type="text"
				name="title"
				value={editingProject?.title ?? ''}
				required
				class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="image" class="mb-1 block text-sm font-medium text-surface-200">Image</label>

			<!-- Preview: existing image or new selection -->
			{#if previewUrl || editingProject?.imageUrl}
				<div class="relative mb-3 inline-block">
					<div class="h-24 w-24 overflow-hidden rounded-lg bg-surface-700">
						<img
							src={previewUrl ?? String(editingProject?.imageUrl ?? '')}
							alt="Preview"
							class="h-full w-full object-cover"
						/>
					</div>
					{#if previewUrl}
						<button
							type="button"
							onclick={removeSelectedFile}
							class="absolute -top-2 -right-2 rounded-full bg-error-500 p-1 text-white hover:bg-error-600"
							aria-label="Remove image"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>
				{#if editingProject?.imageUrl && !previewUrl}
					<p class="mb-2 text-xs text-surface-400">Drop a new image to replace</p>
				{/if}
			{/if}

			<!-- Dropzone -->
			<div
				role="button"
				tabindex="0"
				class="relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors
					{isDraggingFile
					? 'border-primary-500 bg-primary-500/10'
					: 'border-surface-600 hover:border-surface-500 hover:bg-surface-700/50'}"
				ondragover={(e) => {
					e.preventDefault();
					isDraggingFile = true;
				}}
				ondragleave={() => (isDraggingFile = false)}
				ondrop={handleFileDrop}
				onclick={() => fileInputRef?.click()}
				onkeydown={(e) => e.key === 'Enter' && fileInputRef?.click()}
			>
				<svg
					class="mx-auto h-10 w-10 text-surface-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<p class="mt-2 text-sm text-surface-300">Drag & drop an image here</p>
				<p class="text-xs text-surface-500">or click to browse</p>

				<input
					bind:this={fileInputRef}
					id="image"
					type="file"
					name="image"
					accept="image/*"
					onchange={handleFileSelect}
					class="hidden"
				/>
			</div>
		</div>

		<div>
			<label for="websiteUrl" class="mb-1 block text-sm font-medium text-surface-200"
				>Website URL</label
			>
			<input
				id="websiteUrl"
				type="url"
				name="websiteUrl"
				value={editingProject?.websiteUrl ?? ''}
				required
				class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="tags" class="mb-1 block text-sm font-medium text-surface-200"
				>Tags (comma-separated)</label
			>
			<input
				id="tags"
				type="text"
				name="tags"
				value={(editingProject?.tags as string[])?.join(', ') ?? ''}
				placeholder="web, design, sveltekit"
				class="w-full rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="description" class="mb-1 block text-sm font-medium text-surface-200"
				>Description</label
			>
			<textarea
				id="description"
				name="description"
				rows="4"
				required
				class="w-full resize-y rounded-lg border border-surface-600 bg-surface-700 px-4 py-2 text-white placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
				>{editingProject?.description ?? ''}</textarea
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
				{editingProject ? 'Update' : 'Create'}
			</button>
		</div>
	</form>
</Modal>
