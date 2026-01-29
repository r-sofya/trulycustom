<script lang="ts">
	import pb, { contactsCollection } from '$lib/utils/pocketbase';
	import PrimaryButton from '$lib/components/ui/primaryButton.svelte';

	// Form state
	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';
	let message = '';
	let terms = false;
	let budget = '';
	let submitting = false;
	let submitted = false;
	let error = '';

	// Focus states for floating labels
	let firstNameFocused = false;
	let lastNameFocused = false;
	let emailFocused = false;
	let phoneFocused = false;
	let budgetFocused = false;
	let messageFocused = false;

	// Replace with your webhook URL
	const WEBHOOK_URL = 'https://n8n.trulycustom.ca/webhook/c211a8f2-a1a8-4ff8-90c1-2e881735e70c';

	async function handleSubmit(e: Event) {
		console.log('handleSubmit');
		e.preventDefault();
		error = '';
		submitted = false;

		if (!terms) {
			error = 'You must agree to the Terms.';
			return;
		}

		submitting = true;

		const formData = {
			firstName,
			lastName,
			email,
			phone,
			message,
			budget
		};

		try {
			// Send to both webhook and PocketBase in parallel
			const [webhookRes] = await Promise.all([
				fetch(WEBHOOK_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}),
				pb.collection(contactsCollection).create(formData)
			]);

			if (!webhookRes.ok) {
				throw new Error('Failed to submit form');
			}

			submitted = true;
			// Reset form
			firstName = '';
			lastName = '';
			email = '';
			phone = '';
			message = '';
			budget = '';
			terms = false;
		} catch (err: unknown) {
			error = err instanceof Error ? err.message : 'Submission failed';
		} finally {
			submitting = false;
		}
	}
</script>

<section id="Contact" class="relative px-[5%] py-14 md:py-20 lg:py-24">
	<div class="relative z-10 container">
		<!-- Header Section -->
		<div class="mx-auto mb-10 max-w-2xl text-center md:mb-12">
			<span
				class="mb-3 inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 ring-1 ring-primary-500/20"
			>
				Let's Connect
			</span>
			<h2 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
				Start Your <span class="bg-gradient-to-r from-primary-400 to-primary-600">Project</span>
			</h2>
			<p class="text-base text-gray-400 md:text-lg">
				Ready to bring your ideas to life? Drop us a message and let's create something amazing
				together.
			</p>
		</div>

		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
			<!-- Contact Info Cards -->
			<div class="flex flex-col gap-4 lg:col-span-2">
				<!-- Email Card -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<div class="relative flex items-center gap-4">
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 transition-transform duration-300 group-hover:scale-110"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</div>
						<div>
							<h3 class="text-sm font-semibold text-white">Email Us</h3>
							<p
								class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-primary-400"
							>
								hello@trulycustom.ca
							</p>
						</div>
					</div>
				</div>

				<!-- Response Time Badge -->
				<div
					class="mt-2 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5"
				>
					<div class="relative flex h-2.5 w-2.5">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
						></span>
						<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
					</div>
					<span class="text-sm text-green-400">Usually responds within 24 hours</span>
				</div>

				<!-- What to Expect Timeline -->
				<div class="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
					<h3 class="mb-4 text-base font-semibold text-white">What to Expect</h3>
					<div class="relative space-y-4">
						<!-- Timeline line -->
						<div
							class="absolute top-2 left-[11px] h-[calc(100%-16px)] w-0.5 bg-gradient-to-b from-primary-500 to-primary-500/20"
						></div>

						<!-- Step 1 -->
						<div class="relative flex items-start gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white"
							>
								1
							</div>
							<div>
								<p class="text-base font-medium text-white">Submit Inquiry</p>
								<p class="text-sm text-gray-500">Share your project details</p>
							</div>
						</div>

						<!-- Step 2 -->
						<div class="relative flex items-start gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/80 text-xs font-bold text-white"
							>
								2
							</div>
							<div>
								<p class="text-base font-medium text-white">We Review</p>
								<p class="text-sm text-gray-500">Assess your needs & goals</p>
							</div>
						</div>

						<!-- Step 3 -->
						<div class="relative flex items-start gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/60 text-xs font-bold text-white"
							>
								3
							</div>
							<div>
								<p class="text-base font-medium text-white">Schedule Call</p>
								<p class="text-sm text-gray-500">Discuss your vision together</p>
							</div>
						</div>

						<!-- Step 4 -->
						<div class="relative flex items-start gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/40 text-xs font-bold text-white"
							>
								4
							</div>
							<div>
								<p class="text-base font-medium text-white">Start Building</p>
								<p class="text-sm text-gray-500">Bring your idea to life</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="lg:col-span-3">
				<form
					class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
					on:submit={handleSubmit}
				>
					<div class="relative space-y-5">
						<!-- Name Row -->
						<div class="grid gap-5 md:grid-cols-2">
							<!-- First Name -->
							<div class="group relative">
								<input
									type="text"
									id="firstName"
									bind:value={firstName}
									on:focus={() => (firstNameFocused = true)}
									on:blur={() => (firstNameFocused = false)}
									required
									class="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
									placeholder="First Name"
								/>
								<label
									for="firstName"
									class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-400"
								>
									First Name
								</label>
							</div>

							<!-- Last Name -->
							<div class="group relative">
								<input
									type="text"
									id="lastName"
									bind:value={lastName}
									on:focus={() => (lastNameFocused = true)}
									on:blur={() => (lastNameFocused = false)}
									required
									class="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
									placeholder="Last Name"
								/>
								<label
									for="lastName"
									class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-400"
								>
									Last Name
								</label>
							</div>
						</div>

						<!-- Email & Phone Row -->
						<div class="grid gap-5 md:grid-cols-2">
							<!-- Email -->
							<div class="group relative">
								<input
									type="email"
									id="email"
									bind:value={email}
									on:focus={() => (emailFocused = true)}
									on:blur={() => (emailFocused = false)}
									required
									class="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
									placeholder="Email"
								/>
								<label
									for="email"
									class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-400"
								>
									Email Address
								</label>
							</div>

							<!-- Phone -->
							<div class="group relative">
								<input
									type="tel"
									id="phone"
									bind:value={phone}
									on:focus={() => (phoneFocused = true)}
									on:blur={() => (phoneFocused = false)}
									class="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
									placeholder="Phone"
								/>
								<label
									for="phone"
									class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-400"
								>
									Phone <span class="text-gray-600">(optional)</span>
								</label>
							</div>
						</div>

						<!-- Budget -->
						<div class="group relative">
							<input
								type="text"
								id="budget"
								bind:value={budget}
								on:focus={() => (budgetFocused = true)}
								on:blur={() => (budgetFocused = false)}
								class="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
								placeholder="Budget"
							/>
							<label
								for="budget"
								class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-400"
							>
								Project Budget <span class="text-gray-600">(optional)</span>
							</label>
						</div>

						<!-- Message -->
						<div class="group relative">
							<textarea
								id="message"
								bind:value={message}
								on:focus={() => (messageFocused = true)}
								on:blur={() => (messageFocused = false)}
								required
								rows="4"
								class="peer w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2.5 text-white placeholder-transparent transition-all duration-300 outline-none focus:border-primary-500 focus:bg-white/10 focus:ring-2 focus:ring-primary-500/20"
								placeholder="Message"
							></textarea>
							<label
								for="message"
								class="pointer-events-none absolute top-1.5 left-4 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary-400"
							>
								Tell us about your project
							</label>
						</div>

						<!-- Terms Checkbox -->
						<label class="group flex cursor-pointer items-start gap-3">
							<div class="relative mt-0.5">
								<input type="checkbox" bind:checked={terms} required class="peer sr-only" />
								<div
									class="flex h-5 w-5 items-center justify-center rounded-md border-2 border-white/20 bg-white/5 transition-all duration-300 group-hover:border-primary-400 peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-focus:ring-2 peer-focus:ring-primary-500/20"
								>
									{#if terms}
										<svg
											class="h-3 w-3 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="3"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
										</svg>
									{/if}
								</div>
							</div>
							<span
								class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
							>
								I agree to the <a
									href="/terms"
									class="text-primary-400 underline decoration-primary-400/30 underline-offset-2 transition-colors hover:text-primary-300 hover:decoration-primary-300"
									>Terms of Service</a
								>
								and
								<a
									href="/privacy"
									class="text-primary-400 underline decoration-primary-400/30 underline-offset-2 transition-colors hover:text-primary-300 hover:decoration-primary-300"
									>Privacy Policy</a
								>
							</span>
						</label>

						<!-- Error/Success Messages -->
						{#if error}
							<div
								class="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
							>
								<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								{error}
							</div>
						{/if}

						{#if submitted}
							<div
								class="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5 text-sm text-green-400"
							>
								<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Thank you! We'll be in touch soon.
							</div>
						{/if}

						<!-- Submit Button - Primary style -->
						<div class="w-full [&>button]:w-full [&>button]:justify-center">
							<PrimaryButton>
								<span slot="text">
									{#if submitting}
										<span class="flex items-center gap-2">
											<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle
													class="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													stroke-width="4"
												></circle>
												<path
													class="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Sending...
										</span>
									{:else}
										Send Message
									{/if}
								</span>
							</PrimaryButton>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
