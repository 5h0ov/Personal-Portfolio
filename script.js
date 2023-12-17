// ------------about me------------
var tablinks= document.getElementsByClassName("tab-links");
var tabcontents= document.getElementsByClassName("tab-contents");
function opentab(tabname)
{
    for(tablink of tablinks)
    {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents)
    {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ---------sidemenu---------
var sidemenu = document.getElementById("sidemenu");

function openmenu()
{
    sidemenu.style.right = "0";
}
function closemenu()
{
    sidemenu.style.right = "-200px";
}

// Get the button
let mybutton = document.getElementById("myBtn");
    
// When the user scrolls down 1000px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Code for enabling Light-Dark THEME
function toggleTheme() {
  var slider = document.getElementById("themeToggle");
  if (slider.checked) {
    disableDarkTheme();
  } else {
    enableDarkTheme();
  }
}

function enableDarkTheme() {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (
      element.tagName !== 'BODY' &&
      !element.classList.contains('ignore-dark-theme')
    ) {
      element.classList.add('dark-theme');
    }
  }

}


function disableDarkTheme() {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (
      element.tagName !== 'BODY') {
      element.classList.remove('dark-theme');
    }
  }
}