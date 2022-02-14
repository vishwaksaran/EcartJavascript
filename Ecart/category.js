var arr = [];
if (window.location.search != " ") {
  let id = location.search.split("=")[1];
  console.log("PASSED THRIUGH");
  fetchCatDetails(id);
} else {
  alert("NO PARAMERTS PASSED");
  fetchCatDetails();
}

async function fetchCatDetails(cat) {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let chars = [];
      for (let i = 0; i < data.length; i++) {
        chars[i] = data[i].category;
      }

      let Category = [...new Set(chars)];
      console.log(Category);
      document.getElementById("Category-Title").textContent = Category[cat];
      //IF LOCAL STORAGE IS NOT EMPTY
      if (localStorage.getItem("Itemid") != null) {
        let Prod = document.getElementById("cardDiv");
        console.log("PRODUCTS PRESENT INSIDE STORAGE");
        var Sitems = localStorage.getItem("Itemid");
        var items1 = JSON.parse(Sitems);
        if (items1.length > 1) {
          var items = items1.flat(Infinity);
        } else {
          var items = items1;
        }
        console.log("length " + items.length + " items " + items);
        var Nitem = [];
        let z = 0;
        let count;
        let nonItem = [];
        for (let i = 0; i < data.length; i++) {
          Nitem[i] = data[i].id;
        }

        for (var i = 0; i < Nitem.length; i++) {
          count = 0;
          for (let z = 0; z < items.length; z++) {
            if (items[z] != Nitem[i]) {
              count++;
            }
          }
          if (count == items.length) {
            nonItem.push(Nitem[i]);
          }
        }
        console.log("PART" + nonItem);

        //Nitem = Nitem.filter((val) => !Nitem.includes(val));

        let j = 0;
        let sumC = " ";
        while (j < items.length) {
          for (let i = 0; i < data.length; i++) {
            if (items[j] == data[i].id && data[i].category == Category[cat]) {
              console.log("gone if");
              let totaldiv = `<div class="col-lg-3 col-md-6 mb-4 mb-lg-0" id="ShopC">
        <!-- Card-->
        <div class="card rounded shadow border-0">
          <div class="card-body p-4 d-flex">
          <div class="card-content" style="margin-block: auto;">
            <img
              src="${data[i].image}"
              alt="${data[i].id}"
              class="img-fluid d-block mx-auto mb-3"
            />
            
            <h5><a href="./product.html?categoryId=${data[i].id}" class="text-dark">${data[i].title}</a></h5>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="ratediv">
                <span id="rating">Rating</span>
                <ul class="list-inline small stardiv">
                  <!-- RATING STAR TO BE ADDED -->
                </ul>
              </div>
              <button class="btn btn-success">
                <span class="PriceTxt">Price:$ ${data[i].price}</span>
              </button>
              
            </div>
            <button class="btn btn-outline-danger w-100 my-1 check${data[i].id}" id="checkout" value=""  disabled="true"  >
              <span
                class="PriceTxt"
                style="font-family: 'Bebas Neue', cursive"
                >PRODUCT ADDED TO CART</span
              >
            </button>
            </div>
          </div>
        </div>
        </div>`;

              sumC = sumC + totaldiv;
            }
          }
          j++;
        }

        // console.log("nonItem " + nonItem + " Length" + nonItem.length);
        let j1 = 0;
        while (j1 < nonItem.length) {
          for (let i = 0; i < data.length; i++) {
            if (
              nonItem[j1] == data[i].id &&
              data[i].category == Category[cat]
            ) {
              console.log("gone if1");
              let totaldiv = `<div class="col-lg-3 col-md-6 mb-4 mb-lg-0" id="ShopC">
        <!-- Card-->
        <div class="card rounded shadow border-0">
          <div class="card-body p-4 d-flex">
          <div class="card-content" style="margin-block: auto;">
            <img
              src="${data[i].image}"
              alt="${data[i].id}"
              class="img-fluid d-block mx-auto mb-3"
            />
            
            <h5><a href="./product.html?categoryId=${data[i].id}" class="text-dark">${data[i].title}</a></h5>

            <div class="d-flex justify-content-between align-items-center">
              <div class="ratediv">
                <span id="rating">Rating</span>
                <ul class="list-inline small stardiv">
                  <!-- RATING STAR TO BE ADDED -->
                </ul>
              </div>
              <button class="btn btn-success">
                <span class="PriceTxt">Price:$ ${data[i].price}</span>
              </button>

            </div>
            <button class="btn btn-outline-primary w-100 my-1 check${data[i].id}" id="checkout" value=""  onclick="cartitem(${data[i].id})" >
              <span
                class="PriceTxt"
                style="font-family: 'Bebas Neue', cursive"
                > ADD TO CART</span
              >
            </button>
            </div>
          </div>
        </div>
        </div>`;

              sumC = sumC + totaldiv;
            }
          }
          j1++;
        }

        Prod.innerHTML = sumC;
      } else {
        document.getElementById("CartCount").style.display = "none";
        let chars = [];
        for (let i = 0; i < data.length; i++) {
          chars[i] = data[i].category;
        }

        //   let Category = [...new Set(chars)];
        //   console.log(Category);
        //   document.querySelectorAll("#textU")[1].innerHTML = Category[0];
        //   document.querySelectorAll("#textU")[2].innerHTML = Category[3];
        //   document.querySelectorAll("#textU")[4].innerHTML = Category[2];
        //   document.querySelectorAll("#textU")[5].innerHTML = Category[1];

        console.log(document.querySelectorAll("#textU")[0].innerHTML);
        let sumC = " ";
        let Prod = document.getElementById("cardDiv");
        let stars = 0;

        for (let i = 0; i < data.length; i++) {
          if (data[i].category == Category[cat]) {
            let totaldiv = `<div class="col-lg-3 col-md-6 mb-4 mb-lg-0" id="ShopC">
        <!-- Card-->
        <div class="card rounded shadow border-0">
          <div class="card-body p-4 d-flex">
          <div class="card-content" style="margin-block: auto;">
            <img
              src="${data[i].image}"
              alt="${data[i].id}"
              class="img-fluid d-block mx-auto mb-3"
            />
            
            <h5><a href="./product.html?categoryId=${data[i].id}" class="text-dark" >${data[i].title}</a></h5>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="ratediv">
                <span id="rating">Rating</span>
                <ul class="list-inline small stardiv">
                  <!-- RATING STAR TO BE ADDED -->
                </ul>
              </div>
              <button class="btn btn-success">
                <span class="PriceTxt">Price:$ ${data[i].price}</span>
              </button>
              
            </div>
            <button class="btn btn-outline-primary w-100 my-1 check${data[i].id}" id="checkout" value="" onclick="cartitem(${data[i].id})" >
              <span
                class="PriceTxt"
                style="font-family: 'Bebas Neue', cursive"
                >Add to Cart</span
              >
            </button>
            </div>
          </div>
        </div>
        </div>`;

            sumC = sumC + totaldiv;
          }
        }

        Prod.innerHTML = sumC;
      }
      //console.log(Prod.innerHTML); DISPLAYING CARD ELEMENTS COMPLETED

      //TO DISPLAY STAR RATING PART
      // console.log("starlist" + document.querySelectorAll("#starlist").length);
      let carddiv = document.getElementsByClassName("stardiv");
      for (let i = 0; i < carddiv.length; i++) {
        let stars = Math.floor(data[i].rating.rate);
        let sum = " ";
        for (let j = 0; j < 5; j++) {
          if (j < stars) {
            let addstardiv = `<li class="list-inline-item m-0">
                    <i class="fa fa-star text-success"></i>
                  </li>`;
            sum = sum + addstardiv;
          } else {
            let addstardiv = `<li class="list-inline-item m-0">
          <i class="fa fa-star-o text-success"></i>
        </li>`;
            sum = sum + addstardiv;
          }
        }
        carddiv[i].innerHTML = sum;
      }
      //START PART COMPLETED
    })
    .catch((err) => {
      console.error(err);
    });
}
function ProductSingle(categoryId) {
  console.log("INTO FUNCTION");
  window.location.href = ``;
  //window.location.href = "product.html";
}

function cartitem(id) {
  let check = document.querySelector(".check" + id);
  check.textContent = "PRODUCT SELECTED";
  check.disabled = true;

  arr.push(id);
  let item = [...new Set(arr)]; //TO AVOID DUPLICATION
  //TO STORE IN LOCAL STORAGE THE CLICKED ITEMS
  if (item.length > 1) {
    var items = item.flat(Infinity);
  } else {
    var items = item;
  }
  localStorage.setItem("Itemid", JSON.stringify(items));
  //document.querySelector(".cart-basket").textContent = item.length;
  document.getElementById("CartCount").style.display = "block";
  document.getElementById("CartCount").innerText = items.length;

  console.log(localStorage);
}

window.addEventListener("load", (event) => {
  //fetchCatDetails(cat);
  document.getElementById("CartCount").style.display = "block";
  let cardC = document.getElementById("CartCount").innerText;
  console.log("page is fully loaded");
  var Sitems = localStorage.getItem("Itemid");
  console.log("LOCALSTORAGE " + Sitems);
  if (Sitems != null) {
    var items = JSON.parse(Sitems);
    var frames = items.flat(Infinity);
    document.getElementById("CartCount").innerText = frames.length;
    cardC = frames.length;
    console.log("page is fully loaded button" + cardC);
    arr.push(frames);

    if (!cardC || cardC == 0) {
      document.getElementById("CartCount").style.display = "none";
    }
  } else {
    document.getElementById("CartCount").style.display = "none";
  }

  //localStorage.clear();
});
///https://love2dev.com/blog/javascript-remove-from-array/
