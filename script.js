// ==========================================
// CAMPUSHUB COLLEGE MANAGEMENT
// JavaScript
// ==========================================


// ---------- Mobile Sidebar ----------

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


// Close sidebar after clicking a navigation link

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });
});


// ---------- Active Navigation ----------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
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

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ---------- Smooth Scroll Function ----------

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ---------- Animated Counters ----------

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats-grid");

    if (!statsSection) return;

    const sectionPosition = statsSection.getBoundingClientRect().top;

    if (sectionPosition < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.ceil(target / 60);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    return;
                }

                counter.textContent = current.toLocaleString();

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);


// ---------- Notification Panel ----------

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotifications = document.getElementById("closeNotifications");

notificationBtn.addEventListener("click", () => {

    notificationPanel.classList.toggle("show");

});

closeNotifications.addEventListener("click", () => {

    notificationPanel.classList.remove("show");

});


// Close notifications if clicking outside

document.addEventListener("click", event => {

    if (
        !notificationPanel.contains(event.target) &&
        !notificationBtn.contains(event.target)
    ) {

        notificationPanel.classList.remove("show");

    }

});


// ---------- Search ----------

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const searchableCards = document.querySelectorAll(
        ".department-card, .faculty-card, .quick-card, .event-card, .announcement"
    );

    searchableCards.forEach(card => {

        const content = card.textContent.toLowerCase();

        if (content.includes(searchTerm)) {

            card.style.display = "";

        } else {

            card.style.display = searchTerm ? "none" : "";

        }

    });

});


// ---------- Course Row Interaction ----------

const courseRows = document.querySelectorAll(".course-table tbody tr");

courseRows.forEach(row => {

    row.style.cursor = "pointer";

    row.addEventListener("click", () => {

        const courseName = row.querySelector(".course-name strong").textContent;

        showMessage(
            `${courseName} selected. Course details are available in the college portal.`
        );

    });

});


// ---------- Event Interaction ----------

const eventButtons = document.querySelectorAll(".event-arrow");

eventButtons.forEach(button => {

    button.addEventListener("click", () => {

        const eventName =
            button.parentElement.querySelector("h3").textContent;

        showMessage(
            `You selected "${eventName}". Event details will appear here.`
        );

    });

});


// ---------- Department Interaction ----------

const departmentCards = document.querySelectorAll(".department-card");

departmentCards.forEach(card => {

    card.addEventListener("click", () => {

        const department =
            card.querySelector("h3").textContent;

        showMessage(
            `${department} department selected. Explore its courses and faculty.`
        );

    });

});


// ---------- Announcement Interaction ----------

const announcementButtons =
    document.querySelectorAll(".announcement button");

announcementButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title =
            button.parentElement.querySelector("h3").textContent;

        showMessage(
            `Opening announcement: ${title}`
        );

    });

});


// ---------- Simple Message ----------

function showMessage(message) {

    const existingMessage =
        document.querySelector(".toast-message");

    if (existingMessage) {
        existingMessage.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast-message";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 20);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);

}


// ---------- Toast Styling ----------

const toastStyle = document.createElement("style");

toastStyle.textContent = `

.toast-message {

    position: fixed;
    bottom: 25px;
    right: 25px;

    max-width: 320px;

    background: #101d36;
    color: white;

    padding: 13px 17px;

    border-radius: 8px;

    font-size: 10px;

    box-shadow: 0 10px 35px rgba(0,0,0,.18);

    transform: translateY(20px);
    opacity: 0;

    transition: .3s;

    z-index: 5000;

}

.toast-message.show {

    transform: translateY(0);
    opacity: 1;

}

`;

document.head.appendChild(toastStyle);


// ---------- Support Button ----------

const supportButton =
    document.querySelector(".help-box button");

supportButton.addEventListener("click", () => {

    showMessage(
        "Campus Support: support@campushub.edu"
    );

});


// ---------- View All Buttons ----------

document.querySelectorAll(".outline-btn").forEach(button => {

    button.addEventListener("click", () => {

        showMessage(
            "This section is ready for integration with a full college management system."
        );

    });

});


// ---------- Page Load Animation ----------

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
