let itemsData = [
  {
    id: 0,
    name: "Classic Watch",
    price: 120,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 1,
    name: "Head Phone",
    price: 250,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

let timeout;
const Calculate = (id, qty, price, firstTime) => {
  if (firstTime != 1) {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
  timeout = setTimeout(() => {
    let updatePrice = document.getElementsByClassName("price")[id];
    updatePrice.innerHTML = `$ ${parseFloat(qty * price).toFixed(2)}`;
    finalCalculation();
  }, 500);
};

const finalCalculation = () =>{
  let itemsQty = document.getElementsByClassName("price");
  
  let sum = 0;
  for(let i=0; i< itemsQty.length; i++){
    let arr = document.getElementsByClassName("price")[i].innerHTML.split('').splice(2);
    let a= '';
    arr.forEach((item)=>  {a += item;})
    sum += parseFloat(a);
  }
  document.getElementById('Subtotal').innerHTML = `$ ${sum}`;

  document.getElementById('finalPrice').innerHTML = `$ ${(sum+ 10)+20}`;
}

//!------ Cart Functionality

const updateUi = () => {
  let cartData = JSON.parse(localStorage.getItem("items"));
  let cartParent = document.getElementById("cartData");
  cartParent.innerHTML = "";
  document.getElementById("cartSize").innerHTML = cartData.length;
  let count = 0;
  cartData.forEach((getData) => {
    let id = itemsData.find((item) => item.id == getData.id);
    if (id) {
      let data = `<div class="flex items-center justify-between border-b pb-4">
                      <div class="flex items-center">
                          <img src="${id.img}" 
                               alt="${id.name}" 
                               class="w-20 h-20 object-cover rounded-lg">
                          <div class="ml-4">
                              <h3 class="trackData text-lg font-semibold text-gray-800" value="${id.id}" >${id.name}</h3>
                              <p class="text-gray-500">$ ${id.price}</p>
                          </div>
                      </div>
                      <div class="flex items-center">
                          <button class="bg-gray-200 px-3 py-1 rounded-lg" onclick="subQty(${count},false)">-</button>
                          <input type="number" value="${getData.qty}" min="1" class="qty w-16 text-center mx-2 border rounded" readonly>
                          <button class="bg-gray-200 px-3 py-1 rounded-lg" onclick="addQty(${count},false)">+</button>
                          <span class="price text-gray-700 font-semibold ml-6" >$ ${id.price}</span>
                      </div>
                  </div>`;

      cartParent.innerHTML += data;
      Calculate(count, getData.qty, id.price, 1);
      count++;
    }
  });
};
if (window.location.pathname === "/cart.html") {
  updateUi();
} else {
  let parentDiv = document.getElementById("productDetails");
  itemsData.forEach((item) => {
    let tag = `  <div
              class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
            >
              <div
                class="h-56 w-full bg-cover"
                style="
                  background-image: url(${item.img});
                "
              ></div>
              <div class="px-5 py-3">
                <h3 class="text-gray-700 uppercase">${item.name}</h3>
                <span class="text-gray-500 mt-2">$ ${item.price}</span>
                <div class="flex items-center mt-3">
                  <button class="bg-gray-200 px-3 py-1 rounded-lg" onclick="subQty(${item.id},true)">-</button>
                  <input
                    type="number"
                    value="1"
                    min="1"
                    max="100"
                    class="qty w-16 text-center mx-2 border rounded"
                    readonly
                  />
                  <button class=" bg-gray-200 px-3 py-1 rounded-lg" onclick="addQty(${item.id},true)">+</button>
                </div>
                <button
                  class="bg-green-500 text-white px-4 py-2 mt-3 rounded-lg w-full hover:bg-green-600"
                  onclick="addToCart(${item.id})"
                >
                  Add to Cart
                </button>
              </div>
            </div>`;

    parentDiv.innerHTML += tag;
  });

  const data = JSON.parse(localStorage.getItem("items"));
  if(data){
   document.getElementById("cart-count").innerHTML= data.length;
    data.forEach((item) => {
      document.getElementsByClassName("qty")[item.id].value = item.qty;
    })
  }
}
// Add Qty
const addQty = (value, home) => {
  if (home) {
    const currentQty = document.getElementsByClassName("qty")[value];
    if (parseInt(currentQty.value) >= 100) return;
    currentQty.value = parseInt(currentQty.value) + 1;
  } else {
    let id = document.getElementsByClassName("trackData")[value];
    let getItemPrice = itemsData.find(
      (itemPrice) => itemPrice.id == id.getAttribute("value")
    );
    const currentQty = document.getElementsByClassName("qty")[value];
    if (parseInt(currentQty.value) >= 100) return;
    currentQty.value = parseInt(currentQty.value) + 1;
    Calculate(value, currentQty.value, getItemPrice.price, 0);
    addToCart(value);
  }
};

// Sub Qty
const subQty = (value, home) => {
  if (home) {
    const currentQty = document.getElementsByClassName("qty")[value];
    if (currentQty.value == 0) {
      return;
    }
    currentQty.value = parseInt(currentQty.value) - 1;
  } else {
    let id = document.getElementsByClassName("trackData")[value];
    let { itemID, price } = itemsData.find(
      (itemPrice) => itemPrice.id == id.getAttribute("value")
    );
    const currentQty = document.getElementsByClassName("qty")[value];
    if (currentQty.value <= 1) {
      removeTocart(value);
      return;
    }
    currentQty.value = parseInt(currentQty.value) - 1;
    Calculate(value, currentQty.value, price, 0);
    addToCart(value);
  }
};

//add to cart

const addToCart = (itemId) => {
  
  const currentQty = parseInt(
    document.getElementsByClassName("qty")[itemId].value
  );
  const prvData = JSON.parse(localStorage.getItem("items"));

  if (!prvData) {
    localStorage.setItem(
      "items",
      JSON.stringify([
        {
          id: itemId,
          qty: currentQty,
        },
      ])
    );
  } else {
    let findData = prvData.find((data) => data.id == itemId);
    if (findData) {
      prvData.forEach((items) => {
        if (items.id == itemId) {
          items.qty = currentQty;
          return;
        }
      });
    } else {
      const product = {
        id: itemId,
        qty: currentQty,
      };
      prvData.push(product);
    }
    document.getElementById("cart-count").innerHTML= prvData.length;
    localStorage.setItem("items", JSON.stringify(prvData));
  }
};

const removeTocart = (id) => {
  const prvData = JSON.parse(localStorage.getItem("items"));
  prvData.splice(id, 1);

  localStorage.setItem("items", JSON.stringify(prvData));

  updateUi();
};

