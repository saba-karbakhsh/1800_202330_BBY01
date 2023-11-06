function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here:
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;
        } else {
            // No user is signed in.
        }
    });
}
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


