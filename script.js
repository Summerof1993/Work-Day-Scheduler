// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    const parentDiv = document.querySelector(".container-fluid");
    const hourFormatter = function (x) {
        if (x > 12) {
            x = x - 12 + " PM";
        } else {
            x = x + "AM"
        }
    };

    for (let i = 0; i < 24; i++) {

        const divElement = document.createElement("div");
        const divContent = `
        <div id="hour-${i}" data-id = "${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${i}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
        `
        divElement.innerHTML = divContent;

        let id = divElement.querySelector("[data-id]").dataset.id;
        let now = dayjs();
        console.log(id)
        if (id < now.hour()) {
            divElement.classList.add("past")
        } else if (id > now.hour()) {
            divElement.classList.add("future")
        } else {
            divElement.classList.add("present")
        }

        parentDiv.appendChild(divElement);
    }

    let divEl = document.querySelectorAll("[data-id]");
    // const saveBtn = document.querySelector(".saveBtn");
    for (let i = 0; i < divEl.length; i++) {
        divEl[i].addEventListener("click", function (event) {
            // const inputValue = document.querySelector(this);
            const saveBtn = document.querySelector(".saveBtn");
            const textareaValue = document.querySelector(".description").value;
                console.log(event.target.value);
            if(event.target === saveBtn){
                const inputValue = textareaValue;
                localStorage.setItem("id", inputValue)
            }

        })
    }

    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    const header = document.querySelector("header");
    const h3Element = document.createElement("h3");

    h3Element.textContent = "Current Time: " + dayjs().format("dddd, MMMM D YYYY, h:mm a");

    header.appendChild(h3Element);
});