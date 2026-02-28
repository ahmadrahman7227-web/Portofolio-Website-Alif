/*=============== HOME SPLIT TEXT ===============*/
const { animate, text, stagger } = anime

const { chars: chars1 } = text.split('.home__profession-1', { chars: true })
const { chars: chars2 } = text.split('.home__profession-2', { chars: true })

animate([...chars1, ...chars2], {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});


// animate(chars2, {
//   y: [
//     { to: ['100%', '0%'] },
//     { to: '-100%', delay: 4000, ease: 'in(3)' }
//   ],
//   duration: 900,
//   ease: 'out(3)',
//   delay: stagger(80),
//   loop: true,
// })



/*===============SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
})

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target;
    const targetContent = document.querySelector(targetSelector);

    // 1. Remove 'work-active' from all content areas
    tabContents.forEach((content) => {
      content.classList.remove('work-active'); // Fixed typo: classList
    });

    // 2. Remove 'work-active' from all tab buttons
    tabs.forEach((t) => {
      t.classList.remove('work-active');
    });

    // 3. Activate the clicked tab and its corresponding content
    tab.classList.add('work-active');
    if (targetContent) {
      targetContent.classList.add('work-active');
    }
  });
});

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button');
const servicesCards = document.querySelectorAll('.services__card'); // Defined globally for use in the listener

servicesButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentCard = button.parentElement; // Use parentElement for cleaner DOM navigation
    const currentInfo = currentCard.querySelector('.services__info');
    const isCardOpen = currentCard.classList.contains('services-open');

    // 1. Close all other services info
    servicesCards.forEach(card => {
      card.classList.remove('services-open');
      card.classList.add('services-close');
      
      const info = card.querySelector('.services__info');
      if (info) info.style.height = '0';
    });

    // 2. Open the clicked card only if it wasn't already open
    if (!isCardOpen) {
      currentCard.classList.replace('services-close', 'services-open');
      // Set height to scrollHeight to allow for CSS transitions
      currentInfo.style.height = currentInfo.scrollHeight + 'px';
    }
  });
});



/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
// Duplicate images to make the animation work
const tracks = document.querySelectorAll('.testimonials__content')

tracks.forEach(track => {
  const cards = [...track.children] // spread to make a static copy

  // Duplicate cards only once
  for (const card of cards) {
    track.appendChild(card.cloneNode(true))
  }
})



/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
    // Use the clipboard API to copy text
    navigator.clipboard.writeText(copyEmail).then(() => {
        copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

        // Restore the original text
        setTimeout(() => {
            copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
        }, 2000) // Mengembalikan teks setelah 3 detik
    })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

// Each year it is updated to the current year
textYear.textContent = currentYear
                          
                         
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if(!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)


/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0

const cursorMove = () => {
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = 'translate(-50%, -50%)'

    requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})
cursorMove()


/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hide-cursor')
    })
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hide-cursor')
    })
})


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    reset: true, //nimation repeat
})

sr.reveal(`.home__image, .projects__container, .work__container, .testimonials__container, .contact__container`)
sr.reveal(`.home__data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin: 'bottom'})
sr.reveal(`.home__social, .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})