//Initialize Firebase and get reference to the Firestore database
const auth2 = firebase.auth();


//Event listener for when activity ist posted:
const activityForm = document.getElementById("chatForm");

activityForm.addEventListener("submit", function (e) {
    e.preventDefault(); //prevent default form submission

    if (auth2.currentUser) {
        //Get Form Data:
        const message = document.getElementById("message").value;
        const receiverName = document.getElementById("receiver").value;
        
        //Get the user's UID
        const userUID = auth2.currentUser.uid;

        //Reference to the activities collection:
        const activitiesCollectionRef = db.collection("Chats");

        //Data to store in the activity document:
        const activityData = {
            message: message,
            receiverName: receiverName,
            senderId: userUID
        };


        //Add new activities document to the "Activities" collection:
        activitiesCollectionRef.add(activityData)
            .then(() => {
                activityForm.reset();

                db.collection("Users").get().then(users => {
                    users.forEach(userInfo => {
                        receiverName1 = userInfo.data().name;
                        if (receiverName == receiverName1) {
                            // Retrieve the HTML element with the ID "chatCardTemplate" and store it in the cardTemplate variable.
                            let cardTemplate = document.getElementById("chatCardTemplate");  
                            // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.
                            let newCard = cardTemplate.content.cloneNode(true); 
                           
                            //update title and location and description
                            newCard.querySelector('.card-message').innerHTML = message;
                          
                             //attach to gallery"
                            document.getElementById("chats-go-here").appendChild(newCard);

                        }

                    })
                })
            })

            .catch((error) => {
                console.error("Error adding chat: ", error);
            });

    } else {
        //If user isnt authenticated:
        console.log("User is not authenticated.");
    }
})