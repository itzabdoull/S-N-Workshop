const programs = [
  {
    title: "Intro Studio Sessions",
    meta: "01",
    text: "A welcoming format for first-time guests focused on core tools, materials, and a finished take-home project.",
  },
  {
    title: "Private Group Workshops",
    meta: "02",
    text: "Book a guided creative session for birthdays, teams, or small community gatherings with a custom project plan.",
  },
  {
    title: "Custom Commission Support",
    meta: "03",
    text: "Collaborate on a one-off piece with help selecting materials, refining details, and shaping a durable result.",
  },
];

const steps = [
  {
    title: "Choose a session",
    text: "Pick a public class, request a private workshop, or ask about a tailored project format.",
  },
  {
    title: "Arrive and settle in",
    text: "We prepare the tools and materials ahead of time so you can focus on learning and making.",
  },
  {
    title: "Build with guidance",
    text: "Follow clear steps, ask questions freely, and finish with a piece shaped by your own preferences.",
  },
];

const faqs = [
  {
    question: "Do I need prior experience?",
    answer: "No. Most sessions are designed for beginners and include guidance at every major step.",
  },
  {
    question: "Are materials included?",
    answer: "Yes. Standard class materials are included, and any specialty add-ons are noted before booking.",
  },
  {
    question: "Can I book a private event?",
    answer: "Yes. Private bookings are available for small groups, celebrations, and team experiences.",
  },
];

const renderCards = (items, containerId, template) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(template).join("");
};

renderCards(
  programs,
  "program-grid",
  ({ title, text, meta }) => `
    <article class="program-card">
      <span class="meta">${meta}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `
);

renderCards(
  steps,
  "steps-grid",
  ({ title, text }, index) => `
    <article class="step-card">
      <span class="step-index">0${index + 1}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `
);

renderCards(
  faqs,
  "faq-list",
  ({ question, answer }, index) => `
    <article class="accordion-item ${index === 0 ? "open" : ""}">
      <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${question}</span>
        <span>${index === 0 ? "−" : "+"}</span>
      </button>
      <div class="answer">
        <p>${answer}</p>
      </div>
    </article>
  `
);

document.querySelectorAll(".accordion-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".accordion-item").forEach((entry) => {
      entry.classList.remove("open");
      const trigger = entry.querySelector("button");
      trigger.setAttribute("aria-expanded", "false");
      trigger.lastElementChild.textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      button.lastElementChild.textContent = "−";
    }
  });
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});
