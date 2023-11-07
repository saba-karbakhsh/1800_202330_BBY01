//Initialize Firebase and get reference to the Firestore database
const db2 = firebase.firestore();
const auth2 = firebase.auth();
const storage = firebase.storage();

//Event listener for when activity ist posted:
const activityForm = document.getElementById("postActivityForm");

activityForm.addEventListener("submit", function(e) {
    e.preventDefault(); //prevent default form submission

    if(auth2.currentUser) {
        //Get Form Data:
        const title = document.getElementById("Activity_Title").value;
        const description = document.getElementById("Activity_Description").value;
        const category = document.getElementById("CategorySelect").value;
        const datetime = document.getElementById("DateTime").value;
        const location = document.getElementById("Location").value;
        const imageFile = document.getElementById("ActivityImage").files[0];

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
            location: location,
            userID: userUID
        };


        //Add new activities document to the "Activities" collection:
        activitiesCollectionRef.add(activityData)
        .then(() => {
            window.location.href = "thanks.html";
            //console.log("Activity added with ID: ", activityDocRef.id);

            //Upload image to the Firebase Storage
            //const imageRef = storage.ref('activityImages/${activityDocRef.id}');
            //const imageUpload = imageRef.put(imageFile);

            //imageUpload.then((snapshot) => {
            //   console.log("Image uploaded successfully!");

                //Reset form after submission:
            //    activityForm.reset();
            //}).catch((error) => {
            //    console.error("Error uploading image:", error);
           // });
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