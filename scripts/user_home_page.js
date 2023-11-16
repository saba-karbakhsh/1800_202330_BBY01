document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        // Call the functions to retrieve and display activities for the specified user
        getPostedActivities("Activities", userId);
        getJoinedActivities("Activities", userId);

        // Also retrieve and display user profile information
        getUserProfile(userId);
    } else {
        console.error('User ID not found in the URL');
    }
});

function getUserProfile(userId) {
    // Get the user profile document from Firestore
    const userProfileRef = db.collection("Users").doc(userId);

    userProfileRef.get().then(userDoc => {
        if (userDoc.exists) {
            // Get user data
            const userName = userDoc.data().name;
            const profilePicUrl = userDoc.data().profilePic;

            // Display user data in the HTML elements
            document.getElementById("name-goes-here").innerText = userName;

            if (profilePicUrl) {
                $("#mypic-goes-here").attr("src", profilePicUrl);
            }
        } else {
            console.error('User profile not found in Firestore');
        }
    }).catch(error => {
        console.error('Error fetching user profile:', error);
    });
}

function getPostedActivities(collection, userId) {
    const cardTemplate = document.getElementById("activityCardTemplate");
    const createdActivities = document.getElementById("created_activities");

    db.collection(collection).get()
        .then((allActivities) => {
            allActivities.forEach(doc => {
                var userID = doc.data().userID;

                if (userId == userID) {
                    const title = doc.data().title;
                    const description = doc.data().description;
                    const datetime = doc.data().datetime;
                    const location = doc.data().location;
                    const docID = doc.id;

                    let newCard = cardTemplate.content.cloneNode(true);

                    newCard.querySelector('.card-title').innerHTML = title;
                    newCard.querySelector('.card-location').innerHTML = location;
                    newCard.querySelector('.card-text').innerHTML = description;
                    newCard.querySelector('.card-datetime').innerHTML = datetime;
                    newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                    createdActivities.appendChild(newCard);
                }
            });
        })
}

function getJoinedActivities(collection, userId) {
    const cardTemplate = document.getElementById("activityCardTemplate");
    const joinedActivities = document.getElementById("joined_activities");

    db.collection(collection).get()
        .then((allActivities) => {
            allActivities.forEach(doc => {
                const currentActivityId = doc.id;
                const participantsRef = db.collection("Activities").doc(currentActivityId).collection("participants");

                participantsRef.get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {
                            if (userId == doc1.id) {
                                const title = doc.data().title;
                                const description = doc.data().description;
                                const datetime = doc.data().datetime;
                                const location = doc.data().location;
                                const docID = doc.id;

                                let newCard = cardTemplate.content.cloneNode(true);

                                newCard.querySelector('.card-title').innerHTML = title;
                                newCard.querySelector('.card-location').innerHTML = location;
                                newCard.querySelector('.card-text').innerHTML = description;
                                newCard.querySelector('.card-datetime').innerHTML = datetime;
                                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                                joinedActivities.appendChild(newCard);
                            }
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching participants:", error);
                    });
            });
        })
}

// Display functions for the buttons
function displayCreatedActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");

    joinedActivities.style.display = "none";
    createdActivities.style.display = "block";
}

function displayJoinedActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");

    createdActivities.style.display = "none";
    joinedActivities.style.display = "block";
}

function displayAllActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");

    createdActivities.style.display = "block";
    joinedActivities.style.display = "block";
}
