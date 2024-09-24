import { APP_NAME } from "./constants";

let storedString = localStorage.getItem(APP_NAME)
let storedObject;
if (storedString) {
  storedObject = JSON.parse(storedString)
}

export default storedObject