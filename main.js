let carts = document.querySelectorAll(".addcart");
let hearts = document.querySelectorAll(".heart").forEach((hearts) => {
    hearts.addEventListener("click", () => {
        hearts.style.color = "red";
    });

});

let products = [{
        name: "casual",
        tag: "product1",
        price: 200,
        inCart: 0,
    },
    {
        name: "Classy Watch",
        tag: "product2",
        price: 300,
        inCart: 0,
    },
    {
        name: "Sport Watch",
        tag: "product3",
        price: 250,
        inCart: 0,
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoad() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector(".total span").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log(product);
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".total span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".total span").textContent = 1;
    }

    setItem(product);
}

function setItem(product) {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product,
        };
    }

    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}




function display() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let prodContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if (cartItems && prodContainer) {
        prodContainer.innerHTML = "";
        Object.values(cartItems).map((item) => {
            prodContainer.innerHTML += `
            <div class="Product">
               <i class="fas fa-trash-alt"></i>
               <img src="${item.tag}.jpg">
               <span>${item.name}</span>
               <div class="price">${item.price}DT</div>
               <div class="quantit">
               <ion-icon name="add-circle-outline"></ion-icon><span class="in">${
                 item.inCart
               }</span><ion-icon name="remove-circle-outline"></ion-icon></i>
               </div>
               <div class="total">
                    ${item.inCart * item.price}DT
               </div>
            <div/>
            `;
        });

        prodContainer.innerHTML += `
          <div class="basketTotalTcontainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">${cartCost}DT</h4>
          </div>  
        `;
    }
}

display();
onLoad();