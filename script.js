// Edit this section to change the private login, start date, or photo set.
const CONFIG = {
  username: "TroySarah",
  password: "330429",
  relationshipStartDate: "2019-08-04T00:00:00",
  timelineMessages: [
    "From the moment we met, my life became brighter.",
    "Thank you for always believing in me.",
    "Every laugh, every adventure, every little moment became one of my favorite memories.",
    "No matter where life takes us, you'll always be my favorite place.",
    "I promise to keep making memories with you for many years to come."
  ],
  images: [
    "img1.jpeg",
    "Img2.jpeg",
    "Img3.jpeg",
    "Messenger_creation_1047174463260488.jpeg",
    "Messenger_creation_1073526020427285.jpeg",
    "Messenger_creation_1366030767393312.jpeg",
    "Messenger_creation_1388302131813541.jpeg",
    "Messenger_creation_1467151463874282.jpeg",
    "Messenger_creation_1486713112266825.jpeg",
    "Messenger_creation_1756934731473304.jpeg",
    "Messenger_creation_1768743493599593.jpeg",
    "Messenger_creation_1823008434801765.jpeg",
    "Messenger_creation_2042133366170629.jpeg",
    "Messenger_creation_236222489523403.jpeg",
    "Messenger_creation_2457012214686560.jpeg",
    "Messenger_creation_2626631720844398.jpeg",
    "Messenger_creation_2630631783768932.jpeg",
    "Messenger_creation_306153849079028.jpeg",
    "Messenger_creation_3126910700777667.jpeg",
    "Messenger_creation_313565001366006.jpeg",
    "Messenger_creation_348918941328142.jpeg",
    "Messenger_creation_352214404462925.jpeg",
    "Messenger_creation_353144417668404.jpeg",
    "Messenger_creation_356142347020224.jpeg",
    "Messenger_creation_388313307019251.jpeg",
    "Messenger_creation_395414123274201.jpeg",
    "Messenger_creation_412306508012719.jpeg",
    "Messenger_creation_442514931472891.jpeg",
    "Messenger_creation_469205765780072.jpeg",
    "Messenger_creation_6936897203055790.jpeg",
    "Messenger_creation_721673186485268.jpeg",
    "Messenger_creation_739491785004051.jpeg"
  ]
};

const loginScreen = document.getElementById("loginScreen");
const memoriesScreen = document.getElementById("memoriesScreen");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const errorMessage = document.getElementById("errorMessage");
const gallery = document.getElementById("gallery");
const floatingLoveHeart = document.getElementById("floatingLoveHeart");
const loveModal = document.getElementById("loveModal");
const closeLoveModal = document.getElementById("closeLoveModal");
const loveTimeline = document.getElementById("loveTimeline");

function makeFloatingHearts() {
  const field = document.getElementById("heartField");
  const hearts = ["❤️", "♥", "♡"];

  for (let index = 0; index < 28; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = hearts[index % hearts.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 1.1 + 0.75}rem`;
    heart.style.animationDuration = `${Math.random() * 8 + 10}s`;
    heart.style.animationDelay = `${Math.random() * -16}s`;
    field.appendChild(heart);
  }
}

function makeSparkles() {
  const field = document.getElementById("sparkleField");

  for (let index = 0; index < 42; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    sparkle.style.animationDelay = `${Math.random() * -5}s`;
    field.appendChild(sparkle);
  }
}

function buildGallery() {
  // Browsers cannot read folder contents directly, so this supports both listed files and photo1.jpg-photo20.jpg.
  const numberedFallbacks = Array.from({ length: 20 }, (_, index) => `photo${index + 1}.jpg`);
  const imageNames = [...CONFIG.images, ...numberedFallbacks];

  imageNames.forEach((fileName, index) => {
    const card = document.createElement("article");
    const image = document.createElement("img");

    card.className = "photo-card";
    image.src = `images/${fileName}`;
    image.alt = `Memory ${index + 1}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      card.remove();
    });

    card.appendChild(image);
    gallery.appendChild(card);
  });
}

function buildLoveTimeline() {
  const timelinePhotos = CONFIG.images.slice(0, Math.max(CONFIG.timelineMessages.length, 5));
  const fragment = document.createDocumentFragment();

  timelinePhotos.forEach((fileName, index) => {
    const photoItem = document.createElement("article");
    const frame = document.createElement("div");
    const image = document.createElement("img");
    const messageItem = document.createElement("article");
    const message = document.createElement("p");

    photoItem.className = "timeline-item timeline-photo modal-reveal";
    frame.className = "timeline-photo-frame";
    image.src = `images/${fileName}`;
    image.alt = `Timeline memory ${index + 1}`;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      photoItem.remove();
    });

    messageItem.className = "timeline-item timeline-message modal-reveal";
    message.textContent = CONFIG.timelineMessages[index % CONFIG.timelineMessages.length];

    frame.appendChild(image);
    photoItem.appendChild(frame);
    messageItem.appendChild(message);
    fragment.appendChild(photoItem);
    fragment.appendChild(messageItem);
  });

  loveTimeline.appendChild(fragment);
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal, .photo-card").forEach((element) => {
    observer.observe(element);
  });
}

function revealModalItems() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    root: document.querySelector(".modal-panel"),
    threshold: 0.18
  });

  document.querySelectorAll(".modal-reveal").forEach((element) => {
    observer.observe(element);
  });
}

function updateCounter() {
  const start = new Date(CONFIG.relationshipStartDate).getTime();
  const now = Date.now();
  const difference = Math.max(0, now - start);
  const totalMinutes = Math.floor(difference / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  document.getElementById("daysCount").textContent = days.toLocaleString();
  document.getElementById("hoursCount").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutesCount").textContent = minutes.toString().padStart(2, "0");
}

function showMemories() {
  loginScreen.classList.remove("is-active");

  window.setTimeout(() => {
    memoriesScreen.classList.add("is-active");
    updateCounter();
    window.setInterval(updateCounter, 1000);
    revealOnScroll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 420);
}

function rejectLogin() {
  errorMessage.classList.add("show");
  loginForm.classList.remove("shake");
  void loginForm.offsetWidth;
  loginForm.classList.add("shake");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const isValid = username === CONFIG.username && password === CONFIG.password;

  if (!isValid) {
    rejectLogin();
    return;
  }

  errorMessage.classList.remove("show");
  loginButton.classList.add("loading");
  loginButton.disabled = true;

  window.setTimeout(showMemories, 2000);
});

floatingLoveHeart.addEventListener("click", () => {
  loveModal.showModal();
  document.body.classList.add("modal-open");
  revealModalItems();
});

closeLoveModal.addEventListener("click", () => {
  loveModal.close();
});

loveModal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

loveModal.addEventListener("click", (event) => {
  if (event.target === loveModal) {
    loveModal.close();
  }
});

makeFloatingHearts();
makeSparkles();
buildGallery();
buildLoveTimeline();
