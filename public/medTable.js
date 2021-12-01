// js for medicine list in dashboard page

let myform = document.getElementById("myform");
let medname = document.getElementById("medname");
let timing = document.getElementById("timing");
let frequency = document.getElementById("frequency");
let tasklist = document.getElementById("tasklist");
myform.addEventListener("submit", (x) => {
  x.preventDefault(); //prevent default action of browser after submitting ie refresh/submit form
  createitem(medname.value, timing.value, frequency.value);
});

function createitem(x, y, z) {
  /*let myhtml = `<li>${z} <button onclick="itemdeleter(this)">Done</button></li>`;*/
  let myhtml = `<tr> 
                <td>${x}</td>
                <td>${y}</td>
                <td>${z}</td>
                <td><button onclick="itemdeleter(this)" class="addMed">Done &nbsp;&nbsp;&nbsp;<i class="fas fa-prescription-bottle-alt"></i></button></td>
                </tr>`;
  
  tasklist.insertAdjacentHTML("beforeend", myhtml);
  medname.value = "";
  timing.value = "";
  frequency.value = "";
  medname.focus();
}

function itemdeleter(y) {
  y.parentElement.parentElement.remove();
}