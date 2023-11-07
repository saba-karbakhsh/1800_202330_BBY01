function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = user.displayName;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

function displayCreatedActivities(){
    let joinedActivities = document.getElementById("joined_activities");
    joinedActivities.style.display = "none";
    let createdActivities = document.getElementById("created_activities");
    createdActivities.style.display = "block";
}
function displayJoinedActivities(){
    let createdActivities = document.getElementById("created_activities");
    createdActivities.style.display = "none";
    let joinedActivities = document.getElementById("joined_activities");
    joinedActivities.style.display = "block";
}


