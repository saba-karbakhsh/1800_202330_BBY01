// Function to get the activity ID from the current URL
const urlParams = new URLSearchParams(window.location.search);
const currentActivityId = urlParams.get('docID');
console.log("Activity ID: ", currentActivityId);

// Now we can use currentActivityId in the joinActivity function
const auth3 = firebase.auth();
const firestore3 = firebase.firestore();

// Function to handle joining an activity
async function joinActivity() {
    console.log("Started function");
  
    const currentUser = auth3.currentUser;
  
    if (currentUser) {
      const activityRef = firestore3.collection("Activities").doc(currentActivityId);
      const participantsRef = activityRef.collection("participants");
      const currentUserUID = currentUser.uid;
      const userNameRef = firestore3.collection("Users").doc(currentUserUID);
  
      try {
        const doc = await userNameRef.get();
  
        if (doc.exists) {
          const userName = doc.data().name;
          console.log("User's Name:", userName);
  
          await participantsRef.doc(currentUser.uid).set({
            name: userName
          });
  
          console.log("User joined the activity!");
          // Redirect after the user has joined the activity
          window.location.href = "joined_successfully.html";
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("User not authenticated.");
    }
  }
  