// list of all Sections 
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

// Build NavBar

function buildNavBar(){
  const fragment = document.createDocumentFragment();
  for(let section of sections){
    const newElem = document.createElement('li');
    newElem.textContent = section.dataset.nav;
    // newElem.setAttribute("data-link",section.id);
    newElem.dataset.nav = section.id;
    newElem.classList.add('menu__link');
    fragment.appendChild(newElem);
  }
  navbar.appendChild(fragment);

}
// Scroll to the required section
function scrollToReqired(){
  let navEle = document.querySelectorAll('li');
  navEle.forEach(item => {
    item.addEventListener("click",function(){
      const el = document.getElementById(item.getAttribute("data-nav"));
      el.scrollIntoView({behavior:"smooth"});
    });
});
}
// Add (your-active-class) class to the currently active section 
function setActiveClass(){
  window.addEventListener('scroll', event => {
    let sectionHieght = 1000000;
    let minVal = 10000000;
    let navEle = document.querySelectorAll('li');
    sections.forEach(section => {
      let bounding = section.getBoundingClientRect();
      if (bounding.top > -500 & bounding.top < minVal)
      {
        minVal = bounding.top;
        // set other sections as inactive
        sections.forEach(item => {
          if (item.id != section.id & item.classList.contains('your-active-class'))
          {
            item.classList.remove('your-active-class')
          }
        });
        // set corresponding header style
        section.classList.add("your-active-class")
        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('active__link');
        // remove from other headers
        for (let item of navEle) 
        {
          if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) 
          {
            item.classList.remove('active__link');
          }
        }
      }
      
    });
  })
}

// Build menu
buildNavBar();

//Scroll to section on click
scrollToReqired();

//Set Sections and corresponding header still
setActiveClass()