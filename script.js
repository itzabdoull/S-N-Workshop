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

const MINUS = "\u2212";

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (typeof text === "string") element.textContent = text;
  return element;
};

const renderPrograms = () => {
  const container = document.getElementById("program-grid");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  programs.forEach(({ title, text, meta }) => {
    const card = createElement("article", "program-card");
    const badge = createElement("span", "meta", meta);
    const heading = createElement("h3", "", title);
    const copy = createElement("p", "", text);

    card.append(badge, heading, copy);
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
};

const renderSteps = () => {
  const container = document.getElementById("steps-grid");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  steps.forEach(({ title, text }, index) => {
    const card = createElement("article", "step-card");
    const badge = createElement("span", "step-index", `0${index + 1}`);
    const heading = createElement("h3", "", title);
    const copy = createElement("p", "", text);

    card.append(badge, heading, copy);
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
};

const renderFaqs = () => {
  const container = document.getElementById("faq-list");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  faqs.forEach(({ question, answer }, index) => {
    const item = createElement("article", `accordion-item${index === 0 ? " open" : ""}`);
    const button = createElement("button");
    const questionText = createElement("span", "", question);
    const icon = createElement("span", "", index === 0 ? MINUS : "+");
    const panel = createElement("div", "answer");
    const copy = createElement("p", "", answer);

    button.type = "button";
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `faq-answer-${index + 1}`);
    button.id = `faq-trigger-${index + 1}`;
    icon.setAttribute("aria-hidden", "true");

    panel.id = `faq-answer-${index + 1}`;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", button.id);
    panel.hidden = index !== 0;

    panel.appendChild(copy);
    button.append(questionText, icon);
    item.append(button, panel);
    fragment.appendChild(item);
  });

  container.replaceChildren(fragment);
};

const bindAccordion = () => {
  document.querySelectorAll(".accordion-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".accordion-item").forEach((entry) => {
        entry.classList.remove("open");
        const trigger = entry.querySelector("button");
        const answer = entry.querySelector(".answer");
        trigger.setAttribute("aria-expanded", "false");
        trigger.lastElementChild.textContent = "+";
        answer.hidden = true;
      });

      if (!isOpen) {
        item.classList.add("open");
        const answer = item.querySelector(".answer");
        button.setAttribute("aria-expanded", "true");
        button.lastElementChild.textContent = MINUS;
        answer.hidden = false;
      }
    });
  });
};

const bindMenu = () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!menuToggle || !header || !siteNav) return;

  const closeMenu = (returnFocus = false) => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (returnFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });
};

const bindForm = () => {
  document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

renderPrograms();
renderSteps();
renderFaqs();
bindAccordion();
bindMenu();
bindForm();
