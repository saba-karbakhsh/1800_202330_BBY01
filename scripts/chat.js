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
        userUID = auth2.currentUser.uid;
        console.log(userUID);
        //Reference to the activities collection:
        const chatsCollectionRef = db.collection("Chats");

        db.collection("Users").get().then(users => {
            users.forEach(userInfo => {
                str = userInfo.data().name;
                if (receiverName == str) {
                    receiverId2 = userInfo.id;
                    //Data to store in the activity document:
                    const chatsData = {
                        message: message,
                        receiverName: receiverName,
                        receiverId: receiverId2,
                        senderId: userUID
                    };
                    //Add new activities document to the "Activities" collection:
                    chatsCollectionRef.add(chatsData)
                        .then(() => {
                            activityForm.reset();
            
                        })
            
                        .catch((error) => {
                            console.error("Error adding chat: ", error);
                        });
                }
            });
        })

    } else {
        //If user isnt authenticated:
        console.log("User is not authenticated.");
    }

})




function displayChats(collection) {
    let cardTemplate = document.getElementById("chatCardTemplate"); // Retrieve the HTML element with the ID "activityCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "Activities"
        .then(allChats => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allChats.forEach(doc => { //iterate thru each doc
                var message = doc.data().message;       // get value of the "title" key
                var receiverId = doc.data().receiverId;  // get value of the "description" key
                var receiverName = doc.data().receiverName;    // get value of the "location" key
                var senderId = doc.data().senderId; // get value of the "location" key
                
                let newCard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.
               
                //update title and location and description
                newCard.querySelector('.card-message').innerHTML = message;
                
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery"
                console.log(senderId);
                if(auth2.currentUser.uid == senderId || auth2.currentUser.uid == receiverId){
                    document.getElementById("chats-go-here").appendChild(newCard);

                }
                

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayChats("Chats");  //input param is the name of the collection