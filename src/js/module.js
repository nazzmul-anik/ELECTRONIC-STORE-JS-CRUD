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
  return Object.values(object).every((v) => v !== "");
};

// Get data from Database

const getData = (dbtable, fn) => {
  let index = 0;

  dbtable.count().then((count) => {
    if (count === 0) {
      fn(null);
    } else {
      dbtable.each((table) => {
        fn(ShortObj(table), index++);
      });
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
