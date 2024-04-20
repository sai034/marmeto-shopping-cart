const fetchData = async () => {
    const API_ENDPOINT =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

    try {
      const response = await fetch(API_ENDPOINT)
      const data = await response.json()
      const productData = data.product;

      // USING SAMPLE IMAGES FROM THE WEB AS THE LINKS TO THE IMAGES IN THE RESPONSE ARE BROKEN
      productData.images = sampleImages

      const price = parseFloat(
        productData.price.replace("$", "").replace(",", "")
      );
      const compareAtPrice = parseFloat(
        productData.compare_at_price.replace("$", "").replace(",", "")
      );
      const percentageOff =
        ((compareAtPrice - price) / compareAtPrice) * 100;

      const percentageOffElement = document.querySelector(".percentage-off");
      if (!isNaN(percentageOff) && percentageOff > 0) {
        percentageOffElement.textContent = `${percentageOff.toFixed(0)}% Off`;
      } else {
        percentageOffElement.textContent = "No discount";
      }

      document.querySelector(".product-vendor").textContent =
        productData.vendor;
      document.querySelector(".product-title").textContent =
        productData.title;
      document.querySelector(".price").textContent = productData.price;
      document.querySelector(".compare-at-price").textContent =
        productData.compare_at_price;
      document.querySelector(".product-description").innerHTML =
        productData.description;

      document.getElementById("main-product-image").src =
        './images/main.png';

      const thumbnailsWrapper = document.querySelector(".thumbnails");
      thumbnailsWrapper.innerHTML = "";
      productData.images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = "Thumbnail";
        img.classList.add("thumbnail");
        img.addEventListener("click", () => {
          document.getElementById("main-product-image").src = image.src;
        });
        thumbnailsWrapper.appendChild(img);
      });

      const populateColorOptions = () => {
        const colorContainer = document.querySelector(".c-container");
        colorContainer.innerHTML = "";
        productData.options[0].values.forEach((color, index) => {
          const colorDiv = document.createElement("div");
          const colorName = Object.keys(color)[0];
          colorDiv.style.backgroundColor = color[colorName];
          colorDiv.classList.add("color");
          colorDiv.dataset.color = colorName;

          colorDiv.addEventListener("click", () =>
            handleColorSelect(colorDiv, index)
          );

          colorContainer.appendChild(colorDiv);

          // Initially select the first color
          if (index === 0) {
            colorDiv.classList.add("selected");
            colorDiv.style.border = "2px solid black";
          }
        });
      }

      const populateSizeOptions = () => {
        const sizeContainer = document.querySelector(".size-selector");
        sizeContainer.innerHTML = "";
        productData.options[1].values.forEach((size, index) => {
          const sizeDiv = document.createElement("div");
          sizeDiv.classList.add("size-type-container");

          const input = document.createElement("input");
          const label = document.createElement("label");
          input.type = "radio";
          input.id = size.toLowerCase();
          input.name = "size";
          input.value = size;
          label.htmlFor = size.toLowerCase();
          label.textContent = size;

          sizeDiv.appendChild(input);
          sizeDiv.appendChild(label);

          sizeContainer.appendChild(sizeDiv);

          // Initially select the first size
          if (index === 0) {
            input.checked = true;
          }
        });
      }

      const handleColorSelect = (selectedColorDiv) => {
        const allColors = document.querySelectorAll(".color");
        allColors.forEach((color) => {
          color.classList.remove("selected");
          color.style.border = "none";
        });
        selectedColorDiv.classList.add("selected");
        selectedColorDiv.style.border = "2px solid black";
      }

      function handleSizeSelect() {
        updateAddToCartMessage();
      }

      function updateAddToCartMessage() {
        const selectedColor = document.querySelector(".color.selected");
        const selectedSize = document.querySelector('input[name="size"]:checked');
        const addToCartMessage = document.querySelector(".add-to-cart-message");

        if (selectedColor && selectedSize) {
          const color = selectedColor.dataset.color;
          const size = selectedSize.value;

          const addedProductDetails = document.getElementById(
            "addedProductDetails"
          );
          addedProductDetails.textContent = `Embrace Sideboard with Color ${color}, Size ${size} added to cart`;

          addedProductDetails.style.background = "#E7F8B7";
          addedProductDetails.style.color = "#000000";
          addedProductDetails.style.fontFamily = "Inter";
          addedProductDetails.style.fontSize = "14px";
          addedProductDetails.style.fontWeight = "600";
          addedProductDetails.style.lineHeight = "28px";
          addedProductDetails.style.letterSpacing = "0";
          addedProductDetails.style.textAlign = "center";
          addedProductDetails.style.marginTop = '10px';

          addToCartMessage.style.display = "block";
        } else {
          addToCartMessage.style.display = "none";
        }
      }


      const colors = document.querySelectorAll(".color");
      const sizeInputs = document.querySelectorAll('input[name="size"]');
      const addToCartButton = document.querySelector(".add-to-cart-btn");

      colors.forEach((color, index) => {
        color.addEventListener("click", () =>
          handleColorSelect(color, index)
        );
      });

      sizeInputs.forEach((size) => {
        size.addEventListener("change", handleSizeSelect);
      });

      populateColorOptions();
      populateSizeOptions();
      addToCartButton.addEventListener("click", updateAddToCartMessage);
        
      } catch (error) {
        console.log("Something went wrong while fetching the data", error)
      }
    }
  const decrement = () => {
    let quantityElement = document.getElementById("quantityValue");
    let currentValue = parseInt(quantityElement.textContent);
    if (currentValue > 1) {
      quantityElement.textContent = currentValue - 1;
    }
  }
  const increment = () => {
    let quantityElement = document.getElementById("quantityValue");
    let currentValue = parseInt(quantityElement.textContent);
  
    quantityElement.textContent = currentValue + 1;
  }
  
  fetchData()

  const sampleImages = [
    {
        "src": "./images/main.png"
    },
    {
        "src": "https://picsum.photos/401"
    },
    {
        "src": "https://picsum.photos/402"
    },
    {
        "src": "https://picsum.photos/403"
    },
    // {
    //   "src": "https://picsum.photos/399"
    // },
    // {
    //     "src": "https://picsum.photos/404"
    // },
    // {
    //     "src": "https://picsum.photos/398"
    // },
    // {
    //     "src": "https://picsum.photos/397"
    // }
]