import "./style.css";
import {
  openDB,
  deleteDB,
  saveData,
  getAllData,
  getDataByKeyString,
  getDataByKeyArray,
  getDataByKeyComposite,
} from "./idb";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>IndexedDB Test</h1>
    <div class="card">
      <button id="openDB" type="button">Open DB</button>
      <button id="deleteDB" type="button">Delete DB</button>
      <button id="saveData" type="button">Save Data</button>
      <button id="getAllData" type="button">Get All Data</button>
      <button id="getDataByKeyString" type="button">Get Data By Key String</button>
      <button id="getDataByKeyArray" type="button">Get Data By Key Array</button>
      <button id="getDataByKeyComposite" type="button">Get Data By Composite Key</button>
    </div>
  </div>
`;

function eventHandlers() {
  document.querySelector("#openDB").addEventListener("click", () => openDB());
  document
    .querySelector("#deleteDB")
    .addEventListener("click", () => deleteDB());
  document
    .querySelector("#saveData")
    .addEventListener("click", () => saveData());
  document
    .querySelector("#getAllData")
    .addEventListener("click", () => getAllData());
  document
    .querySelector("#getDataByKeyString")
    .addEventListener("click", () => getDataByKeyString());
  document
    .querySelector("#getDataByKeyArray")
    .addEventListener("click", () => getDataByKeyArray());
  document
    .querySelector("#getDataByKeyComposite")
    .addEventListener("click", () => getDataByKeyComposite());
}

eventHandlers();
