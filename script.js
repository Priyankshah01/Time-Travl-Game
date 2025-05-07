// Time Machine - Idle Game

// DOM Elements
const yearDisplay = document.getElementById("year");
const eventList = document.getElementById("events");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const speedBtn = document.getElementById("speed");
const resetBtn = document.getElementById("reset");
const eventImage = document.getElementById("event-image");

// Game Variables
let interval = null;  // Fixed: properly initialized
let currentYear = 2025;
let speed = 1;
let yearStep = 1;

// Sample Historical Events Database
// Updated historical events (all whole years)
const historicalEvents = [
    // 1980s
    {
        name: "Ronald Reagan Elected President",
        category: "Politics",
        description: "CNN Begins Broadcasting Iran-Iraq War",
        start: 1980,
        end: 1985,
        image: "images/ronald_reagan.jpg",
        color: "#ff9ff3" // Pastel pink
    },

    {
        name: "MTV Launches",
        category: "Culture",
        description: "Music Television (MTV) debuts, revolutionizing music consumption with 24/7 music videos.",
        start: 1981,
        end: 1981,
        image: "images/mtv.gif",
        color: "#ff9ff3" // Pastel pink
    },
    {
        name: "First Space Shuttle Launch",
        category: "Space",
        description: "NASA's Columbia becomes the first reusable spacecraft to reach orbit.",
        start: 1981,
        end: 1981,
        image: "images/space_shuttle.jpg",
        color: "#70a1ff" // Sky blue
    },

    // 1990s
    {
        name: "World Wide Web Invented",
        category: "Technology",
        description: "Tim Berners-Lee creates the WWW at CERN, laying foundation for modern internet.",
        start: 1990,
        end: 1990,
        image: "images/www.jpeg",
        color: "#ff6b6b" // Coral
    },

    // 2000
    {
        name: "Y2K Bug",
        category: "Technology",
        description: "Global computer systems feared crashing due to date change, but minimal issues occurred.",
        start: 2000,
        end: 2000,
        image: "images/y2k.jpg",
        color: "#ff6b6b" // Coral
    },
    {
        name: "PlayStation 2 Release",
        category: "Technology",
        description: "Sony's best-selling game console launched, dominating the market for years.",
        start: 2000,
        end: 2000,
        image: "images/ps2.jpeg",
        color: "#ff6b6b"
    },

    // 2001
    {
        name: "Wikipedia Launches",
        category: "Technology",
        description: "Free online encyclopedia begins, becoming largest reference work in history.",
        start: 2001,
        end: 2001,
        image: "images/wikipedia.jpg",
        color: "#ff6b6b"
    },
    {
        name: "9/11 Attacks",
        category: "Politics",
        description: "Terrorist attacks on World Trade Center and Pentagon changed global security policies.",
        start: 2001,
        end: 2001,
        image: "images/911.jpeg",
        color: "#1e90ff" // Dodger blue
    },


    // 2002
    {
        name: "Euro Currency Introduced",
        category: "Economics",
        description: "Physical euro banknotes and coins enter circulation in 12 European countries.",
        start: 2002,
        end: 2002,
        image: "images/euro.jpg",
        color: "#fdcb6e" // Yellow
    },

    // 2003
    {
        name: "Human Genome Completed",
        category: "Science",
        description: "Scientists complete mapping 99% of human DNA sequence after 13 years.",
        start: 2003,
        end: 2003,
        image: "images/genome.jpg",
        color: "#2ed573" // Green
    },
    {
        name: "MySpace Launches",
        category: "Technology",
        description: "Pioneer social network becomes most visited website by 2006.",
        start: 2003,
        end: 2003,
        image: "images/myspace.webp",
        color: "#ff6b6b"
    },

    // 2004
    {
        name: "Facebook Founded",
        category: "Technology",
        description: "Mark Zuckerberg launches 'Thefacebook' at Harvard, revolutionizing social media.",
        start: 2004,
        end: 2004,
        image: "images/facebook.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Indian Ocean Tsunami",
        category: "Disaster",
        description: "Deadliest tsunami in history kills 230,000 across 14 countries.",
        start: 2004,
        end: 2004,
        image: "images/tsunami.avif",
        color: "#a4b0be" // Gray
    },

    // 2005
    {
        name: "YouTube Launches",
        category: "Technology",
        description: "First video 'Me at the zoo' uploaded, beginning video-sharing revolution.",
        start: 2005,
        end: 2005,
        image: "images/youtube.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Hurricane Katrina",
        category: "Disaster",
        description: "Deadliest US hurricane in decades floods New Orleans, causing $125B damage.",
        start: 2005,
        end: 2005,
        image: "images/katrina.jpg",
        color: "#a4b0be"
    },

    // 2006
    {
        name: "Twitter Launches",
        category: "Technology",
        description: "First tweet sent by Jack Dorsey: 'just setting up my twttr'.",
        start: 2006,
        end: 2006,
        image: "images/twitter.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Pluto Redefined",
        category: "Science",
        description: "IAU reclassifies Pluto as a dwarf planet, reducing solar system to 8 planets.",
        start: 2006,
        end: 2006,
        image: "images/pluto.jpg",
        color: "#2ed573"
    },

    // 2007
    {
        name: "iPhone Released",
        category: "Technology",
        description: "Apple's smartphone introduces multi-touch interface, changing mobile computing.",
        start: 2007,
        end: 2007,
        image: "images/iphone.jpeg",
        color: "#ff6b6b"
    },

    // 2008
    {
        name: "Bitcoin Whitepaper",
        category: "Technology",
        description: "Satoshi Nakamoto publishes paper creating first cryptocurrency.",
        start: 2008,
        end: 2008,
        image: "images/bitcoin.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Financial Crisis",
        category: "Economics",
        description: "Lehman Brothers collapse triggers global economic recession.",
        start: 2008,
        end: 2008,
        image: "images/financial_crisis.jpeg",
        color: "#fdcb6e"
    },

    // 2009
    {
        name: "Swine Flu Pandemic",
        category: "Health",
        description: "H1N1 influenza virus spreads globally, causing WHO pandemic declaration.",
        start: 2009,
        end: 2009,
        image: "images/swine_flu.webp",
        color: "#ff7f50" // Orange
    },

    // 2010
    {
        name: "iPad Released",
        category: "Technology",
        description: "Apple's tablet creates new device category, selling 300K on first day.",
        start: 2010,
        end: 2010,
        image: "images/ipad.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Deepwater Horizon",
        category: "Environment",
        description: "Largest marine oil spill in history lasts 87 days in Gulf of Mexico.",
        start: 2010,
        end: 2010,
        image: "images/oil_spill.jpg",
        color: "#2ed573"
    },


    // 2011
    {
        name: "Steve Jobs Dies",
        category: "Technology",
        description: "Apple co-founder passes away, leaving lasting tech legacy (Oct 5)",
        start: 2011,
        end: 2011,
        image: "images/steve_jobs.webp",
        color: "#ff6b6b" // Coral (Tech)
    },
    {
        name: "Arab Spring",
        category: "Politics",
        description: "Revolutionary wave across Middle East begins in Tunisia (Jan-Dec)",
        start: 2011,
        end: 2011,
        image: "images/arab_spring.jpg",
        color: "#1e90ff" // Blue (Politics)
    },

    // 2012
    {
        name: "London Olympics",
        category: "Sports",
        description: "First social media Olympics with #London2012 hashtags (Jul-Aug)",
        start: 2012,
        end: 2012,
        image: "images/london_olympics.avif",
        color: "#f368e0" // Pink (Sports)
    },
    {
        name: "Mars Curiosity Lands",
        category: "Space",
        description: "NASA rover successfully touches down on Mars (Aug 6)",
        start: 2012,
        end: 2012,
        image: "images/curiosity.jpg",
        color: "#6c5ce7" // Purple (Space)
    },

    // 2013
    {
        name: "Edward Snowden Revelations",
        category: "Politics",
        description: "NSA surveillance leaks spark global privacy debate (Jun)",
        start: 2013,
        end: 2013,
        image: "images/snowden.webp",
        color: "#1e90ff"
    },
    {
        name: "Boston Marathon Bombing",
        category: "Disaster",
        description: "Terror attack kills 3, injures 260+ (Apr 15)",
        start: 2013,
        end: 2013,
        image: "images/boston_marathon.jpg",
        color: "#a4b0be" // Gray (Disaster)
    },

    // 2014
    {
        name: "ISIS Emerges",
        category: "Politics",
        description: "Terror group declares caliphate in Iraq/Syria (Jun)",
        start: 2014,
        end: 2014,
        image: "images/isis.jpg",
        color: "#1e90ff"
    },
    {
        name: "Ice Bucket Challenge",
        category: "Culture",
        description: "Viral social media campaign for ALS research (Jul-Aug)",
        start: 2014,
        end: 2014,
        image: "images/ice_bucket.jpg",
        color: "#ff9ff3" // Light pink (Culture)
    },

    // 2015
    {
        name: "Paris Climate Agreement",
        category: "Environment",
        description: "195 nations sign landmark emissions treaty (Dec 12)",
        start: 2015,
        end: 2015,
        image: "images/paris_accord.jpg",
        color: "#2ed573" // Green (Environment)
    },
    {
        name: "Same-Sex Marriage Legalized (US)",
        category: "Politics",
        description: "Supreme Court ruling nationwide (Jun 26)",
        start: 2015,
        end: 2015,
        image: "images/marriage_equality.jpg",
        color: "#1e90ff"
    },

    // 2016
    {
        name: "Pokémon GO Craze",
        category: "Technology",
        description: "AR mobile game takes over the world (Jul)",
        start: 2016,
        end: 2016,
        image: "images/pokemon_go.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Brexit Vote",
        category: "Politics",
        description: "UK votes to leave European Union (Jun 23)",
        start: 2016,
        end: 2016,
        image: "images/brexit.jpg",
        color: "#1e90ff"
    },

    // 2017
    {
        name: "#MeToo Movement",
        category: "Culture",
        description: "Global reckoning on sexual harassment begins (Oct)",
        start: 2017,
        end: 2017,
        image: "images/metoo.jpg",
        color: "#ff9ff3"
    },
    {
        name: "First Gravitational Waves Detected",
        category: "Science",
        description: "LIGO confirms Einstein's prediction (Jan)",
        start: 2017,
        end: 2017,
        image: "images/gravitational_waves.jpg",
        color: "#00d2d3" // Teal (Science)
    },

    // 2018
    {
        name: "Cambridge Analytica Scandal",
        category: "Technology",
        description: "Facebook data breach affects 87M users (Mar)",
        start: 2018,
        end: 2018,
        image: "images/cambridge_analytica.jpg",
        color: "#ff6b6b"
    },
    {
        name: "Royal Wedding: Harry & Meghan",
        category: "Culture",
        description: "Global audience of 1.9B watches ceremony (May 19)",
        start: 2018,
        end: 2018,
        image: "images/royal_wedding.avif",
        color: "#ff9ff3"
    },

    // 2019
    {
        name: "First Black Hole Image",
        category: "Science",
        description: "Event Horizon Telescope captures history (Apr 10)",
        start: 2019,
        end: 2019,
        image: "images/black_hole.jpg",
        color: "#00d2d3"
    },
    {
        name: "Hong Kong Protests",
        category: "Politics",
        description: "Mass demonstrations against extradition bill (Jun-Dec)",
        start: 2019,
        end: 2019,
        image: "images/hong_kong.jpg",
        color: "#1e90ff"
    },

    // 2020
    {
        name: "COVID-19 Pandemic",
        category: "Health",
        description: "Global lockdowns begin (Mar)",
        start: 2020,
        end: 2020,
        image: "images/covid.jpg",
        color: "#ff7f50" // Orange (Health)
    },
    {
        name: "Black Lives Matter Protests",
        category: "Culture",
        description: "Global racial justice movement after George Floyd's death (May)",
        start: 2020,
        end: 2020,
        image: "images/blm.jpg",
        color: "#ff9ff3"
    },

    // 2020s
    {
        name: "ChatGPT Released",
        category: "AI",
        description: "OpenAI's chatbot sparks global AI revolution with human-like conversation abilities.",
        start: 2022,
        end: 2022,
        image: "images/chatgpt.jpg",
        color: "#6c5ce7" // Purple
    },

    {
        name: "DeepSeek Released",
        category: "AI",
        description: "Deepseek chatbot sparks global AI revolution with human-like conversation abilities.",
        start: 2024,
        end: 2025,
        image: "images/deepseek.jpg",
        color: "#6c5ce7" // Purple
    }
];

// Function to update time and events
function updateTime() {
    currentYear -= yearStep * speed;
    yearDisplay.textContent = currentYear; // No more toFixed(4)
    updateEvents();
}

// Function to display relevant events
function updateEvents() {
    eventList.innerHTML = "";
    historicalEvents.forEach(event => {
        if (currentYear >= event.start && currentYear <= event.end) {
            const listItem = document.createElement("li");
            listItem.className = `event-item event-${event.category.toLowerCase()}`;

            listItem.innerHTML = `
                <strong>${event.name}</strong>
                <span class="event-category">(${event.category})</span>
                <div class="event-description">${event.description}</div>
            `;

            eventList.appendChild(listItem);

            // Update image
            eventImage.src = event.image;
            eventImage.alt = event.name;
        }
    });
}

// Game Controls
startBtn.addEventListener("click", () => {
    if (!interval) {
        interval = setInterval(updateTime, 4000);
    }
});

pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});

speedBtn.addEventListener("click", () => {
    speed = speed === 1 ? 5 : speed === 5 ? 10 : 1;
    speedBtn.textContent = `Speed: ${speed}x`;
});

// Updated reset function
resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    currentYear = 2025; // Integer
    speed = 1;
    speedBtn.textContent = "Speed: 1x";
    updateEvents();
    yearDisplay.textContent = currentYear;
    eventImage.src = "images/world_events.jpg";
});

// Initial Display
updateEvents();
