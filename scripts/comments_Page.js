

//Initialize Firebase and get reference to the Firestore database
const db2 = firebase.firestore();
const auth2 = firebase.auth();
const storage = firebase.storage();

//Event listener for when activity ist posted:
const activityForm = document.getElementById("comments");

activityForm.addEventListener("submit", function(e) {
    e.preventDefault(); //prevent default form submission

    if(auth2.currentUser) {
        //Get Form Data:
        const userName = document.getElementById("name").value;
        const description = document.getElementById("comment").value;
       
        //Get the user's UID
        
        const userUID = auth2.currentUser.uid;

        //Reference to the activities collection:
        const activitiesCollectionRef = db2.collection("comments");

        //Data to store in the activity document:
        const activityData = {
            userName: userName,
            description: description,
            userID: userUID
        };


        //Add new activities document to the "Coments" collection:
        activitiesCollectionRef.add(activityData)
        .then(() => {
            //window.location.href = "thanks.html";
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