// participants.js

function fetchAndDisplayParticipants() {
    const firestore = firebase.firestore();
    const participantsList = document.getElementById('participantsList');

    const urlParams = new URLSearchParams(window.location.search);
    const currentActivityId = urlParams.get('docID');

    const activityRef = firestore.collection("Activities").doc(currentActivityId);
    const participantsRef = activityRef.collection("participants");

    participantsRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const participantName = doc.data().name;
                const listItem = document.createElement('li');
                listItem.textContent = participantName;
                participantsList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching participants:", error);
        });
}

// Check if the element with ID "seeParticipant_btn" exists
const seeParticipantBtn = document.getElementById('seeParticipant_btn');

if (seeParticipantBtn) {
    // Listen for the click event on the "See Participants" button
    seeParticipantBtn.addEventListener('click', function () {
        // Redirect to participants.html with the currentActivityId in the query parameter
        window.location.href = `view_participants.html?docID=${currentActivityId}`;
    });
}
