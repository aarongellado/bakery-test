import make from "../partials/make";
import { shopItems } from "../data";


const renderOptionDropdown = (optionArr, recomputeFn) => {
    const selectContainer = make("div", "carousel-item-select-container");
    const select = make("select", "carousel-item-select");
    if (optionArr.length > 0) {
      optionArr.forEach((e) => {
        let option = make("option", "carousel-item-option");
        option.setAttribute("value", e.value);
        option.innerText = e.label;
        select.appendChild(option);
      });
    }

    select.addEventListener('change', () => recomputeFn())

    selectContainer.appendChild(select);
    return selectContainer;
  };

  const renderQuantity = (recomputeFn) => {
    const quantityContainer = make("div", "carousel-item-quantity-container");
    const decrease = make("button", "carousel-item-quantity-decrease");
    const increase = make("button", "carousel-item-quantity-increase");
    const quantity = make("div", "carousel-item-quantity");

    decrease.innerText = "-";
    increase.innerText = "+";
    quantity.innerText = 0;

    const modifyQuantity = (condition) => {
      if (condition) {
        quantity.innerText = parseInt(quantity.innerText) + 1;
        recomputeFn();
      } else {
        if (quantity.innerText !== "0") {
          quantity.innerText = parseInt(quantity.innerText) - 1;
          recomputeFn();
        }
      }
    };

    increase.addEventListener("click", () => modifyQuantity(true));
    decrease.addEventListener("click", () => modifyQuantity(false));

    quantityContainer.appendChild(decrease);
    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(increase);

    return quantityContainer;
  };

  const renderCarouselItem = (item, id) => {
    const carouselItemContainer = make("div", "carousel-item", `item-${id}`);
    const carouselImgContainer = make("div", "carousel-item-img-container");
    const carouselImg = make("img", "carousel-item-img");
    const itemInfoContainer = make("div", "carousel-item-info-container");
    const itemTitle = make("h6", "carousel-item-title");
    const itemDescription = make("p", "carousel-item-description");
    const itemValueContainer = make("div", "carousel-item-values-container");
    const optionsContainer = make("div", "carousel-item-options-container");
    const select = renderOptionDropdown(item.options, () => recomputePrice());
    const quantity = renderQuantity(() => recomputePrice());
    const price = make('div', "carousel-item-price");
    const addBtn = make('button', "carousel-item-add");

    carouselImg.src = item.asset;
    itemTitle.innerText = item.name;
    itemDescription.innerText = item.description;
    price.innerText = "$0"
    addBtn.innerHTML = "<div class=\"highlight\">+</div> Add to cart";

    const recomputePrice = () => {
      let selectValue = parseInt(select.querySelector('.carousel-item-select').value);
      let quantityValue = parseInt(quantity.querySelector('.carousel-item-quantity').innerText)
      price.innerText = `$${selectValue * quantityValue * item.price}`;
    }

    carouselImgContainer.appendChild(carouselImg);
    itemInfoContainer.appendChild(itemTitle);
    itemInfoContainer.appendChild(itemDescription);
    optionsContainer.appendChild(select);
    optionsContainer.appendChild(quantity);
    itemValueContainer.appendChild(optionsContainer);
    itemValueContainer.appendChild(price);
    itemValueContainer.appendChild(addBtn);

    carouselItemContainer.appendChild(carouselImgContainer);
    carouselItemContainer.appendChild(itemInfoContainer);
    carouselItemContainer.appendChild(itemValueContainer);

    return carouselItemContainer;
  };

  export default function renderCarousel(){
    const carousel = document.querySelector("#carousel");
    shopItems.forEach((e, i) => {
      let carouselItem = renderCarouselItem(e, i);
      carousel.appendChild(carouselItem);
    });
  };
