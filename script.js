/* =========================================
   MAJAN COOLING — PREMIUM WEBSITE
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       BASIC HELPERS
    ========================================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       LOADING SCREEN
    ========================================= */

    const loader = document.querySelector(".loader");

if (loader) {
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    });

    // Safety fallback — never let the loader stay forever
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }, 3000);
       }

    /* =========================================
       HEADER / NAVIGATION
    ========================================= */

    const header = $(".site-header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = $(".menu-toggle");
    const mobileMenu = $(".mobile-menu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );
        });


        $$(".mobile-menu a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );
            });

        });
    }


    /* =========================================
       SMOOTH ANCHOR SCROLLING
    ========================================= */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (!targetID || targetID === "#")
                return;

            const target = $(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });
        });

    });


    /* =========================================
       HERO CINEMATIC SCROLL
    ========================================= */

    const hero = $(".hero");
    const heroVisual = $(".hero-ac-wrap");
    const heroCopy = $(".hero-copy");
    const heroLogo = $(".hero-logo");

    function clamp(value, min, max) {
        return Math.max(
            min,
            Math.min(max, value)
        );
    }

    function updateHero() {

        if (!hero || !heroVisual)
            return;

        if (reducedMotion)
            return;

        const rect =
            hero.getBoundingClientRect();

        const scrollDistance =
            Math.max(
                hero.offsetHeight -
                window.innerHeight,
                1
            );

        const progress =
            clamp(
                -rect.top / scrollDistance,
                0,
                1
            );


        /* AC movement */

        const x =
            -4.5 + progress * 12;

        const y =
            -4 + progress * 14;

        const scale =
            0.72 + progress * 0.62;

        const rotation =
            progress * 2;


        heroVisual.style.transform =
            `translate3d(${x}vw, ${y}vh, 0)
             scale(${scale})
             rotate(${rotation}deg)`;


        /* Hero text */

        if (heroCopy) {

            heroCopy.style.opacity =
                clamp(
                    1 - progress * 1.4,
                    0,
                    1
                );

            heroCopy.style.transform =
                `translate3d(
                    0,
                    ${-progress * 70}px,
                    0
                )`;
        }


        /* Logo fade */

        if (heroLogo) {

            heroLogo.style.opacity =
                clamp(
                    1 - progress * 2,
                    0,
                    1
                );
        }
    }


    window.addEventListener(
        "scroll",
        updateHero,
        { passive: true }
    );

    updateHero();


    /* =========================================
       INTERSECTION REVEALS
    ========================================= */

    const revealElements =
        $$(".reveal, .reveal-up, .reveal-left, .reveal-right");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element =>
            revealObserver.observe(element)
        );

    } else {

        revealElements.forEach(element =>
            element.classList.add("visible")
        );
    }


    /* =========================================
       NUMBER COUNTERS
    ========================================= */

    const counters =
        $$("[data-count]");

    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        const element =
                            entry.target;

                        const target =
                            Number(
                                element.dataset.count
                            );

                        const suffix =
                            element.dataset.suffix || "+";


                        if (reducedMotion) {

                            element.textContent =
                                target + suffix;

                            counterObserver.unobserve(
                                element
                            );

                            return;
                        }


                        const duration = 1300;

                        const start =
                            performance.now();


                        function animate(time) {

                            const progress =
                                Math.min(
                                    (time - start) /
                                    duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            element.textContent =
                                Math.floor(
                                    target * eased
                                ) + suffix;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                element.textContent =
                                    target + suffix;
                            }
                        }


                        requestAnimationFrame(
                            animate
                        );

                        counterObserver.unobserve(
                            element
                        );
                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter =>
            counterObserver.observe(counter)
        );

    }


    /* =========================================
       TIMELINE
    ========================================= */

    const timeline =
        $(".timeline");

    const timelineItems =
        $$(".timeline-item");

    const timelineProgress =
        $(".timeline-progress span");


    function updateTimeline() {

        if (!timeline)
            return;

        const rect =
            timeline.getBoundingClientRect();

        const available =
            Math.max(
                timeline.offsetHeight -
                window.innerHeight,
                1
            );

        const progress =
            clamp(
                (window.innerHeight * 0.65 -
                    rect.top) /
                available,
                0,
                1
            );


        if (timelineProgress) {

            timelineProgress.style.height =
                `${progress * 100}%`;
        }


        timelineItems.forEach(
            (item, index) => {

                const threshold =
                    index /
                    Math.max(
                        timelineItems.length - 1,
                        1
                    );

                item.classList.toggle(
                    "active",
                    progress >= threshold
                );
            }
        );
    }


    window.addEventListener(
        "scroll",
        updateTimeline,
        { passive: true }
    );

    updateTimeline();


    /* =========================================
       PINNED SERVICES
    ========================================= */

    const pinnedSection =
        $(".pinned-services");

    const pinnedVisual =
        $(".pin-ac");

    const pinnedNumber =
        $(".pin-number");

    const pinnedTitle =
        $(".pin-copy h2");

    const pinnedDescription =
        $(".pin-copy p");

    const pinnedDots =
        $(".pin-dots");


    const serviceData = [

        {
            number: "01",
            title: "INSTALLATION",
            description:
                "Professional installation with suitable sizing, placement and careful workmanship."
        },

        {
            number: "02",
            title: "MAINTENANCE",
            description:
                "Regular maintenance designed to help keep AC systems operating efficiently and extend service life."
        },

        {
            number: "03",
            title: "REPAIR",
            description:
                "Fast and reliable repair services for AC systems from major brands."
        },

        {
            number: "04",
            title: "PC BOARD REPAIR",
            description:
                "Specialized repair and replacement of AC control boards and electronic components."
        },

        {
            number: "05",
            title: "MOTOR WINDING",
            description:
                "Professional motor repair and rewinding services for suitable AC motors."
        },

        {
            number: "06",
            title: "AMC CONTRACTS",
            description:
                "Yearly renewable Annual Maintenance Contracts designed to make ongoing AC maintenance easier."
        }

    ];


    if (
        pinnedSection &&
        pinnedNumber &&
        pinnedTitle &&
        pinnedDescription
    ) {

        if (pinnedDots) {

            pinnedDots.innerHTML =
                serviceData.map(
                    (_, index) =>
                        `<span class="${
                            index === 0
                                ? "active"
                                : ""
                        }"></span>`
                ).join("");
        }


        const dots =
            pinnedDots
                ? $$("span", pinnedDots)
                : [];


        function updatePinnedServices() {

            if (reducedMotion)
                return;

            const rect =
                pinnedSection.getBoundingClientRect();

            const distance =
                Math.max(
                    pinnedSection.offsetHeight -
                    window.innerHeight,
                    1
                );

            const progress =
                clamp(
                    -rect.top / distance,
                    0,
                    1
                );


            const index =
                Math.min(
                    serviceData.length - 1,
                    Math.floor(
                        progress *
                        serviceData.length
                    )
                );


            const service =
                serviceData[index];


            pinnedNumber.textContent =
                service.number;

            pinnedTitle.textContent =
                service.title;

            pinnedDescription.textContent =
                service.description;


            dots.forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === index
                    );
                }
            );


            if (pinnedVisual) {

                const movement =
                    Math.sin(progress * 8) * 28;

                const vertical =
                    Math.cos(progress * 6) * 16;

                const scale =
                    0.8 +
                    progress * 0.3;

                const rotation =
                    Math.sin(progress * 5) * 1.2;


                pinnedVisual.style.transform =
                    `translate(-50%, -50%)
                     translate3d(
                        ${movement}px,
                        ${vertical}px,
                        0
                     )
                     scale(${scale})
                     rotate(${rotation}deg)`;
            }
        }


        window.addEventListener(
            "scroll",
            updatePinnedServices,
            { passive: true }
        );

        updatePinnedServices();
    }


    /* =========================================
       SERVICE CARD HOVER
    ========================================= */

    $$(".service-card").forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (window.innerWidth < 800)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 4;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";
            }
        );

    });


    /* =========================================
       RESIDENTIAL / COMMERCIAL PANELS
    ========================================= */

    const splitPanels =
        $$(".split-panel");


    if ("IntersectionObserver" in window) {

        const splitObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "in-view"
                        );

                        splitObserver.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.15
                }
            );


        splitPanels.forEach(
            panel =>
                splitObserver.observe(panel)
        );
    }


    /* =========================================
       GALLERY FILTER
    ========================================= */

    const filterButtons =
        $$(".gallery-filter button");

    const galleryItems =
        $$(".gallery-item");


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter ||
                    button.textContent
                        .trim()
                        .toLowerCase();


                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );


                galleryItems.forEach(item => {

                    const category =
                        item.dataset.category ||
                        "all";


                    const show =
                        filter === "all" ||
                        category === filter;


                    item.classList.toggle(
                        "hidden",
                        !show
                    );
                });

            }
        );

    });


    /* =========================================
       FAQ ACCORDION
    ========================================= */

    const faqItems =
        $$(".faq-item");


    faqItems.forEach(item => {

        const question =
            $(".faq-question", item);

        const answer =
            $(".faq-answer", item);


        if (!question || !answer)
            return;


        question.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                /* Close all */

                faqItems.forEach(other => {

                    other.classList.remove(
                        "open"
                    );

                    const otherQuestion =
                        $(".faq-question", other);

                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });


                /* Open selected */

                if (!isOpen) {

                    item.classList.add(
                     
