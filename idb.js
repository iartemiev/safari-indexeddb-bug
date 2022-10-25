const DB_NAME = "safari-test-idb";
const DB_VERSION = 1;
const STORE_NAME = "store";

let db;

const indexes = [
  { name: "byId", keyPath: "id" },
  { name: "byIdArrayKey", keyPath: ["id"] },
  { name: "byIdAndTitle", keyPath: ["id", "title"] },
];

const ensureOpen = async () => {
  if (!db) await openDB();
};

export function openDB() {
  return new Promise((resolve, reject) => {
    console.log("Opening database.");

    const DBOpenRequest = window.indexedDB.open(DB_NAME, DB_VERSION);

    DBOpenRequest.onerror = (event) => {
      console.error("Error opening database.", event);
      reject(event);
    };
    DBOpenRequest.onsuccess = (event) => {
      db = DBOpenRequest.result;
      console.log("Database opened successfully.");
      resolve(event);
    };

    DBOpenRequest.onupgradeneeded = (event) => {
      console.log("Database upgrade.");

      const _db = event.target.result;

      _db.onerror = (event) => {
        console.error("Database upgrade error.", event);
        reject(event);
      };

      const store = _db.createObjectStore(STORE_NAME, {
        autoIncrement: true,
      });

      indexes.forEach(({ name, keyPath }) => store.createIndex(name, keyPath));
    };
  });
}

export async function deleteDB() {
  await ensureOpen();
  db.close();

  return new Promise((resolve, reject) => {
    const DBDeleteRequest = window.indexedDB.deleteDatabase(DB_NAME);

    DBDeleteRequest.onerror = (event) => {
      console.error("Error deleting database.");
      reject(event);
    };

    DBDeleteRequest.onsuccess = (event) => {
      console.log("Database deleted successfully");
      resolve(event);
    };
  });
}

export async function saveData() {
  await ensureOpen();

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.add({
    id: 1,
    title: "hello",
    description: "this is a test",
  });

  console.log("Saved");
}

export async function getAllData() {
  await ensureOpen();

  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("byIdArrayKey");

  return new Promise((resolve, reject) => {
    const getAllRequest = index.getAll();

    getAllRequest.onerror = (event) => reject(event);

    getAllRequest.onsuccess = (event) => {
      console.log("getAll results", event.target.result);
      resolve(event.target.result);
    };
  });
}

async function getDataByKey(indexName) {
  await ensureOpen();

  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index(indexName);

  let key;

  if (indexName === "byId") {
    key = 1;
  } else if (indexName === "byIdArrayKey") {
    key = [1];
  } else {
    key = [1, "hello"];
  }

  return new Promise((resolve, reject) => {
    console.log("Getting by key", key);
    const getRequest = index.get(key);

    getRequest.onerror = (event) => reject(event);

    getRequest.onsuccess = (event) => {
      console.log(`getData from ${indexName} results`, event.target.result);
      resolve(event.target.result);
    };
  });
}

export async function getDataByKeyString() {
  return getDataByKey("byId");
}

export async function getDataByKeyArray() {
  return getDataByKey("byIdArrayKey");
}

export async function getDataByKeyComposite() {
  return getDataByKey("byIdAndTitle");
}
