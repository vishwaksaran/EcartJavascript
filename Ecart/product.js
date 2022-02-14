let productListRow = document.getElementById("SingleProduct");
console.log("ENTERED srg");
if (window.location.search != " ") {
  let id = location.search.split("=")[1];
  fetchProductList(id);
} else {
  fetchProductList();
}

async function fetchProductList(Id) {
  fetch("https://fakestoreapi.com/products/" + Id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      renderProductListPage(data);
    });
}

function renderProductListPage(arr) {
  let SumC = " ";
  var card = `  <div class="row d-flex justify-content-center align-items-center">
        <div class="col-2 d-flex justify-content-end align-items-center">
          <img
            src="${arr.image}"
            alt=""
            class="rounded float-start logo"
          />
        </div>
        <div
          class="col-5 mx-5"
          style="margin-block-end: auto; margin-top: 3rem"
        >
          <h1>${arr.title}</h1>
          <h3>Category :${arr.category}</h3>
          <div id="starcolum d-flex" style="gap:2rem;">
          <h4>Price : $ ${arr.price}</h4> <div class="starL"><span class="h6"> Rating:${arr.rating.rate}</span> 
             <ul class="list-inline small stardiv">
             <!-- RATING STAR TO BE ADDED -->
          </ul>
        </div>
      </div>
          <h5>
            ${arr.description}
          </h5>
          <div class="btn-group me-auto my-3 w-100">
            <button class="btn btn-primary" onclick="window.location.href = './index.html'">BACK TO HOME</button>
            <button class="btn btn-primary mx-5">ADD TO CART</button>
          </div>
        </div>
      </div> `;

  productListRow.innerHTML = productListRow.innerHTML + card;

  let carddiv = document.getElementsByClassName("stardiv");
  console.log("CARDIV" + carddiv);
  for (let i = 0; i < carddiv.length; i++) {
    let stars = Math.floor(arr.rating.rate);
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
}
