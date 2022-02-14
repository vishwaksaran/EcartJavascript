async function fetchCartDetails() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var Sitems = localStorage.getItem("Itemid");
      var items1 = JSON.parse(Sitems);
      if (items1.length > 1) {
        var items = items1.flat(Infinity);
      } else {
        var items = items1;
      }
      console.log("ITEMS " + items);
      let sumC = " ";
      let Prod = document.getElementById("carddiv");
      let SumDiv = document.getElementById("SumaryDiv");
      // document.getElementById("CartCount").innerText = items.length;
      let cardC = document.getElementById("CartCount").innerText;

      if (cardC) {
        console.log("CARD B" + "defined");
      } else {
        console.log("NO VALUE INISE");
      }

      console.log(SumDiv);
      var price = 0;
      let j1 = 0;
      while (j1 < items.length) {
        for (let i = 0; i < data.length; i++) {
          if (items[j1] == data[i].id) {
            console.log("gone if1");
            let totaldiv = `<div class="card row align-items-center justify-content-center bg-white border-light shadow-sm mb-3 "
            style="flex-direction: row" id="Item${data[i].id}">
            <div class="col-2">
              <img src="${data[i].image}" alt="${data[i].title}"
                class="rounded img-fluid" />
            </div>
            <div class="col-2 text-center">
              <span class="display1">${data[i].title}
                </span>
            </div>
            <div class="col-2 text-center">
              <span class="h3"><strong>X</strong>1</span>
            </div>
            <div class="col-3 text-right">
              <span><strong>$ ${data[i].price}</strong></span>
            </div>
            <div class="col-2"><span class="close" onclick="RemoveItem(${data[i].id})">&#10005;</span></div>
          </div>
        </div>`;

            sumC = sumC + totaldiv;
            price = price + data[i].price;
          }
        }
        j1++;
      }
      let SummaryDiv = `
    <div class="row">
      <div class="col-12 card-header rounded">
        <div>
          <h5><b>Summary</b></h5>
        </div>
        <hr />
        <div class="row">
          <div class="col" style="
                padding-left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
              ">
            No of Items: ${items.length}
          </div>
          <div class="col text-right d-flex align-items-center">GST :(2.5%)<br>&euro; 132.00</div>
          <div class="col text-right d-flex align-items-center">CGST :(2.5%)<br>&euro; 120.00</div>
          <div class=" col-5 bg- card-header shadow rounded w-50">
            <form>
              <p class="h5">SHIPPING</p>
              </hr>
              <select>
                <option class="text-muted">
                  Standard-Delivery- &euro;5.00
                </option>
              </select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
          </div>
          <div class="row flex-grow-1">
            <div class="col h6 text-right" style="margin-top: auto;">TOTAL PRICE :</div>
            <div class="col h6 text-center" style="margin-top: auto;">$ ${price}</div>
          </div>

        </div>
        <div class="row my-3 d-flex justify-content-center">
          <!-- div class="col-6"><button class="btn btn-success"></button></div> -->
          <div class="col-12 d-flex flex-column"><button class="btn btn-primary">Procceed To Check Out</button>
          </div>
        </div>
      </div>
    </div>
  `;

      Prod.innerHTML = sumC;
      SumDiv.innerHTML = SummaryDiv;
    });
}
//FUNCTION TO REMOVE ITEM
function RemoveItem(id) {
  let cardC = document.getElementById("CartCount").innerText;
  cardC--;
  console.log("cartcount" + cardC);
  if (cardC == 0) {
    document.getElementById("CartCount").style.display = "none";
    document.getElementById("NocartDiv").style.display = "block";
    document.getElementById("ItemCarts-Display").style.display = "none";
    //localStorage.setItem("Itemid", JSON.stringify(cardC));
    localStorage.clear();
  } else {
    document.getElementById("Item" + id).style.display = "none";
    let CartC = localStorage.getItem("Itemid");
    let items1 = JSON.parse(CartC);
    let items = items1.flat(Infinity);
    console.log(items);
    items = items.filter((ele, index) => {
      return ele != id;
    });
    console.log("FILTERES " + items);
    //cardC--;
    document.getElementById("CartCount").innerText = cardC;
    localStorage.setItem("Itemid", JSON.stringify(items));
    fetchCartDetails();
  }
}

window.addEventListener("load", (event) => {
  // console.log("LOAD CHECK" + !cardC);
  console.log("PAGE IS LOADED");
  fetchCartDetails();

  //ON LLOAD MAKE SURE YOU HAVE ITEMS INSIDE LOCAL STORAGE
  if (localStorage.getItem("Itemid") != null) {
    document.getElementById("NocartDiv").style.display = "none";
    //document.getElementById("ItemCarts-Display").style.display = "block";
    var Sitems = localStorage.getItem("Itemid");
    let items1 = JSON.parse(Sitems);
    if (items1.length > 1) {
      var items = items1.flat(Infinity);
    } else {
      var items = items1;
    }
    document.getElementById("CartCount").innerText = items.length;
    let cardC = document.getElementById("CartCount").innerText;
    if (!cardC || cardC == 0) {
      document.getElementById("NocartDiv").style.display = "block";
      document.getElementById("CartCount").style.display = "none  ";
      document.getElementById("ItemCarts-Display").style.display = "none";
    }
  } else {
    document.getElementById("NocartDiv").style.display = "block";
    document.getElementById("ItemCarts-Display").style.display = "none";
    document.getElementById("CartCount").style.display = "none  ";
  }
});
