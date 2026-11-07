/* =====================================================
   DEVACADEMY PRO
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =================================================
       VARIABLES
    ================================================= */

    const body = document.body;

    const header = document.getElementById("header");

    const navbar = document.getElementById("navbar");

    const menuButton = document.getElementById("menuButton");

    const backToTop = document.getElementById("backToTop");

    const currentYear = document.getElementById("currentYear");


    /* =================================================
       ANNÉE AUTOMATIQUE
    ================================================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =================================================
       MENU MOBILE
    ================================================= */

    if (menuButton && navbar) {

        menuButton.addEventListener("click", function () {

            navbar.classList.toggle("active");

        });


        const navLinks = navbar.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

            });

        });

    }


    /* =================================================
       HEADER AU SCROLL
    ================================================= */

    window.addEventListener("scroll", function () {

        if (header) {

            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }


        if (backToTop) {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        }

    });


    /* =================================================
       RETOUR EN HAUT
    ================================================= */

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================================
       TOAST
    ================================================= */

    const toast = document.getElementById("toast");

    const toastTitle = document.getElementById("toastTitle");

    const toastMessage = document.getElementById("toastMessage");

    const closeToast = document.getElementById("closeToast");

    let toastTimer;


    function showToast(title, message) {

        if (!toast) {
            return;
        }

        if (toastTitle) {
            toastTitle.textContent = title;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 4000);

    }


    if (closeToast) {

        closeToast.addEventListener("click", function () {

            toast.classList.remove("show");

        });

    }


    /* =================================================
       MODALES
    ================================================= */

    function openModal(id) {

        const modal = document.getElementById(id);

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        body.style.overflow = "hidden";

    }


    function closeModal(id) {

        const modal = document.getElementById(id);

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        body.style.overflow = "";

    }


    function closeAllModals() {

        const modals = document.querySelectorAll(".modal");

        modals.forEach(function (modal) {

            modal.classList.remove("active");

        });

        body.style.overflow = "";

    }


    /* =================================================
       BOUTONS CONNEXION / INSCRIPTION
    ================================================= */

    const loginBtn = document.getElementById("loginBtn");

    const mobileLogin = document.getElementById("mobileLogin");

    const registerBtn = document.getElementById("registerBtn");

    const mobileRegister = document.getElementById("mobileRegister");

    const ctaRegister = document.getElementById("ctaRegister");


    if (loginBtn) {

        loginBtn.addEventListener("click", function () {

            openModal("loginModal");

        });

    }


    if (mobileLogin) {

        mobileLogin.addEventListener("click", function () {

            navbar.classList.remove("active");

            openModal("loginModal");

        });

    }


    if (registerBtn) {

        registerBtn.addEventListener("click", function () {

            openModal("registerModal");

        });

    }


    if (mobileRegister) {

        mobileRegister.addEventListener("click", function () {

            navbar.classList.remove("active");

            openModal("registerModal");

        });

    }


    if (ctaRegister) {

        ctaRegister.addEventListener("click", function () {

            openModal("registerModal");

        });

    }


    /* =================================================
       FERMETURE MODALES
    ================================================= */

    const closeButtons = document.querySelectorAll("[data-close]");

    closeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modalId = button.getAttribute("data-close");

            closeModal(modalId);

        });

    });


    const modalOverlays =
        document.querySelectorAll(".modal-overlay");

    modalOverlays.forEach(function (overlay) {

        overlay.addEventListener("click", function () {

            closeAllModals();

        });

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeAllModals();

        }

    });


    /* =================================================
       SWITCH LOGIN / REGISTER
    ================================================= */

    const switchToRegister =
        document.getElementById("switchToRegister");

    const switchToLogin =
        document.getElementById("switchToLogin");


    if (switchToRegister) {

        switchToRegister.addEventListener("click", function () {

            closeModal("loginModal");

            openModal("registerModal");

        });

    }


    if (switchToLogin) {

        switchToLogin.addEventListener("click", function () {

            closeModal("registerModal");

            openModal("loginModal");

        });

    }


    /* =================================================
       INSCRIPTION
    ================================================= */

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("registerName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value;

            const level =
                document.getElementById("registerLevel").value;


            if (name.length < 2) {

                showToast(
                    "Erreur",
                    "Veuillez entrer un nom valide."
                );

                return;

            }


            if (!email.includes("@")) {

                showToast(
                    "Erreur",
                    "Veuillez entrer une adresse email valide."
                );

                return;

            }


            if (password.length < 6) {

                showToast(
                    "Erreur",
                    "Le mot de passe doit contenir au moins 6 caractères."
                );

                return;

            }


            if (!level) {

                showToast(
                    "Erreur",
                    "Veuillez sélectionner votre niveau."
                );

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password,

                level: level,

                registeredAt: new Date().toISOString()

            };


            localStorage.setItem(
                "devacademyUser",
                JSON.stringify(user)
            );


            closeModal("registerModal");

            registerForm.reset();


            showToast(
                "Compte créé",
                "Bienvenue sur DEVACADEMY, " + name + "."
            );

        });

    }


    /* =================================================
       CONNEXION
    ================================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;


            const savedUser =
                localStorage.getItem("devacademyUser");


            if (!savedUser) {

                showToast(
                    "Compte introuvable",
                    "Crée d'abord un compte DEVACADEMY."
                );

                return;

            }


            const user =
                JSON.parse(savedUser);


            if (
                email === user.email &&
                password === user.password
            ) {

                closeModal("loginModal");

                loginForm.reset();


                showToast(
                    "Connexion réussie",
                    "Bienvenue " + user.name + "."
                );

            } else {

                showToast(
                    "Connexion refusée",
                    "Email ou mot de passe incorrect."
                );

            }

        });

    }


    /* =================================================
       HERO BUTTONS
    ================================================= */

    const startLearning =
        document.getElementById("startLearning");

    const discoverCourses =
        document.getElementById("discoverCourses");

    const allCoursesBtn =
        document.getElementById("allCoursesBtn");


    function scrollToSection(id) {

        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        section.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (startLearning) {

        startLearning.addEventListener("click", function () {

            const savedUser =
                localStorage.getItem("devacademyUser");


            if (!savedUser) {

                openModal("registerModal");

            } else {

                scrollToSection("progression");

            }

        });

    }


    if (discoverCourses) {

        discoverCourses.addEventListener("click", function () {

            scrollToSection("cours");

        });

    }


    if (allCoursesBtn) {

        allCoursesBtn.addEventListener("click", function () {

            const filterButtons =
                document.querySelectorAll(".filter-btn");

            filterButtons.forEach(function (button) {

                button.classList.remove("active");

            });


            const allButton =
                document.querySelector(
                    '.filter-btn[data-filter="all"]'
                );


            if (allButton) {
                allButton.classList.add("active");
            }


            const courseCards =
                document.querySelectorAll(".course-card");


            courseCards.forEach(function (card) {

                card.classList.remove("hidden");

            });


            const noResults =
                document.getElementById("noResults");


            if (noResults) {
                noResults.classList.remove("show");
            }


            scrollToSection("cours");

        });

    }


    /* =================================================
       RECHERCHE DES COURS
    ================================================= */

    const searchInput =
        document.getElementById("courseSearch");

    const courseCards =
        document.querySelectorAll(".course-card");

    const noResults =
        document.getElementById("noResults");


    function filterCourses() {

        if (!searchInput) {
            return;
        }


        const search =
            searchInput.value.toLowerCase().trim();


        const activeFilter =
            document.querySelector(
                ".filter-btn.active"
            );


        const filter =
            activeFilter
                ? activeFilter.dataset.filter
                : "all";


        let visibleCount = 0;


        courseCards.forEach(function (card) {

            const title =
                card.dataset.title.toLowerCase();

            const category =
                card.dataset.category;


            const matchesSearch =
                title.includes(search);


            const matchesFilter =
                filter === "all" ||
                category === filter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.classList.remove("hidden");

                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (noResults) {

            if (visibleCount === 0) {
                noResults.classList.add("show");
            } else {
                noResults.classList.remove("show");
            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCourses
        );

    }


    /* =================================================
       FILTRES
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");

            filterCourses();

        });

    });


    /* =================================================
       COURSE MODAL
    ================================================= */

    const courseButtons =
        document.querySelectorAll(".course-btn");

    const courseModalTitle =
        document.getElementById("courseModalTitle");

    const courseModalDescription =
        document.getElementById("courseModalDescription");

    const courseLessons =
        document.getElementById("courseLessons");

    const modalStartCourse =
        document.getElementById("modalStartCourse");


    const courseData = {

        "HTML5": {

            description:
                "Apprends les bases du HTML5 et construis la structure de tes pages web.",

            lessons: 12

        },

        "CSS3": {

            description:
                "Apprends à créer des interfaces modernes, responsives et professionnelles avec CSS.",

            lessons: 15

        },

        "JavaScript": {

            description:
                "Apprends JavaScript, le DOM, les événements, les formulaires et la logique interactive.",

            lessons: 24

        },

        "Python": {

            description:
                "Découvre Python et apprends les variables, conditions, boucles, fonctions et objets.",

            lessons: 20

        },

        "Java": {

            description:
                "Découvre Java et les principes de la programmation orientée objet.",

            lessons: 22

        },

        "SQL": {

            description:
                "Apprends à manipuler les bases de données avec SQL.",

            lessons: 18

        }

    };


    let selectedCourse = "";


    courseButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCourse =
                button.dataset.course;


            const data =
                courseData[selectedCourse];


            if (!data) {
                return;
            }


            if (courseModalTitle) {

                courseModalTitle.textContent =
                    selectedCourse;

            }


            if (courseModalDescription) {

                courseModalDescription.textContent =
                    data.description;

            }


            if (courseLessons) {

                courseLessons.textContent =
                    data.lessons;

            }


            openModal("courseModal");

        });

    });


    if (modalStartCourse) {

        modalStartCourse.addEventListener(
            "click",
            function () {

                closeModal("courseModal");

                scrollToSection("progression");


                showToast(
                    "Formation sélectionnée",
                    "Tu peux commencer " +
                    selectedCourse +
                    "."
                );

            }
        );

    }


    /* =================================================
       STATISTIQUES ANIMÉES
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) {
            return;
        }


        countersStarted = true;


        counters.forEach(function (counter) {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 70)
                );


            const timer =
                setInterval(function () {

                    current += increment;


                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }


                    counter.textContent =
                        current.toLocaleString("fr-FR");

                }, 25);

        });

    }


    const statsSection =
        document.querySelector(".stats-section");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            animateCounters();

                            statsObserver.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        statsObserver.observe(statsSection);

    }


    /* =================================================
       FAQ
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");


        if (!question) {
            return;
        }


        question.addEventListener("click", function () {

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("open");

                }

            });


            item.classList.toggle("open");

        });

    });


    /* =================================================
       FEATURES
    ================================================= */

    const featureButtons =
        document.querySelectorAll(".feature-btn");


    featureButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const message =
                button.dataset.message ||
                "Information disponible.";


            showToast(
                "DEVACADEMY",
                message
            );

        });

    });


    /* =================================================
       QUIZ
    ================================================= */

    const startQuiz =
        document.getElementById("startQuiz");

    const quizModal =
        document.getElementById("quizModal");

    const quizQuestion =
        document.getElementById("quizQuestion");

    const quizOptions =
        document.getElementById("quizOptions");

    const quizQuestionNumber =
        document.getElementById("quizQuestionNumber");

    const quizProgress =
        document.getElementById("quizProgress");

    const quizResult =
        document.getElementById("quizResult");

    const quizContent =
        document.getElementById("quizContent");

    const quizScore =
        document.getElementById("quizScore");

    const quizResultText =
        document.getElementById("quizResultText");

    const restartQuiz =
        document.getElementById("restartQuiz");


    const quizQuestions = [

        {

            question:
                "Que signifie HTML ?",

            options: [

                "HyperText Markup Language",

                "HighText Machine Language",

                "HyperTool Modern Language",

                "HomeText Markup Language"

            ],

            answer: 0

        },


        {

            question:
                "Quel langage permet principalement de styliser une page web ?",

            options: [

                "HTML",

                "CSS",

                "SQL",

                "Java"

            ],

            answer: 1

        },


        {

            question:
                "Quelle méthode permet de sélectionner un élément avec son ID en JavaScript ?",

            options: [

                "getElementById()",

                "selectById()",

                "findElement()",

                "getId()"

            ],

            answer: 0

        },


        {

            question:
                "Quelle instruction permet de déclarer une variable en JavaScript ?",

            options: [

                "variable",

                "let",

                "define",

                "create"

            ],

            answer: 1

        },


        {

            question:
                "Quel symbole est utilisé pour écrire un commentaire sur une seule ligne en JavaScript ?",

            options: [

                "##",

                "<!-- -->",

                "//",

                "**"

            ],

            answer: 2

        }

    ];


    let currentQuestion = 0;

    let score = 0;


    function startQuizGame() {

        currentQuestion = 0;

        score = 0;


        if (quizContent) {
            quizContent.style.display = "block";
        }


        if (quizResult) {
            quizResult.classList.remove("active");
        }


        showQuizQuestion();

        openModal("quizModal");

    }


    function showQuizQuestion() {

        const question =
            quizQuestions[currentQuestion];


        if (!question) {
            finishQuiz();

            return;
        }


        if (quizQuestion) {

            quizQuestion.textContent =
                question.question;

        }


        if (quizQuestionNumber) {

            quizQuestionNumber.textContent =
                "Question " +
                (currentQuestion + 1) +
                " / " +
                quizQuestions.length;

        }


        if (quizProgress) {

            const percentage =
                ((currentQuestion + 1) /
                quizQuestions.length) *
                100;


            quizProgress.style.width =
                percentage + "%";

        }


        if (quizOptions) {

            quizOptions.innerHTML = "";


            question.options.forEach(
                function (option, index) {

                    const button =
                        document.createElement("button");


                    button.type = "button";

                    button.className =
                        "quiz-option";

                    button.textContent =
                        option;


                    button.addEventListener(
                        "click",
                        function () {

                            answerQuiz(index);

                        }
                    );


                    quizOptions.appendChild(button);

                }
            );

        }

    }


    function answerQuiz(selectedAnswer) {

        const question =
            quizQuestions[currentQuestion];


        if (
            selectedAnswer ===
            question.answer
        ) {

            score++;

        }


        currentQuestion++;


        setTimeout(function () {

            showQuizQuestion();

        }, 150);

    }


    function finishQuiz() {

        if (quizContent) {

            quizContent.style.display =
                "none";

        }


        if (quizResult) {

            quizResult.classList.add("active");

        }


        if (quizScore) {

            quizScore.textContent =
                score;

        }


        if (quizResultText) {

            if (score === 5) {

                quizResultText.textContent =
                    "Excellent. Tu maîtrises très bien ces notions.";

            } else if (score >= 3) {

                quizResultText.textContent =
                    "Bon travail. Continue à pratiquer pour progresser.";

            } else {

                quizResultText.textContent =
                    "Continue à apprendre et refais le quiz pour améliorer ton score.";

            }

        }

    }


    if (startQuiz) {

        startQuiz.addEventListener(
            "click",
            startQuizGame
        );

    }


    if (restartQuiz) {

        restartQuiz.addEventListener(
            "click",
            function () {

                startQuizGame();

            }
        );

    }


    /* =================================================
       CONTACT
    ================================================= */

    const contactBtn =
        document.getElementById("contactBtn");

    const contactForm =
        document.getElementById("contactForm");


    if (contactBtn) {

        contactBtn.addEventListener(
            "click",
            function () {

                openModal("contactModal");

            }
        );

    }


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "contactMessage"
                    ).value.trim();


                if (name.length < 2) {

                    showToast(
                        "Erreur",
                        "Veuillez entrer votre nom."
                    );

                    return;

                }


                if (message.length < 5) {

                    showToast(
                        "Erreur",
                        "Votre message est trop court."
                    );

                    return;

                }


                contactForm.reset();

                closeModal("contactModal");


                showToast(
                    "Message envoyé",
                    "Merci pour votre message."
                );

            }
        );

    }


    /* =================================================
       NAVIGATION ACTIVE
    ================================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveLink() {

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach(function (section) {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            const id =
                section.getAttribute("id");


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                navigationLinks.forEach(
                    function (link) {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href") ===
                            "#" + id
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".course-card, .feature-card, .testimonial-card, .dashboard-card"
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


    /* =================================================
       FERMER MENU SI CLIC EXTERNE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                navbar &&
                menuButton &&
                navbar.classList.contains("active")
            ) {

                const clickedInsideNavbar =
                    navbar.contains(event.target);

                const clickedMenu =
                    menuButton.contains(event.target);


                if (
                    !clickedInsideNavbar &&
                    !clickedMenu
                ) {

                    navbar.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* =================================================
       MESSAGE DE DÉMARRAGE
    ================================================= */

    console.log(
        "DEVACADEMY chargé correctement."
    );

});