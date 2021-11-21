/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sectionList = document.querySelectorAll('section');

const navbarList = document.querySelector('#navbar__list');

const topBtnList = document.querySelectorAll('.top_btn');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* fuction to check if the given section is in the viewport */
let checkViewport = sec => {
    const rect = sec.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* show go to the top button if parent section is in the viewport */
let showButton = buttonList => {
    for (const button of buttonList) {
        checkViewport(button.parentElement) ? button.style.display = 'block' : button.style.display = 'none';
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

/* function to build list items with given section list and navigation list */
let buildListItems = (secList, navList) => {
    for (const sec of  secList) {
        const newElement = 
        `<li data-link=${sec.getAttribute('id')} class= "menu__link">
              <a href= "#${sec.getAttribute('id')}">${sec.getAttribute('data-nav')}</a>
        </li>`;
        navList.insertAdjacentHTML('beforeend', newElement);
    }
}

// Add class 'active' to section when near top of viewport
let setActiveSection = secList => {
    for (const sec of secList) {
        if (checkViewport(sec)) {
            sec.classList.toggle('active', true);
            document.querySelector(`[data-link="${sec.getAttribute('id')}"]`).classList.toggle('active', true);       
        }
        else {
            sec.classList.toggle('active', false);
            document.querySelector(`[data-link="${sec.getAttribute('id')}"]`).classList.toggle('active', false);        
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.onload = () => buildListItems(sectionList, navbarList);


// Scroll to section on link click
navbarList.addEventListener('click', event => {
    event.preventDefault();
    const clickedSection = event.target.hasAttribute('data-link')
    ? event.target
    : event.target.parentElement;
    const sectionToScroll = document.querySelector(`#${clickedSection.getAttribute('data-link')}`);
    sectionToScroll.scrollIntoView({block: 'center', behavior: 'smooth'});
});

/* Go To The Top of the page on Button Click */
for (const button of topBtnList) {
    button.addEventListener('click', () => 
    window.scrollTo({top: 0, behavior: 'smooth'})
    );
}

// Set sections as active and show go to top button on scroll
window.onscroll = () => {
    setActiveSection(sectionList);
    showButton(topBtnList);
};



