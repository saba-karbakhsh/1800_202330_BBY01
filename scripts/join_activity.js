// Function to get the activity ID from the current URL
const urlParams = new URLSearchParams(window.location.search);
const currentActivityId = urlParams.get('docID');
console.log("Activity ID: ", currentActivityId);

// Now we can use currentActivityId in the joinActivity function
const auth3 = firebase.auth();
const firestore3 = firebase.firestore();

// Function to handle joining an activity
function joinActivity() {
  
  // Get the current user
  const currentUser = auth3.currentUser;

  // Check if a user is authenticated
  if (currentUser) {
    // Reference to the activity document
    const activityRef = firestore3.collection("Activities").doc(currentActivityId);

    // Reference to the participants subcollection
    const participantsRef = activityRef.collection("participants");

    const currentUserUID = currentUser.uid;
    const userNameRef = firestore3.collection("Users").doc(currentUserUID);

    // Declare userName outside the block
    let userName;

    // Retrieve the user's name
    userNameRef.get().then((doc) => {
      if (doc.exists) {
        // Access the user's name from the document data
        userName = doc.data().name;
        console.log("User's Name:", userName);

        // Add the current user to the participants subcollection
        participantsRef.doc(currentUser.uid).set({
          name: userName
        }).then(() => {
          console.log("User joined the activity!");
        }).catch((error) => {
          console.error("Error joining activity:", error);
        });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.error("Error getting user document:", error);
    });

  } else {
    console.error("User not authenticated.");
    
  }

  window.location.href = "joined_successfully.html";
}


