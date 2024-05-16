// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    const parentDiv = $(".container-fluid");


    // what do you want to do:
    //1. grab the button's parent element
    //2. grab the value from the data attribute that belongs to the id (data-id) to grab the hour and a way to reference the div
    //3. grab the value from the text field of the div that triggered the event
    //4. save the value from the text field to local storage as the data-id of the div

    //this in the event handler function refers to event.currentTarget or the element to
    //which the event handler was attached (in this case the element with class "saveBtn")
    //this and event.currentTarget are interchangeable in this case

    var handleSaveEvent = function (event) {
        console.log("this is the currentTarget's parentElement", this.parentElement);

        const parentEl = event.currentTarget.parentElement;

        const id = parentEl.dataset.id;

        const inputValue = $(parentEl).children(".description").val().trim();

        console.log(inputValue);

        if (inputValue !== "") {
            saveToLocalStorage(id, inputValue);
            setItemsFromLocalStorage();
        } else {
            alert("Input value is empty. Type something.")
        }
    }

    parentDiv.on("click", ".saveBtn", handleSaveEvent);

    const saveToLocalStorage = function (id, inputValue) {
        localStorage.setItem(id, inputValue)
    }

    // Code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. Use the id
    // attribute of each time-block to conditionally add or remove the
    // past, present, and future classes. Using dayJS to get current hour and
    // using an hourFormatter function to format time although it could also be done with dayJS
    const hourFormatter = function (i) {
        if (i === 0) {
            i = 12 + " AM"
        } else if (i === 12) {
            i = 12 + " PM"
        } else if (i > 12) {
            i = i - 12 + " PM";
        } else {
            i = i + " AM"
        }
        return i;
    };

    for (let i = 9; i <= 17; i++) {

        const divElement = document.createElement("div");
        const divContent = `
     <div id="hour-${i}" data-id = "${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${hourFormatter(i)}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
        `
        divElement.innerHTML = divContent;

        let id = divElement.querySelector("[data-id]").dataset.id;
        let now = dayjs();
        if (id < now.hour()) {
            divElement.classList.add("past")
        } else if (id > now.hour()) {
            divElement.classList.add("future")
        } else {
            divElement.classList.add("present")
        }

        parentDiv.append(divElement);
    }

    // code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. Use the id
    // attribute of each time-block to cross reference the keys in local storage. eg. keys[i] = data-i
    const setItemsFromLocalStorage = function () {

        const keys = Object.keys(localStorage);
        console.log(keys);

        for (let i = 0; i < keys.length; i++) {
            const value = localStorage.getItem(keys[i]);
            console.log(value);

            const targetedDiv = document.getElementById(`hour-${keys[i]}`)

            $(targetedDiv).children(".description").text(value);
        }

    }

    setItemsFromLocalStorage();



    //code to display the current date in the header of the page, set interval to run displayTime function every 1 second
    const header = document.querySelector("header");
    const h3Element = document.createElement("h3");

    header.appendChild(h3Element);

    var displayTime = function () {
        h3Element.textContent = "Current Time: " + dayjs().format("dddd, MMMM D YYYY, h:mm:ss a");
    }

    displayTime();

    setInterval(displayTime, 1000)
});