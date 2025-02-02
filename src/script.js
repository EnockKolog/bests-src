document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const attendeeList = document.getElementById("attendee-list");
    const confirmationMessage = document.getElementById("confirmation-message");
    constattebdeecount = doccument.getElementById("attendee-count");
    

    // Function to add name to Firestore
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();

        if (name) {
            await db.collection("attendees").add({ 
                name, 
                timestamp: firebase.firestore.FieldValue.serverTimestamp() 
            });
            nameInput.value = ""; // Clear input field
        }
    });

    // Function to update the attendee list in real-time
    db.collection("attendees").orderBy("timestamp", "asc").onSnapshot(snapshot => {
        attendeeList.innerHTML = ""; // Clear list
        let count = 0;
        snapshot.forEach(doc => {
            const listItem = document.createElement("li");
            listItem.textContent = doc.data().name;
            attendeeList.appendChild(listItem);
            count++;
        });
       
    });
});
const eventDate = new Date("February 3, 2025 06:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (timeLeft < 0) {
        document.getElementById("timer").innerHTML = "The event has started!";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);