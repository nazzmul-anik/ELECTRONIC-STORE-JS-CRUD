import productdb, { bulkcreate, getData, createElements } from "./module.js";

let db = productdb("Productdb", {
  products: `++id, name, seller, price`,
});

// NotFound
const notfound = document.getElementById("notfound");

// Input Tags
const userId = document.getElementById("userId");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// Button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// Window On Load Event
window.onload = () => {
  textId(userId);
};

function textId(textboxid) {
  getData(db.products, (data) => {
    textboxid.value = data.id + 1 || 1;
  });
}

// Table Creation and Design using JS
const table = () => {
  const tbody = document.getElementById("tbody");

  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.products, (data) => {
    if (data) {
      createElements("tr", tbody, (tr) => {
        for (const value in data) {
          createElements("td", tr, (td) => {
            td.textContent =
              data.price === data[value] ? `$ ${data[value]}` : data[value];
          });
        }

        createElements("td", tr, (td) => {
          createElements("i", td, (i) => {
            i.className += "fas fa-edit btnedit text-success";

            i.setAttribute(`data-id`, data.id);
            i.onclick = editBtn;
          });
        });

        createElements("td", tr, (td) => {
          createElements("i", td, (i) => {
            i.className += "fas fa-trash-alt btndelete text-danger";

            i.setAttribute(`data-id`, data.id);
            i.onclick = deleteBtn;
          });
        });
      });
    } else {
      notfound.textContent = "No Record Found In The Database !!";
    }
  });
};

function removeMessage(element) {
  setTimeout(() => {
    element.classList.remove("active");
  }, 2000);
}

function getMessage(msg) {
  let msgclass = document.querySelector(msg);
  msgclass.classList.add("active");
  removeMessage(msgclass);
}

// Create Button Event
btncreate.addEventListener("click", () => {
  let flag = bulkcreate(db.products, {
    name: proname.value,
    seller: seller.value,
    price: price.value,
  });

  proname.value = seller.value = price.value = "";
  getData(db.products, (data) => {
    userId.value = data.id + 1 || 1;
  });

  table();
  getMessage(".insertmsg");
});

// Read Button Event and Create Dynamic Data
btnread.addEventListener("click", table);

function editBtn(event) {
  let id = parseInt(event.target.dataset.id);

  db.products.get(id, (data) => {
    userId.value = data.id || 0;
    proname.value = data.name || "";
    seller.value = data.seller || "";
    price.value = data.price || "";
  });
}

function deleteBtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.products.delete(id);
  table();
  getMessage(".deletemsg");
}

// Update Button Event
btnupdate.addEventListener("click", () => {
  const id = parseInt(userId.value) || 0;
  if (id) {
    db.products
      .update(id, {
        name: proname.value,
        seller: seller.value,
        price: price.value,
      })
      .then((updated) => {
        getMessage(".updatemsg");
      });
    table();
  }
});

// Delete Button Events
btndelete.addEventListener("click", () => {
  db.delete();
  db = productdb("Productdb", {
    products: `++id, name, seller, price`,
  });
  db.open();
  table();
  textId(userId);
  getMessage(".deletemsg");
});
