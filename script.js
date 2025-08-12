const items = [
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
    title: "Bike4",
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
    title: "Cycle4",
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
    title: "Car4",
    description: "Bad",
    price: 300,
    category: "cars",
    rating: 1,
  },
  {
    id: 13,
    image: "./images/truck1.jpg",
    title: "Truck1",
    description: "Bad",
    price: 2500,
    category: "trucks",
    rating: 2,
  },

  {
    id: 14,
    image: "./images/truck2.jpg",
    title: "Truck2",
    description: "Good",
    price: 3000,
    category: "trucks",
    rating: 3,
  },

  {
    id: 15,
    image: "./images/truck3.jpg",
    title: "Truck3",
    description: "Good",
    price: 3500,
    category: "trucks",
    rating: 4,
  },

  {
    id: 16,
    image: "./images/truck4.jpg",
    title: "Truck4",
    description: "Perfect",
    price: 4000,
    category: "trucks",
    rating: 5,
  },
  {
    id: 17,
    image: "./images/scooty1.jpg",
    title: "Scooty",
    description: "Perfect",
    price: 3000,
    category: "scooty",
    rating: 5,
  },
  {
    id: 18,
    image: "./images/scooty2.jpg",
    title: "Scooty",
    description: "Bad",
    price: 1500,
    category: "scooty",
    rating: 2,
  },
  {
    id: 19,
    image: "./images/scooty3.jpg",
    title: "Scooty",
    description: "Nice",
    price: 2500,
    category: "scooty",
    rating: 4,
  },
  {
    id: 20,
    image: "./images/scooty4.jpg",
    title: "Scooty",
    description: "Good",
    price: 1800,
    category: "scooty",
    rating: 4,
  },

];

let searchText = "";
let selectedRating = "";
let selectedCategories = [];
let selectedMaxPrice = findRange().max;
let currentPage = 1;
const itemsPerPage = 6;


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
          selectedCategories = selectedCategories.filter(cat => cat !== value);
        }
      }

      currentPage = 1;
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

    currentPage = 1;
    renderItems();
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

  rangeInput.addEventListener("input", (e) => {
    selectedMaxPrice = Number(e.target.value);
    rangeValueDisplay.textContent = `$${selectedMaxPrice}`;
    currentPage = 1;
    renderItems();
  });
};


const setupCategoryFilter = () => {
  const checkboxes = document.querySelectorAll(".category-filter");

  checkboxes.forEach(cb => {
    if (selectedCategories.includes(cb.value)) {
      cb.checked = true;
    }

    cb.addEventListener("change", () => {
      selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      renderCategoryChips();
      currentPage = 1;
      renderItems();
    });
  });
};


const renderCategoryChips = () => {
  const chipContainer = document.getElementById("active-chips");
  chipContainer.innerHTML = "";

  selectedCategories.forEach(category => {
    const chip = document.createElement("span");
    chip.classList.add("chip", "active");
    chip.textContent = category;
    chip.setAttribute("data-value", category);

    const closeBtn = document.createElement("span");
    closeBtn.textContent = " X";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.marginLeft = "6px";
    closeBtn.addEventListener("click", () => {
      const checkbox = document.querySelector(`.category-filter[value="${category}"]`);
      if (checkbox) checkbox.checked = false;

      selectedCategories = selectedCategories.filter(cat => cat !== category);
      renderCategoryChips();
      currentPage = 1;
      renderItems();
    });

    chip.appendChild(closeBtn);
    chipContainer.appendChild(chip);
  });
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

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredItems.slice(start, end);

  paginatedItems.forEach(item => {
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

  renderPagination(totalPages);
};


const renderPagination = (totalPages) => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (totalPages > 1) {
    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Prev";
      prevBtn.addEventListener("click", () => {
        currentPage--;
        renderItems();
      });
      paginationContainer.appendChild(prevBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active-page" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderItems();
      });
      paginationContainer.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.addEventListener("click", () => {
        currentPage++;
        renderItems();
      });
      paginationContainer.appendChild(nextBtn);
    }
  }
};


const setupSorting = () => {
  document.getElementById("sorting").addEventListener("change", () => {
    currentPage = 1;
    renderItems();
  });
};

setupChipSearch();
setupChips();
setupRangeSlider();
setupCategoryFilter();
setupSorting();
renderItems();
