// TODO
let data = [];
window.onload = () => {
  if (localStorage.allData) {
    data = JSON.parse(localStorage.getItem("allData"));
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("allData")).length;
      i++
    ) {
      createDataDiv(
        JSON.parse(localStorage.getItem("allData"))[i].data,
        data[i].id
      );
    }
  }
};

let textVal = document.querySelector("input[type = text]");
document.querySelector("input[type = submit]").addEventListener("click", () => {
  if (textVal.value !== "") {
    let obj = { id: parseInt(Date.now() * Math.random()), data: textVal.value };
    data.push(obj);
    localStorage.setItem("allData", JSON.stringify(data));
    createDataDiv(textVal.value, obj.id);
    document.querySelector("input[type = text]").value = "";
    document.querySelector("input[type = text]").focus();
  } else {
    console.log("Task is empty");
  }
});

function createDataDiv(val, id) {
  let dataDiv = document.createElement("div");
  let p = document.createElement("p");
  let delBtn = document.createElement("input");
  let text = document.createTextNode(val);
  let tasks = document.querySelector(".tasks");

  p.style.cssText = "font-size: 20px; padding-left: 10px; font-weight: bold";
  p.appendChild(text);
  delBtn.setAttribute("type", "button");
  delBtn.setAttribute("value", "Delete");
  delBtn.setAttribute("id", id);
  delBtn.style.cssText =
    "background-color: red; color: white; border-radius: 5px; font-size: 20px; cursor: pointer; border-width: 0; margin: 5px;";
  dataDiv.setAttribute("class", "data");
  dataDiv.style.cssText =
    "background-color: white; width: 80%; margin: auto; border-radius: 5px;display: flex; justify-content: space-between;";
  dataDiv.appendChild(p);
  dataDiv.appendChild(delBtn);
  tasks.style.setProperty(
    "height",
    (data.length != 0 ? data.length : 1) * 80 + "px"
  );

  tasks.appendChild(dataDiv);
}

document.addEventListener("click", (e) => {
  if (Number.parseInt(e.target.id)) {
    for (let i = 0; i < data.length; i++) {
      if (e.target.id == data[i].id) {
        document.getElementById(e.target.id).parentElement.remove();
        data.splice(i, 1);
        localStorage.allData = JSON.stringify(data);
        document
          .querySelector(".tasks")
          .style.setProperty(
            "height",
            (data.length != 0 ? data.length : 1) * 80 + "px"
          );
      }
    }
  }
});
