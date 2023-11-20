//Initialize Firebase and get reference to the Firestore database
const db2 = firebase.firestore();
const auth2 = firebase.auth();


//Event listener for when activity ist posted:
const activityForm = document.getElementById("postActivityForm");

activityForm.addEventListener("submit", function(e) {
    //prevent default form submission
    e.preventDefault(); 

    if(auth2.currentUser) {
        //Get Form Data:
        const title = document.getElementById("Activity_Title").value;
        const description = document.getElementById("Activity_Description").value;
        const category = document.getElementById("CategorySelect").value;
        const datetime = document.getElementById("DateTime").value;
        const maxParticipants = document.getElementById("maxParticipants").value;
        const location = document.getElementById("Location").value;
        

        //Get the user's UID
        
        const userUID = auth2.currentUser.uid;

        //Reference to the activities collection:
        const activitiesCollectionRef = db2.collection("Activities");

        //Data to store in the activity document:
        const activityData = {
            title: title,
            description: description,
            category: category,
            datetime: datetime,
            max_Participants: maxParticipants,
            location: location,
            userID: userUID
        };


        //Add new activities document to the "Activities" collection:
        activitiesCollectionRef.add(activityData)
        .then(() => {
            window.location.href = "thanks.html";
            
            activityForm.reset();
        })

        .catch((error) => {
            console.error("Error adding activity: ", error);
        });

    } else {
        //If user isnt authenticated:
        console.log("User is not authenticated.");
    }
})