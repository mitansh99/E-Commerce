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


//!------ Cart Functionality

if (window.location.pathname === '/cart.html') {
  
  
  let cartData = JSON.parse(localStorage.getItem("items"));
  let cartParent = document.getElementById('cartData');
  
  document.getElementById('cartSize').innerHTML = cartData.length;
  
  cartData.forEach((getData) => {
    let id = itemsData.find(item => item.id == getData.id)
    if(id){
    let data = `<div class="flex items-center justify-between border-b pb-4">
                      <div class="flex items-center">
                          <img src="${id.img}" 
                               alt="${id.name}" 
                               class="w-20 h-20 object-cover rounded-lg">
                          <div class="ml-4">
                              <h3 class="text-lg font-semibold text-gray-800">${id.name}</h3>
                              <p class="text-gray-500">$ ${id.price}</p>
                          </div>
                      </div>
                      <div class="flex items-center">
                          <button class="bg-gray-200 px-3 py-1 rounded-lg">-</button>
                          <input type="number" value="${getData.qty}" min="1" class="w-16 text-center mx-2 border rounded" readonly>
                          <button class="bg-gray-200 px-3 py-1 rounded-lg">+</button>
                          <span class="text-gray-700 font-semibold ml-6">$120</span>
                      </div>
                  </div>`  ;
  
                  cartParent.innerHTML += data;
    }
  })
  }

else{
  document.addEventListener("DOMContentLoaded", () => {

 
    let parentDiv = document.getElementById('productDetails');
      itemsData.forEach((item) => {
          let tag  = `  <div
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
                  <button class="bg-gray-200 px-3 py-1 rounded-lg" onclick="subQty(${item.id})">-</button>
                  <input
                    type="number"
                    value="1"
                    min="1"
                    max="100"
                    class="qty w-16 text-center mx-2 border rounded"
                    readonly
                  />
                  <button class="bg-gray-200 px-3 py-1 rounded-lg" onclick="addQty(${item.id})">+</button>
                </div>
                <button
                  class="bg-green-500 text-white px-4 py-2 mt-3 rounded-lg w-full hover:bg-green-600"
                  onclick="addToCart(0)"
                >
                  Add to Cart
                </button>
              </div>
            </div>`;
    
            parentDiv.innerHTML += tag;
      })
    })

// Add Qty
const addQty = (value) => {
  const currentQty = document.getElementsByClassName("qty")[value];
  currentQty.value = parseInt(currentQty.value) + 1;
};

// Sub Qty
const subQty = (value) => {
  const currentQty = document.getElementsByClassName("qty")[value];
  currentQty.value = parseInt(currentQty.value) - 1;
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
    console.log(prvData);
    localStorage.setItem("items", JSON.stringify(prvData));
  }
};

}
