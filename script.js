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
  const currentQty = document.getElementsByClassName("qty")[itemId].value;
  const prvData = JSON.parse(localStorage.getItem("items"));
//   console.log(prvData);

  if (!prvData) {
    localStorage.setItem("items", JSON.stringify([{
        id: itemId,
        qty: currentQty,
      },]));
    // const product = [
    //   {
    //     id: itemId,
    //     qty: currentQty,
    //   },
    // ];
    // localStorage.setItem("items", );
  } else {
    const product = {
      id: itemId,
      qty: currentQty,
    };
    prvData.push(product);
    console.log(prvData)
    // localStorage.setItem("items", JSON.stringify(product));
  }
};
