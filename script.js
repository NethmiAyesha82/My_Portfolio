const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");

const skillProgressBars = document.querySelectorAll(".skill-progress");
const careerBarFills = document.querySelectorAll(".career-bar-fill");
const sections = document.querySelectorAll("section[id]");

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);

    if (themeToggle) {
        themeToggle.innerHTML = isLight
            ? '<i class="fas fa-moon" aria-hidden="true"></i>'
            : '<i class="fas fa-sun" aria-hidden="true"></i>';

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            isLight ? "Dark Mode" : "Light Mode"
        );
    }

    localStorage.setItem("theme", isLight ? "light" : "dark");
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
    } else {
        setTheme("dark");
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains("light-mode");
    setTheme(isLight ? "dark" : "light");
}

function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    hamburger.setAttribute("aria-expanded", isOpen);
}

function closeMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
}

function updateActiveNavLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

function handleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function animateSkills() {
    skillProgressBars.forEach(bar => {
        const percentage =
            bar.getAttribute("data-width") || bar.dataset.width;

        if (percentage) {
            bar.style.width = `${percentage}%`;
        }
    });
}

function animateCareerBars() {
    careerBarFills.forEach(bar => {
        const percentage =
            bar.getAttribute("data-width") || bar.dataset.width;

        if (percentage) {
            bar.style.width = `${percentage}%`;
        }
    });
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        ".fade-up, .skill-card, .project-card, .education-item"
    );

    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

        animateSkills();
        animateCareerBars();
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                if (entry.target.classList.contains("skill-card")) {
                    animateSkills();
                }

                if (entry.target.classList.contains("career")) {
                    animateCareerBars();
                }

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const careerSection = document.querySelector(".career");

    if (careerSection) {
        observer.observe(careerSection);
    }
}

function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        console.log(
            "Form submitted:",
            Object.fromEntries(formData)
        );

        alert("Thank you for your message!");

        contactForm.reset();
    });
}

function setupNavLinks() {
    navLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
}

function handleResize() {
    if (window.innerWidth > 800 && navMenu && hamburger) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileMenu);
        hamburger.setAttribute("aria-expanded", "false");
    }

    setupNavLinks();
    setupContactForm();
    setupScrollAnimations();

    handleNavbarScroll();
    handleBackToTop();
    updateActiveNavLink();

    if (backToTop) {
        backToTop.addEventListener("click", scrollToTop);
    }
});

window.addEventListener(
    "scroll",
    () => {
        handleNavbarScroll();
        handleBackToTop();
        updateActiveNavLink();
    },
    { passive: true }
);

window.addEventListener("resize", handleResize);