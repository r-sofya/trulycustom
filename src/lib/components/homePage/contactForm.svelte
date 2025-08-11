<script lang="ts">
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
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
          budget
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      submitted = true;
      // Optionally reset form
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


<section id="Contact" class="px-[5%] py-16 md:py-24 lg:py-28">
  <div
    class="container grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16"
  >
    <div>
      <div class="mb-6 md:mb-8">
        <p class="mb-3 font-semibold md:mb-4">Connect</p>
        <h2 class="mb-3 text-5xl font-bold md:mb-4 ">Get in Touch</h2>
        <p class="text-medium">We'd love to hear from you!</p>
      </div>
      <div class="grid grid-cols-1 gap-4 py-2">
        <div class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 -960 960 960"
            class="size-6 flex-none text-scheme-text"
            fill="currentColor"
          >
            <path
              d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z"
            ></path>
          </svg>
          <p>hello@relume.io</p>
        </div>
        <div class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 -960 960 960"
            class="size-6 flex-none text-scheme-text"
            fill="currentColor"
          >
            <path
              d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
            ></path>
          </svg>
          <p>+1 (555) 000-0000</p>
        </div>
        <div class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 -960 960 960"
            class="size-6 flex-none text-scheme-text"
            fill="currentColor"
          >
            <path
              d="M480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 79q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5Zm0-453Zm0 80q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z"
            ></path>
          </svg>
          <p>123 Sample St, Sydney NSW 2000 AU</p>
        </div>
      </div>
    </div>

    <form class="grid max-w-lg grid-cols-1 grid-rows-[auto_auto] gap-6" onsubmit={handleSubmit}>
      <div class="grid grid-cols-2 gap-6">
        <div class="grid w-full items-center">
          <label
            data-slot="label"
            class="flex items-center gap-2 select-none mb-2"
            for="firstName"
            >First Name</label
          >
          <div class="relative flex w-full items-center">
            <input
              type="text"
              data-slot="input"
              placeholder="John"
              class="flex size-full rounded-form align-middle transition-all duration-200 border border-scheme-border bg-scheme-background min-h-11 px-3 py-2"
              id="firstName"
              bind:value={firstName}
              required
            />
          </div>
        </div>
        <div class="grid w-full items-center">
          <label
            data-slot="label"
            class="flex items-center gap-2 select-none mb-2"
            for="lastName"
            >Last Name</label
          >
          <div class="relative flex w-full items-center">
            <input
              type="text"
              data-slot="input"
              placeholder="Doe"
              class="flex size-full rounded-form align-middle transition-all duration-200 border border-scheme-border bg-scheme-background min-h-11 px-3 py-2"
              id="lastName"
              bind:value={lastName}
              required
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="grid w-full items-center">
          <label
            data-slot="label"
            class="flex items-center gap-2 select-none mb-2"
            for="email"
            >Email</label
          >
          <div class="relative flex w-full items-center">
            <input
              type="email"
              data-slot="input"
              placeholder="example@email.com"
              class="flex size-full rounded-form align-middle transition-all duration-200 border border-scheme-border bg-scheme-background min-h-11 px-3 py-2"
              id="email"
              bind:value={email}
              required
            />
          </div>
        </div>
        <div class="grid w-full items-center">
          <label
            data-slot="label"
            class="flex items-center gap-2 select-none mb-2"
            for="phone"
            >Phone Number</label
          >
          <div class="relative flex w-full items-center">
            <input
              type="text"
              data-slot="input"
              placeholder="+1 (555) 000-0000"
              class="flex size-full rounded-form align-middle transition-all duration-200 border border-scheme-border bg-scheme-background min-h-11 px-3 py-2"
              id="phone"
              bind:value={phone}
            />
          </div>
        </div>
      </div>
      <div class="grid w-full items-center">
        <label
          data-slot="label"
          class="flex items-center gap-2 select-none mb-2"
          for="budget"
          >Budget</label
        >
        <div class="relative flex w-full items-center">
          <input
            type="text"
            data-slot="input"
            placeholder="Enter your budget" 
            class="flex size-full rounded-form align-middle transition-all duration-200 border border-scheme-border bg-scheme-background min-h-11 px-3 py-2"
            id="budget"
            bind:value={budget}
          />
        </div>
      </div>
      <div class="grid w-full items-center">
        <label
          data-slot="label"
          class="flex items-center gap-2 select-none mb-2"
          for="message"
          >Message</label
        >
        <textarea
          data-slot="textarea"
          class="flex w-full rounded-form focus-visible:outline-none border border-scheme-border bg-scheme-background p-3 min-h-[11.25rem] overflow-auto"
          id="message"
          placeholder="Write your thoughts..."
          bind:value={message}
          required
        ></textarea>
      </div>
      <div class="text-small mb-3 flex items-center space-x-2 md:mb-4">
        <label class="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="terms"
            bind:checked={terms}
            class="peer size-[1.125rem] rounded-checkbox transition-all duration-200 border border-scheme-border appearance-none bg-scheme-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary"
            required
          />
          <span class="pointer-events-none absolute left-0 top-0 flex h-[1.125rem] w-[1.125rem] items-center justify-center">
            {#if terms}
              <svg class="text-white" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8.5L7 11.5L12 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            {/if}
          </span>
        </label>
        <label
          data-slot="label"
          class="flex items-center gap-2 select-none cursor-pointer"
          for="terms"
          >I agree to the Terms</label
        >
      </div>
      {#if error}
        <div class="text-red-600">{error}</div>
      {/if}
      {#if submitted}
        <div class="text-green-600">Thank you for your message!</div>
      {/if}
      <div>
        <button
          data-slot="button"
          class="inline-flex items-center justify-center gap-3 rounded-button whitespace-nowrap transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-scheme-border bg-neutral-darkest text-white px-6 py-3"
          title="Submit"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  </div>
</section>