// Navbar scroll effect
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    highlightActiveNavLink();
});

// Pet filter functionality
function filterPets(type) {
    const cards = document.querySelectorAll(".card");
    const filterButtons = document.querySelectorAll(".filter-buttons button");

    filterButtons.forEach(button => button.classList.remove('active'));

    filterButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes(type)) {
            button.classList.add('active');
        }
    });

    cards.forEach(card => {
        if (type === 'all' || card.classList.contains(type)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Typewriter effect
const text = "Find & Adopt Your New Best Friend!";
let index = 0;
function typeWriter() {
    const el = document.querySelector(".typewriter");
    if (el && index < text.length) {
        el.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
    }
}

// *** THIS IS THE CORRECTED CODE FOR ACTIVE LINKS ***
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let activeLinkFound = false;

    // Check from bottom to top to find the highest visible section
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        
        // Check if the top of the section is visible in the viewport with a small buffer
        if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            const currentId = section.getAttribute('id');
            const linkToHighlight = document.querySelector(`.nav-links a[href="#${currentId}"]`);
            if (linkToHighlight) {
                linkToHighlight.classList.add('active-link');
                activeLinkFound = true;
                break;
            }
        }
    }

    // Fallback: If no section is active (e.g., at the very top), activate the Home link
    if (!activeLinkFound) {
        document.querySelector('.nav-links a[href="#home"]').classList.add('active-link');
    }
}

// Initialize functions on page load
window.onload = function() {
    typeWriter();
    highlightActiveNavLink();
    
    // Set 'All' filter button as active on load
    const allFilterButton = document.querySelector('.filter-buttons button[onclick="filterPets(\'all\')"]');
    if (allFilterButton) {
        allFilterButton.classList.add('active');
    }
    filterPets('all');
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link immediately on click
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => link.classList.remove('active-link'));
        this.classList.add('active-link');
    });
});