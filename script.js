/* =========================================================
   MAJAN COOLING
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const contactForm = document.getElementById("contactForm");
    const yearElement = document.getElementById("year");


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            document.body.classList.toggle("menu-open");

            const icon =
                menuToggle.querySelector("i");

            if (!icon) return;

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close menu when a navigation link is clicked */

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        if (
            Number.isNaN(target) ||
            target <= 0
        ) {
            return;
        }


        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /* Smooth ease-out */

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    eased * target
                );


            counter.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navAnchors =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navAnchors.forEach((link) => {

                            link.classList.remove(
                                "current"
                            );


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "current"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.25,

                rootMargin:
                    "-80px 0px -50% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,

                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );


                const phone =
                    document.getElementById(
                        "phone"
                    );


                const email =
                    document.getElementById(
                        "email"
                    );


                const service =
                    document.getElementById(
                        "service"
                    );


                const message =
                    document.getElementById(
                        "message"
                    );


                if (!name || !phone) {
                    return;
                }


                const nameValue =
                    name.value.trim();


                const phoneValue =
                    phone.value.trim();


                const emailValue =
                    email
                        ? email.value.trim()
                        : "";


                const serviceValue =
                    service
                        ? service.value
                        : "";


                const messageValue =
                    message
                        ? message.value.trim()
                        : "";


                if (
                    nameValue === "" ||
                    phoneValue === ""
                ) {

                    showMessage(
                        "Please enter your name and phone number."
                    );

                    return;

                }


                /*
                 * This currently shows a success message.
                 *
                 * Later you can connect this form
                 * to WhatsApp, Formspree, EmailJS,
                 * Supabase, or your own backend.
                 */


                console.log(
                    "Contact Form:",
                    {
                        name:
                            nameValue,

                        phone:
                            phoneValue,

                        email:
                            emailValue,

                        service:
                            serviceValue,

                        message:
                            messageValue
                    }
                );


                showMessage(
                    "Thank you! Your message has been received."
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showMessage(message) {

        const oldMessage =
            document.querySelector(
                ".form-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "form-message";


        messageElement.textContent =
            message;


        messageElement.style.marginTop =
            "15px";


        messageElement.style.padding =
            "12px 15px";


        messageElement.style.borderRadius =
            "10px";


        messageElement.style.fontSize =
            "0.82rem";


        messageElement.style.fontWeight =
            "600";


        messageElement.style.textAlign =
            "center";


        messageElement.style.background =
            "#e9f8fa";


        messageElement.style.color =
            "#087f8c";


        if (contactForm) {

            contactForm.appendChild(
                messageElement
            );

        }


        setTimeout(() => {

            if (messageElement) {

                messageElement.style.opacity =
                    "0";

                messageElement.style.transition =
                    "opacity 0.4s ease";


                setTimeout(() => {

                    messageElement.remove();

                }, 400);

            }

        }, 4000);

    }


    /* =====================================================
       PARALLAX EFFECT FOR HERO VISUAL
       ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(min-width: 851px)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - 0.5;


                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - 0.5;


                heroVisual.style.transform =
                    `translate(${x * 10}px, ${y * 10}px)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       SERVICE CARD TILT
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    if (
        window.matchMedia(
            "(min-width: 851px)"
        ).matches
    ) {

        serviceCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (
                            y - centerY
                        ) / 25;


                    const rotateY =
                        (
                            centerX - x
                        ) / 25;


                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-10px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       UPDATE FOOTER YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                /*
                 * Prevent broken images from
                 * looking messy.
                 */

                image.style.display =
                    "none";

            }
        );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
