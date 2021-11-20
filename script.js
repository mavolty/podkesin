class App {
  constructor() {
    this.navbar = document.querySelector('.nav');
    this.heroSection = document.querySelector('.hero');
    this.pricingSection = document.querySelector('.footer');
    this.mobileMenu = document.querySelector('.nav__menu');
    this.desktopMenu = document.querySelector('.nav__list');
    this.videoButton = document.querySelector('.button--hero-video');
    this.backdrop = document.querySelector('.backdrop');
    this.closeBackdrop = document.querySelector('.close--backdrop');
    this.accordionContainer = document.querySelector('.feature__accordions');
    this.accordionParagraph = document.querySelectorAll('.feature__paragraph');
    this.accordionArrow = document.querySelectorAll('.feature__arrow');

    this.init();
  }

  init() {
    this.addStickyNav();
    this.addVideo();
    this.addHamburgerMenu();
    this.addScrollToSection();
    this.addAccordion();
  }

  addStickyNav() {
    const stickyNav = entries => {
      if (!entries[0].isIntersecting) {
        this.navbar.classList.add('nav--sticky');
      } else {
        this.navbar.classList.remove('nav--sticky');
      }
    };

    const navHeight = this.navbar.getBoundingClientRect().height;

    const navObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });

    navObserver.observe(this.heroSection);
  }

  addVideo() {
    this.videoButton.addEventListener('click', () => {
      this.backdropHandler('add');
    });

    this.backdrop.addEventListener('click', () => {
      this.backdropHandler('remove');
    });

    this.closeBackdrop.addEventListener('click', () => {
      this.backdropHandler('remove');
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.backdropHandler('remove');
      }
    });
  }

  backdropHandler(handle) {
    const video = document.querySelector('.hero__video');
    console.log(this.closeBackdrop);

    if (handle === 'add') {
      video.classList.add('hero__video--active');
      this.backdrop.classList.add('backdrop--active');
      this.closeBackdrop.classList.add('close--active');
    }

    if (handle === 'remove') {
      video.classList.remove('hero__video--active');
      this.backdrop.classList.remove('backdrop--active');
      this.closeBackdrop.classList.remove('close--active');
    }
  }

  addHamburgerMenu() {
    this.mobileMenu.addEventListener('click', event => {
      const closeButton = document.querySelector('.close--nav');
      const hamburgerButton = document.querySelector('.hamburger');

      event.currentTarget.classList.toggle('nav__menu--active');
      hamburgerButton.classList.toggle('hamburger--active');
      closeButton.classList.toggle('close--active');
    });
  }

  addScrollToSection() {
    this.desktopMenu.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      const targetId = target.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  addAccordion() {
    this.accordionContainer.addEventListener('click', event => {
      const clickedAccordion = event.target.closest('.feature__accordion');
      const clickedArrow = clickedAccordion.querySelector('.feature__arrow');

      if (!clickedAccordion || !clickedArrow) return;

      this.removeActiveAccordion(this.accordionArrow, 'feature__arrow');
      this.removeActiveAccordion(this.accordionParagraph, 'feature__paragraph');

      clickedArrow.classList.add('feature__arrow--active');
      document
        .querySelector(
          `.feature__paragraph--${clickedAccordion.dataset.accordion}`
        )
        .classList.add('feature__paragraph--active');
    });
  }

  removeActiveAccordion(elements, className) {
    elements.forEach(element =>
      element.classList.remove(`${className}--active`)
    );
  }
}

new App();
