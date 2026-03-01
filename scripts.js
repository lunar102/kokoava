/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// burgerihaku
document.getElementById('fetchBurgers').onclick = async function(event) {
    event.preventDefault();

    const maxId = 416; // max number of burgers of the day per bobsburgersapi.com
    const burgerIds = [];
    while (burgerIds.length < 3) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        if (!burgerIds.includes(randomId)) {
            burgerIds.push(randomId);
        }
    }

    const burgersList = document.getElementById('burgers-list');
    burgersList.innerHTML = ''; // clear prev

    try {
        const uniqueBurgers = new Set();

        for (const id of burgerIds) {
            const response = await fetch(`https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${id}`);
            if (!response.ok) {
                console.warn(`Failed to fetch burger with ID ${id}, trying another ID...`);
                continue; // skip to next id if the current one fails
            }
            const burger = await response.json();

            if (!uniqueBurgers.has(burger.name)) {
                uniqueBurgers.add(burger.name);

                const burgerElement = document.createElement('div');
                burgerElement.className = 'burger';
                burgerElement.innerHTML = `
                    <h3>${burger.name}</h3>
                    <p><strong>Price:</strong> $${burger.price.split('$')[1]}</p>
                `;
                burgersList.appendChild(burgerElement);
            }
        }
    } catch (error) {
        console.error('Error fetching burgers:', error);
        burgersList.innerHTML = '<p>Failed to load burgers.</p>';
    }
};

//burger-hahmohaku
document.getElementById('fetchCharacters').onclick = async function(event) {
    event.preventDefault();

    const maxId = 598;
    const characterIds = [];
    while (characterIds.length < 3) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        if (!characterIds.includes(randomId)) {
            characterIds.push(randomId);
        }
    }

    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = ''; // clear prev

    try {
        const uniqueCharacters = new Set();

        for (const id of characterIds) {
            const response = await fetch(`https://bobsburgers-api.herokuapp.com/characters/${id}`);
            if (!response.ok) {
                console.warn(`Failed to fetch character with ID ${id}, trying another ID...`);
                continue;
            }
            const character = await response.json();

            if (!uniqueCharacters.has(character.name)) {
                uniqueCharacters.add(character.name);

                const characterElement = document.createElement('div');
                characterElement.className = 'character';
                characterElement.innerHTML = `
                    <h3>${character.name}</h3>
                    ${character.image ? `<img src="${character.image}" alt="${character.name}" style="max-width: 100px; border-radius: 50%;">` : ''}
                    <p>${character.occupation || 'No occupation listed'}</p>
                `;
                charactersList.appendChild(characterElement);
            }
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
        charactersList.innerHTML = '<p>Failed to load characters. Check console for details.</p>';
    }
};

// GoT hahmohaku

document.addEventListener('DOMContentLoaded', function() {
    const fetchGotButton = document.getElementById('fetchGot');
    if (!fetchGotButton) {
        console.error('Button not found!');
        return;
    }

    fetchGotButton.onclick = function(e) {
        e.preventDefault();
        const gotListDiv = document.getElementById('got-list');
        if (!gotListDiv) {
            console.error('got-list div not found!');
            return;
        }
        gotListDiv.innerHTML = '<p>Loading character...</p>';

        // Fetch characters from ThronesApi
        fetch('https://thronesapi.com/api/v2/Characters')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(characters => {
                console.log('Characters list:', characters);

                // Pick a random character
                const randomIndex = Math.floor(Math.random() * characters.length);
                const randomCharacter = characters[randomIndex];

                gotListDiv.innerHTML = `
                    <div class="character-card">
                        <h2>${randomCharacter.fullName || 'Unknown'}</h2>
                        <p><strong>Title:</strong> ${randomCharacter.title || 'None'}</p>
                        <p><strong>Family:</strong> ${randomCharacter.family || 'Unknown'}</p>
                        <img src="${randomCharacter.imageUrl}" alt="${randomCharacter.fullName}" style="max-width: 200px;">
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                gotListDiv.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
            });
    };
});