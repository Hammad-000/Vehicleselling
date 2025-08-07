
let items = [
  {
    id: 1,
    image: "./images/bike0.jfif",
    title: "Bike1",
    description: "Bad",
    price: 100,
    category: "bikes",
    rating: 1,
  },
  {
    id: 2,
    image: "./images/bike1.webp",
    title: "Bike2",
    description: "Good",
    price: 300,
    category: "bikes",
    rating: 3,
  },
  {
    id: 3,
    image: "./images/bike2.jfif",
    title: "Bike3",
    description: "Perfect",
    price: 500,
    category: "bikes",
    rating: 4,
  },
  {
    id: 4,
    image: "./images/bike4.avif",
    title: "Bike3",
    description: "Perfect",
    price: 600,
    category: "bikes",
    rating: 4,
  },
  {
    id: 5,
    image: "./images/cycle1.jpg",
    title: "Cycle1",
    description: "Nice",
    price: 300,
    category: "cycles",
    rating: 3,
  },
  {
    id: 6,
    image: "./images/cycle2.webp",
    title: "Cycle2",
    description: "Bad",
    price: 200,
    category: "cycles",
    rating: 2,
  },
  {
    id: 7,
    image: "./images/cycle3.webp",
    title: "Cycle3",
    description: "Good",
    price: 400,
    category: "cycles",
    rating: 5,
  },
  {
    id: 8,
    image: "./images/cycle4.webp",
    title: "Cycle3",
    description: "Perfect",
    price: 500,
    category: "cycles",
    rating: 5,
  },
  {
    id: 9,
    image: "./images/car1.jpg",
    title: "Car1",
    description: "Perfect",
    price: 900,
    category: "cars",
    rating: 5,
  },
  {
    id: 10,
    image: "./images/car2.jfif",
    title: "Car2",
    description: "Nice",
    price: 750,
    category: "cars",
    rating: 4,
  },
  {
    id: 11,
    image: "./images/car3.webp",
    title: "Car3",
    description: "Bad",
    price: 400,
    category: "cars",
    rating: 2,
  },
  
  {
    id: 12,
    image: "./images/car4.jpg",
    title: "Car3",
    description: "Bad",
    price: 300,
    category: "cars",
    rating: 1,
  },
  
];



let searchText = "";
let selectedRating = "";
let selectedCategories = [];
let selectedMaxPrice = findRange().max;


const setupChips = () => {
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.getAttribute("data-type");
      const value = chip.getAttribute("data-value");

      chip.classList.toggle("active");

      if (type === "rating") {
       
        document.querySelectorAll('.chip[data-type="rating"]').forEach(c => {
          if (c !== chip) c.classList.remove("active");
        });
        selectedRating = chip.classList.contains("active") ? value : "";
      }

      if (type === "category") {
        if (chip.classList.contains("active")) {
          selectedCategories.push(value);
        } else {
          selectedCategories = selectedCategories.filter(cat => cat  !== value);
        }
      }

      renderItems();
    });
  });
};

const setupChipSearch = () => {
  const searchInput = document.getElementById("chip-search");
  const chips = document.querySelectorAll(".chip");

  searchInput.addEventListener("input", () => {
    searchText = searchInput.value.toLowerCase();

    chips.forEach(chip => {
      const chipText = chip.textContent.toLowerCase();
      chip.style.display = chipText.includes(searchText) ? "inline-block" : "none";
    });

    renderItems(); // 
  });
};






function findRange() {
  let min = items[0].price;
  let max = items[0].price;

  items.forEach(product => {
    if (product.price < min) min = product.price;
    if (product.price > max) max = product.price;
  });

  return { min, max };
}


const setupRangeSlider = () => {
  const priceRange = findRange();
  const rangeInput = document.getElementById("rangefilter");
  const rangeValueDisplay = document.getElementById("range-value");

  rangeInput.min = priceRange.min;
  rangeInput.max = priceRange.max;
  rangeInput.value = selectedMaxPrice;
  rangeValueDisplay.textContent = `$${selectedMaxPrice}`;
};


const onChangePriceRange = (value) => {
  selectedMaxPrice = Number(value);
  document.getElementById("range-value").textContent = `$${selectedMaxPrice}`;
  renderItems();
};


const onChangeRatingHandler = (rating) => {
  selectedRating = selectedRating === rating ? "" : rating;
  renderRatingFilter(); 
  renderItems();
};


const setupCategoryFilter = () => {
  const checkboxes = document.querySelectorAll(".category-filter");
  const sortingSelect = document.getElementById("sorting");

  const handleFilterChange = () => {
    selectedCategories = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    renderItems();
  };

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", handleFilterChange);
  });

  sortingSelect.addEventListener("change", renderItems);
};


const renderItems = () => {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";
let filteredItems = items.filter(item => {
  const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
  const matchPrice = item.price <= selectedMaxPrice;
  const matchRating = selectedRating === "" || item.rating === Number(selectedRating);
  const matchSearch = searchText === "" || item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);

  return matchCategory && matchPrice && matchRating && matchSearch;
});

  

  
  const sortingValue = document.getElementById("sorting").value;
  if (sortingValue === "pricelowtohigh") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortingValue === "pricehightolow") {
    filteredItems.sort((a, b) => b.price - a.price);
  } else if (sortingValue === "ratinglowtohigh") {
    filteredItems.sort((a, b) => a.rating - b.rating);
  } else if (sortingValue === "ratinghightolow") {
    filteredItems.sort((a, b) => b.rating - a.rating);
  }

  
  filteredItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p class="price">$${item.price}</p>
      <p class="rating">Rating: ${"★".repeat(item.rating)} (${item.rating}/5)</p>
    `;
    itemsContainer.appendChild(itemDiv);
  });
};

setupChipSearch();
setupChips();
setupRangeSlider();
setupCategoryFilter();
renderItems();
