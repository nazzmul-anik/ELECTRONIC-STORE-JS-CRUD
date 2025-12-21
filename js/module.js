const productdb = (dbname, table) => {
  // Create Database

  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

  //   const db = new Dexie("mydb");
  //   db.version(1).stores({
  //     friends: `name, age`,
  //   });

  return db;
};

// Insert function
const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("Data Inserted Sucessfully!!");
  } else {
    console.log("Please, Provide Data...!");
  }

  return flag;
};

// Check textbox validation
const empty = (object) => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }

  return flag;
};

// Get data from Database

const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table) => {
        obj = ShortObj(table);
        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

const ShortObj = (shortobj) => {
  let obj = {};
  obj = {
    id: shortobj.id,
    name: shortobj.name,
    seller: shortobj.seller,
    price: shortobj.price,
  };

  return obj;
};

// Create Dynamic Elements

const createElements = (tagname, appentTo, fn) => {
  const element = document.createElement(tagname);
  if (appentTo) {
    appentTo.appendChild(element);
  }
  if (fn) {
    fn(element);
  }
};

export default productdb;
export { bulkcreate, getData, createElements };
