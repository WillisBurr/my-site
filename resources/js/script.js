document.getElementById("event_form").addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        this.reportValidity(); // Shows native validation messages
        return;
    }

    event.preventDefault(); // Prevent actual form submit
    saveEvent();
});
updateLocationOptions(document.getElementById("event_modality").value);

// let eventModal = document.getElementById("event_modal");
// const bootstrapModal = bootstrap.Modal.getOrCreateInstance(eventModal);

function updateLocationOptions(modality) {
    const locationGroup = document.getElementById("event_location_group");
    const remoteUrlGroup = document.getElementById("event_remote_url_group");

    const locationInput = document.getElementById("event_location");
    const eventUrlInput = document.getElementById("event_remote_url");

    locationGroup.classList.add("d-none");
    remoteUrlGroup.classList.add("d-none");

    eventUrlInput.removeAttribute("required");
    locationInput.removeAttribute("required");

    

    if (modality === "In-Person") {
        locationGroup.classList.remove("d-none");
        locationInput.setAttribute("required", "required");

    }
    else if (modality === "Remote") {
        remoteUrlGroup.classList.remove("d-none");
        eventUrlInput.setAttribute("required", "required");
    }
    else {
        return;
    }
}

function saveEvent() {

    if (!(document.getElementById('event_form').checkValidity())) {
        return;
    }

    const eventDetails = {
        name: document.getElementById("event_name").value, // name of the event from the form,
        category: document.getElementById("event_category").value, // category of the event from the form,
        weekday: document.getElementById("event_weekday").value, //weekday of the event from the form,
        time: document.getElementById("event_time").value, //time of the event from the form,
        modality: document.getElementById("event_modality").value, //modality of the event from the form,
        location: document.getElementById("event_location").value, //if the modality is "In-person" then this has a value and remote_url is null,
        remote_url: document.getElementById("event_remote_url").value, //if the modality is "Remote" then this has a value location is null,
        attendees: document.getElementById("event_attendees").value //list of attendees from the form
    };

    console.log(eventDetails.name);
    console.log(eventDetails.category);
    console.log(eventDetails.weekday);
    console.log(eventDetails.time);
    console.log(eventDetails.modality);

    if (eventDetails.modality === "In-Person") {
        console.log(eventDetails.location);
    }
    else {
        console.log(eventDetails.remote_url);
    }
    console.log(eventDetails.attendees);
    
    addEventToCalendarUI(eventDetails);

    document.getElementById('event_form').reset();
    // bootstrapModal.hide();
}

function addEventToCalendarUI(eventDetails) {
    let wkdayElement = document.getElementById(eventDetails.weekday);
    console.log(wkdayElement);
    let eventCard = createEventCard(eventDetails);
    wkdayElement.appendChild(eventCard);
}

function createEventCard(eventDetails) {
    const categoryColors = {
        "Academic": "lightblue",
        "Work": "lightgray",
        "Exercise": "lightpink", 
        "Fun": "lightpurple",
        "Friends": "lightorange", 
        "Shopping": "lightgreen",
        "Other": "peru"
    };

    
    let event_element = document.createElement('div');
    event_element.style.backgroundColor = categoryColors[eventDetails.category];
    event_element.classList = 'event row border rounded m-1 py-1';

    let info = document.createElement("div");
    if (eventDetails.modality === "In-Person") {
        info.innerHTML = `<b>Event Name:</b>
                      <br>${eventDetails.name}
                      <br><b>Event Time:</b>
                      <br>${eventDetails.time}
                      <br><b>Event Modality:</b>
                      <br>${eventDetails.modality}
                      <br><b>Event Location:</b>
                      <br>${eventDetails.location}
                      <br><b>Event Attendees:</b>
                      <br>${eventDetails.attendees}`;
    }
    else {
        info.innerHTML = `<b>Event Name:</b>
                      <br>${eventDetails.name}
                      <br><b>Event Time:</b>
                      <br>${eventDetails.time}
                      <br><b>Event Modality:</b>
                      <br>${eventDetails.modality}
                      <br><b>Event Link:</b>
                      <br>${eventDetails.remote_url}
                      <br><b>Event Attendees:</b>
                      <br>${eventDetails.attendees}`;
    }

    event_element.appendChild(info);

    return event_element;
}
 /*
 <div class='event row border rounded m-1 py-1'>
    <div>
        Event details
    </div>
 </div>
 */