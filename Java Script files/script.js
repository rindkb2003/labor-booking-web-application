// Function to load header
function loadHeader() {
    const headerElement = document.createElement('header');
    headerElement.innerHTML = `
        <div class="logo">
           <img src="/labor-booking-web-application/Images/logo.png" alt="Logo">
        </div>
        <div class="menu-icon" id="menuIcon">&#x2630;</div> <!-- Menu icon (hamburger) -->
        <nav>
            <ul id="navLinks" class="hidden">
                <li><a href="Index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="Signuptype.html">Signup</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="my_account.html">My Account</a></li>
                <li><a href="../PHP%20file/logout.php" id="logoutLink">Logout</a></li>
            </ul>
        </nav>
    `;
    return headerElement;
}

// Function to load footer
function loadFooter() {
    const footerElement = document.createElement('footer');
    footerElement.innerHTML = `
        <div class="footer-content">
            <div class="footer-logo">
              <img src="/labor-booking-web-application/Images/logo.png" alt="Logo">
            </div>
            <div class="footer-social">
                <a href="..\HTML files/FAQ.html" target="_blank" aria-label="FAQ">
                <img src="..\Images/faq.png" alt="FAQ " class="social-icon">
                </a>
                <a href="https://web.facebook.com/profile.php?id=61568131859342" target="_blank" aria-label="Facebook">
                <img src="..\Images/facebook.png" alt="Facebook Logo" class="social-icon">
                </a>
                <a href="https://www.youtube.com/@labors-in-your-fingers" target="_blank" aria-label="YouTube">
                <img src="..\Images/youtube.png" alt="YouTube Logo" class="social-icon">
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Online Labor Booking System. All Rights Reserved. Do not copy or redistribute any content without permission.</p>
        </div>
    `;
    return footerElement;
}

// Add header and footer to all pages
document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.querySelector('.header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.appendChild(loadHeader());
    }
    const footerPlaceholder = document.querySelector('.footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.appendChild(loadFooter());
    }

    // Add confirmation dialog for logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (confirm('Are you sure you want to logout? This will delete all your data.')) {
                window.location.href = '../PHP%20files/logout.php';
            }
        });
    }

    // Toggle navigation links on small screens
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });

        // Hide navigation links when clicking outside the menu
        document.addEventListener('click', function (event) {
            if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('show');
            }
        });

        // Hide navigation links when scrolling
        window.addEventListener('scroll', function () {
            navLinks.classList.remove('show');
        });

        // Hide navigation links when refreshing the page
        window.addEventListener('load', function () {
            navLinks.classList.remove('show');
        });
    }
});








/*
// Function to load header
function loadHeader() {
    const headerElement = document.createElement('header');
    headerElement.innerHTML = `
        <div class="logo">
            <img src="..\Images/logo.png" alt="Logo">
        </div>
        <nav>
            <ul>
                <li><a href="..\HTML files/Index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="Signuptype.html">Signup</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="..\HTML files/my_account.html">My Account</a></li>
                <li><a href="#" id="logoutLink">Logout</a></li>
            </ul>
        </nav>
    `;
    return headerElement;
}

// Function to load footer
function loadFooter() {
    const footerElement = document.createElement('footer');
    footerElement.innerHTML = `
        <div class="footer-content">
            <div class="footer-logo">
                <img src="..\Images/logo.png" alt="Logo">
            </div>
            <div class="footer-social">
                <a href="FAQ.html">FAQ</a>
                <a href="#">Facebook</a>
                <a href="#">LinkedIn</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Online Labor Booking System. All Rights Reserved. Do not copy or redistribute any content without permission.</p>
        </div>
    `;
    return footerElement;
}

// Add header and footer to all pages
document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.querySelector('.header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.appendChild(loadHeader());
    }

    const footerPlaceholder = document.querySelector('.footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.appendChild(loadFooter());
    }

    // Add confirmation dialog for logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to logout? This will delete all your data.')) {
                window.location.href = '../PHP%20files/logout.php';
            }
        });
    }
});*/

