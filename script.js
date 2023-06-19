'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling
// Selecting button element and section to scroll to element
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Event Listener & Event Handler
btnScrollTo.addEventListener('click', function(e) {

  // Method to get coordinates of element
  // with respect to the browser window
  const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);
  // console.log('Current Scroll (x, y): ', window.pageXOffset, window.pageYOffset);

  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // Smooth Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // New Method for Smooth Scrolling
  section1.scrollIntoView({behavior: 'smooth'});

});

// Page Navigation

// Old Method: Event Listener for Each Element
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });


// Event Delegation
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching Strategy (Only act on link elements)
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});


// Tabbed Component
// Selecting the required elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event Delegation
tabsContainer.addEventListener('click', function(e) {

  // Select ONLY the button element
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if(!clicked) return; // Immediately exits function

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});


// Hover Functionality
// Selecting the parent element
const nav = document.querySelector('.nav');

// Menu Fade Animation
const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    // Select the link
    const link = e.target;

    // Select the sibling elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    // Select the logo
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// Sticky Navigation
// Determine position of first section
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   // Current scroll position
//   console.log(window.scrollY);

//   if(this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   } 

// });


// const obsCallback = function(entires, observer) {
//   entires.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null, // Element target is intersecting (viewport)
//   threshold: [0, 0.2] // Percentage visible in viewport
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
  
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


// Reveal Sections
// Selecting all section elements
const allSections = document.querySelectorAll('.section');

// Callback function for IntersectionObserver()
const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  // Guard Clause
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // Un-Observe Sections
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // Viewport
  threshold: 0.15,
});

// Add observer and hidden class for all sections
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading Images

// ONLY Selecting Images With Lazy Data Source
const imgTargets = document.querySelectorAll('img[data-src]');

// Callback function for IntersectionObserver()
const loadImg = function(entries, observe) {
  const [entry] = entries;

  // Guard Clause
  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Remove blur filter
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  // Stop Observing Images
  imgObserver.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // Viewport
  threshold: 0,
  rootMargin: '200px',
});

// Observe each image
imgTargets.forEach(img => imgObserver.observe(img));


// Slider

const slider = function() {
// Select Elements
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// Variable for current slide
let curSlide = 0;
const maxSlide = slides.length - 1;

// Select Dot Container Element
const dotContainer = document.querySelector('.dots');

// Function to create dots
const createDots = function() {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class ="dots__dot" data-slide="${i}">
    </button>`)
  });
};

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => 
    dot.classList.remove('dots__dot--active'));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');
};


// Function to handle slide change
const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
};

// Initialisation
const init = function() {
  // Setting initial positions for each slide
  // Slide 1 = 0 %, Slide 2 = 100%, Slide 3 = 200%
  goToSlide(0);

  createDots();

  activateDot(0);
};

init();

// Next Slide
const nextSlide = function() {
  if(curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Previous Slide
const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  
  goToSlide(curSlide);
  activateDot(curSlide);
};




// Event Handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Slider Part 2

// Navigate Slide Arrow Keys
document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});


// Navigate Slide Dot Click
dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
}

slider();



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Chapter 186 - 187
/*
// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating & Inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';

message.innerHTML =  'We use cookies for improved functionality and analytics. ' +
'<button class ="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)); // Clones child element


// Deleting Elements

// Old Way:
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//   message.parentElement.removeChild(message);
// });

// New Way:
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // Hidden
console.log(message.style.backgroundColor); // Inline

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');

// Standard Attributes
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-Standard Attribte
console.log(logo.designer); // Undefined
console.log(logo.getAttribute('designer'));

// Standard
logo.alt = 'Beautiful minimalist logo';

// Non-Standard
logo.setAttribute('company', 'Bankist');

// Absolute and Relative URL's
console.log(logo.src);
console.log(logo.getAttribute('src'));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes

logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
*/


// Types of Events

// const h1 = document.querySelector('h1');

// const alertH1 = function(e) {
//   alert('onmouseenter: Great! You are reading the heading :D');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function(e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

/*
// Random colour generator
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColour = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// Button
document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColour();
  console.log('LINK', e.target, e.currentTarget);

  // Stop Propagation
  // e.stopPropagation();
});

// Container (Parent)
document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColour();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// Whole Upper Section (Higher Parent/Root Parent)
document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColour();
  console.log('NAV', e.target, e.currentTarget);
});
*/

// Chapter 193
/*
const h1 = document.querySelector('h1');

// Going Downwards: Child Elements
console.log(h1.querySelectorAll('.highlight')); // Child Element
console.log(h1.childNodes); // All children
console.log(h1.children); // HTMLCollection of DIRECT children

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going Upwards: Parent Elements
console.log(h1.parentElement); // Parent Element
console.log(h1.parentNode); // Direct Parents

// Closest parent (header) element and assigning a CSS variable (custom property)
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Element selecting itself
h1.closest('h1').style.background = 'var(--gradient-primary)';


// Going Sideways: Sibling Elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // Obtain ALL siblings

[...h1.parentElement.children].forEach(function(el) {
  if(el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

// Chapter 202
/*
document.addEventListener('DOMContentLoaded', function(e) {
  console.log('HTML parsed and DOM tree built!: ', e);
});

window.addEventListener('load', function(e) {
  console.log('Page fully loaded: ', e);
});

// Prompts user if they are sure they want to exit
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/

