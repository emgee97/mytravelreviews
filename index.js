// Data for the travel reviews
var data = [
  {
    img: "./images/Napoli.jpg",
    country: "Napoli - Italy",
    title: "A Particular City",
    description:
      "Napoli, a city in Italy, is known for its rich history, vibrant culture, and stunning architecture. It is famous for its pizza and as the gateway to the Amalfi Coast.",
    rating: 4,
  },
  {
    img: "./images/Berlin.jpg",
    country: "Berlin - Germany",
    title: "A City of Contrasts",
    description:
      "Berlin, the capital of Germany, is a city rich in history and culture. It is known for its vibrant arts scene, diverse neighborhoods, and significant historical landmarks such as the Berlin Wall.",
    rating: 5,
  },
  {
    img: "./images/Lisbon.avif",
    country: "Lisbon - Portugal",
    title: "The City of Seven Hills",
    description:
      "Lisbon, the capital of Portugal, is known for its hilly landscape, historic neighborhoods, and vibrant culture. It offers stunning views, delicious cuisine, and a rich maritime history.",
    rating: 4,
  },
  {
    img: "./images/LakeComo.jpg",
    country: "Lake Como - Italy",
    title: "A Paradise on Earth",
    description:
      "Lake Como, located in Italy, is renowned for its stunning natural beauty, charming villages, and luxurious villas. It is a popular destination for tourists seeking relaxation and scenic views.",
    rating: 5,
  },
  {
    img: "./images/London.webp",
    country: "London - England",
    title: "God Save this City",
    description:
      "London, the capital of England, is a vibrant city known for its rich history, diverse culture, and iconic landmarks such as the Tower of London and Buckingham Palace.",
    rating: 5,
  },
  {
    img: "./images/Malta.webp",
    country: "La Valetta - Malta",
    title: "An Experience to Remember",
    description:
      "La Valetta, the capital of Malta, is a historic city known for its well-preserved architecture, rich history, and vibrant culture. It offers a unique blend of Mediterranean charm and historical significance.",
    rating: 4,
  },
  {
    img: "./images/Rhodes.png",
    country: "Rhodes - Greece",
    title: "Chill Holidays",
    description:
      "Rhodes, a Greek island, is famous for its ancient ruins, beautiful beaches, and charming old town. It offers a perfect blend of history, culture, and relaxation for visitors.",
    rating: 5,
  },
];

// DOM elements
const introduce = document.querySelector(".introduce");
const ordinalNumber = document.querySelector(".ordinal-number");
const thumbnailListWrapper = document.querySelector(".thumbnail-list .wrapper");
const nextBtn = document.querySelector(".navigation .next-button");
const container = document.querySelector(".container");

// Initialize content
introduce.innerHTML = "";
ordinalNumber.innerHTML = "";

// Populate the introduce and ordinal-number sections
for (let i = 0; i < data.length; i++) {
  introduce.innerHTML += `
  <div class="wrapper">
    <span>
      <h5 class="country" style="--idx: 0">${data[i].country}</h5>
    </span>
    <span>
      <h1 class="title" style="--idx: 1">${data[i].title}</h1>
    </span>
    <span>
      <p class="description" style="--idx: 2">${data[i].description}</p>
    </span>
    <span>
      <div class="rating" style="--idx: 3">${generateStars(
        data[i].rating
      )}</div>
    </span>
    <span>
      <a href="https://maximeguillaumin.com" class="discover-button" style="--idx: 4" target="_blank" rel="noopener noreferrer">Return to the portfolio</a>
    </span>
  </div>
  `;

  ordinalNumber.innerHTML += `<h2>0${i + 1}</h2>`;
}

// Set the first item as active
introduce.children[0].classList.add("active");
ordinalNumber.children[0].classList.add("active");

// Set the initial background image
container.style.backgroundImage = `url('${data[0].img}')`;
container.style.backgroundSize = "cover";
container.style.backgroundPosition = "center";
container.style.backgroundRepeat = "no-repeat";

// Populate the thumbnail list
thumbnailListWrapper.innerHTML += `
  <div class="thumbnail zoom">
    <img src="${data[0].img}" alt="">
  </div>
`;
for (let i = 1; i < data.length; i++) {
  thumbnailListWrapper.innerHTML += `
    <div class="thumbnail" style="--idx: ${i - 1}">
      <img src="${data[i].img}" alt="">
    </div>
  `;
}

// Function to generate star ratings
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return `<div class="stars">${stars}</div>`;
}

// Handle the next button click
let currentIndex = 0;
nextBtn.addEventListener("click", () => {
  nextBtn.disabled = true;

  // Clone the first thumbnail and append it to the end
  const clone = thumbnailListWrapper.children[0].cloneNode(true);
  clone.classList.remove("zoom");
  thumbnailListWrapper.appendChild(clone);
  thumbnailListWrapper.children[1].classList.add("zoom");

  // Remove the first thumbnail after a short delay
  setTimeout(() => {
    thumbnailListWrapper.children[0].remove();
    nextBtn.disabled = false;
  }, 500); // Adjusted to match the CSS transition duration

  // Update the index for thumbnails
  for (let i = 2; i < thumbnailListWrapper.childElementCount; i++) {
    thumbnailListWrapper.children[i].style.setProperty("--idx", i - 2);
  }

  // Update the current index
  currentIndex = (currentIndex + 1) % data.length;

  // Update active classes for introduce and ordinal-number
  for (let i = 0; i < data.length; i++) {
    introduce.children[i].classList.remove("active");
    ordinalNumber.children[i].classList.remove("active");
  }
  introduce.children[currentIndex].classList.add("active");
  ordinalNumber.children[currentIndex].classList.add("active");

  // Update the background image
  container.style.backgroundImage = `url('${data[currentIndex].img}')`;
});
