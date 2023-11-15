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

//Took it out because it didn't need to be inside the function
const joinedActivities = document.getElementById("joined_activities");
const createdActivities = document.getElementById("created_activities");

function displayCreatedActivities(){
    joinedActivities.style.display = "none";
    createdActivities.style.display = "block";
}
function displayJoinedActivities(){
    createdActivities.style.display = "none";
    joinedActivities.style.display = "block";
}

//Displays all activities
function displayAllActivities(){
    createdActivities.style.display = "block";
    joinedActivities.style.display = "block";
}

/**
 * This section below iterates through the activities collection
 * then it checks if its what the user has posted if it is get the data
 * and display it into their profile
 */

function getPostedActivities (collection) {
    //retrieves the div where we will replace each card of the template
    let cardTemplate = document.getElementById("activityCardTemplate");

    db.collection(collection).get()  
        .then((allActivities) => {

            //var i = 1;  //Optional: if you want to have a unique ID for each hike

            allActivities.forEach(doc => { //iterate thru each document in the specified collection
                
                //store the current document id and userID
                var userID = doc.data().userID;

                if(firebase.auth().currentUser.uid == userID){
                    console.log("User matches \n");
                    //Stores each data field into a var
                    var title = doc.data().title;      
                    var description = doc.data().description;  
                    var datetime = doc.data().datetime;    
                    var location = doc.data().location; 
                    var category =  doc.data().category;
                    var docID = doc.id;

                    // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                    let newCard = cardTemplate.content.cloneNode(true);
                    
                    //fill the corresponding sections with its correct data
                    newCard.querySelector('.card-title').innerHTML = title;
                    newCard.querySelector('.card-location').innerHTML = location;
                    newCard.querySelector('.card-text').innerHTML = description;
                    newCard.querySelector('.card-datetime').innerHTML = datetime;
                    newCard.querySelector('a').href = "eachActivity.html?docID=" + docID; 

                    //gets the element with created activities and adds the template and its proper contents to the posted section
                    document.getElementById("created_activities").appendChild(newCard);

                }else {
                    console.log("User name not a match");
                }

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);


                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

//the paramater is the collection we will be sifting through
getPostedActivities("Activities"); 


function getJoinedActivities(collection) {
    //retrieves the div where we will replace each card of the template
    let cardTemplate = document.getElementById("activityCardTemplate");

    db.collection(collection).get()
        .then((allActivities) => {

            //var i = 1;  //Optional: if you want to have a unique ID for each hike



            allActivities.forEach(doc => { //iterate thru each document in the specified collection

                const firestore = firebase.firestore();

                const urlParams = new URLSearchParams(window.location.search);
                const currentActivityId = doc.id;

                const activityRef = firestore.collection("Activities").doc(currentActivityId);
                const participantsRef = activityRef.collection("participants");

                participantsRef.get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {
                            
                            if (firebase.auth().currentUser.uid == doc1.id) {
                                console.log("User matches \n");
                                //Stores each data field into a var
                                var title = doc.data().title;
                                var description = doc.data().description;
                                var datetime = doc.data().datetime;
                                var location = doc.data().location;
                                var category = doc.data().category;
                                var docID = doc.id;
            
                                // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                                let newCard = cardTemplate.content.cloneNode(true);
            
                                //fill the corresponding sections with its correct data
                                newCard.querySelector('.card-title').innerHTML = title;
                                newCard.querySelector('.card-location').innerHTML = location;
                                newCard.querySelector('.card-text').innerHTML = description;
                                newCard.querySelector('.card-datetime').innerHTML = datetime;
                                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;
            
                                //gets the element with created activities and adds the template and its proper contents to the posted section
                                document.getElementById("joined_activities").appendChild(newCard);
            
                            } else {
                                console.log("User name not a match");
                            }
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching participants:", error);
                    });



                

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);


                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

//the paramater is the collection we will be sifting through
getJoinedActivities("Activities"); 