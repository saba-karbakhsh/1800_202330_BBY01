function setsUserIDurl() {
    document.addEventListener('DOMContentLoaded', function () {
        //get UserID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        if (userId) {
            // Call the functions to retrieve and display activities for the specified user
            getPostedActivities("Activities", userId);
            getJoinedActivities("Activities", userId);
            getFriends("Users", userId);

            // Also retrieve and display user profile information
            getUserProfile(userId);
        } else {
            console.error('User ID not found in the URL');
        }
    });
}
setsUserIDurl();

function getUserProfile(userId) {
    // Get the user profile document from Firestore
    const userProfileRef = db.collection("Users").doc(userId);

    userProfileRef.get().then(userDoc => {
        try {
            if (userDoc.exists) {
                // Get user data
                const userName = userDoc.data().name;
                const profilePicUrl = userDoc.data().profilePic;

                // Display user data in the HTML elements
                document.getElementById("name-goes-here").innerText = userName;

                if (profilePicUrl) {
                    $("#mypic-goes-here").attr("src", profilePicUrl);
                }
            } else {
                console.error('User profile not found in Firestore');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    })
}

// Gets users posted activities and displays it on profile
function getPostedActivities(collection, userId) {
    const cardTemplate = document.getElementById("activityCardTemplate");
    const createdActivities = document.getElementById("created_activities");

    db.collection(collection).get()
        .then((allActivities) => {
            allActivities.forEach(doc => {
                var userID = doc.data().userID;

                if (userId == userID) {
                    var title = doc.data().title;
                    var description = doc.data().description;
                    var datetime = doc.data().datetime;
                    var location = doc.data().location;
                    var docID = doc.id;

                    //convert the dates to a Date object then convert to UTC string
                    var localDate = new Date(datetime);
                    var dateString = localDate.toUTCString();

                    //Store the time to add in AM and PM
                    var dateTime = localDate.toLocaleTimeString();
                    // split the strings between the first half and the half after "GMT"
                    var newStringDate = dateString.split(" ");
                    var day = newStringDate[0]
                    var month = newStringDate[2];
                    var monthNum = newStringDate[1];
                    var year = newStringDate[3];
          
                    var dateFormat = day + " " + month + " " +  monthNum  + " " + year;

                    let newCard = cardTemplate.content.cloneNode(true);

                    newCard.querySelector('.card-title').innerHTML = title;
                    newCard.querySelector('.card-location').innerHTML = "Location: " + location;
                    newCard.querySelector('.card-text').innerHTML = description;
                    newCard.querySelector('.card-datetime').innerHTML = "When: " + dateFormat + " " + dateTime;
                    newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;
                    newCard.querySelector('.deleteBtn').onclick = () => deletePost(docID, title);

                    let deletebtn = newCard.querySelector('.deleteBtn');
                    if (authRef.currentUser.uid == userID) {
                        deletebtn.style.display = "block";
                    } else {
                        deletebtn.style.display = "none";
                    }

                    createdActivities.appendChild(newCard);
                }
            });
        })
}

// Gets the Activities ID and prompts user to delete or not
function deletePost(ActivityIDRef, title) {
    // Get the delete forum and overlay
    document.getElementById("activity-name").innerHTML = "&quot;" + title + "&quot;";

    //Get overlay & deleteForum elems
    let deleteForum = document.getElementById("deleteConfirmation");
    let finalConfirm = document.getElementById("finalConfirmation");
    let overlay = document.getElementById("overlay");

    let confirmBtn = document.getElementById("confirmBtn");
    let cancelBtn = document.getElementById("cancelBtn");

    let finalConfirmBtn = document.getElementById("finalConfirm");
    let finalCancelBtn = document.getElementById("finalCancel");

    //If user is logged perform the confirm deletion pop ups
    if (authRef.currentUser) {
        deleteForum.style.display = "block";
        overlay.style.display = "block";

        //Two confirmation to delete the button
        confirmBtn.addEventListener("click", function (e) {
            deleteForum.style.display = "none";
            finalConfirm.style.display = "block";

            finalConfirmBtn.addEventListener("click", function (e) {
                db.collection("Activities")
                    .doc(ActivityIDRef)
                    .collection("participants")
                    .doc()
                    .delete()
                    .then(() => {
                        db.collection("Activities")
                            .doc(ActivityIDRef)
                            .delete()
                            .then(() => {
                                finalConfirm.style.display = "none";
                                overlay.style.display = "none";
                                window.location.reload();
                            });
                    });
            });

            finalCancelBtn.addEventListener("click", function (e) {
                overlay.style.display = "none";
                finalConfirm.style.display = "none";
            })

        })

        //When clicking cancel or outside of forum it will close the delete forum
        overlay.addEventListener("click", function (e) {
            overlay.style.display = "none";
            deleteForum.style.display = "none";
        })

        cancelBtn.addEventListener("click", function (e) {
            overlay.style.display = "none";
            deleteForum.style.display = "none";
            finalConfirm.style.display = "none";
        })

    } else {
        console.log("No user is logged in")
    }
}

// Gets activities joined and displays on profile
function getJoinedActivities(collection, userId) {
    const cardTemplate = document.getElementById("activityCardTemplate");
    const joinedActivities = document.getElementById("joined_activities");

    db.collection(collection).get()
        .then((allActivities) => {
            allActivities.forEach(doc => {
                const currentActivityId = doc.id;
                const participantsRef = db.collection("Activities").doc(currentActivityId).collection("participants");

                participantsRef.get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {
                            if (userId == doc1.id) {
                                const title = doc.data().title;
                                const description = doc.data().description;
                                const datetime = doc.data().datetime;
                                const location = doc.data().location;
                                const docID = doc.id;

                                //convert the dates to a Date object then convert to UTC string
                                var localDate = new Date(datetime);
                                var dateString = localDate.toUTCString();

                                //Store the time to add in AM and PM
                                var dateTime = localDate.toLocaleTimeString();
                                // split the strings between the first half and the half after "GMT"
                                var newStringDate = dateString.split(" ");
                                var day = newStringDate[0]
                                var month = newStringDate[2];
                                var monthNum = newStringDate[1];
                                var year = newStringDate[3];
          
                                var dateFormat = day + " " + month + " " +  monthNum  + " " + year;

                                let newCard = cardTemplate.content.cloneNode(true);

                                newCard.querySelector('.card-title').innerHTML = title;
                                newCard.querySelector('.card-location').innerHTML = "Location: " + location;
                                newCard.querySelector('.card-text').innerHTML = description;
                                newCard.querySelector('.card-datetime').innerHTML = "When: " + dateFormat + " " + dateTime;
                                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                                joinedActivities.appendChild(newCard);
                            }
                        });
                    })
            });
        })
}

// Display functions for the buttons
function displayCreatedActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");
    const myFriends = document.getElementById("myFriends");

    joinedActivities.style.display = "none";
    myFriends.style.display = "none";
    createdActivities.style.display = "block";
}

function displayJoinedActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");
    const myFriends = document.getElementById("myFriends");

    createdActivities.style.display = "none";
    myFriends.style.display = "none";
    joinedActivities.style.display = "block";
}

function displayAllActivities() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");
    const myFriends = document.getElementById("myFriends");

    createdActivities.style.display = "block";
    myFriends.style.display = "none";
    joinedActivities.style.display = "block";
}

function displayFriends() {
    const joinedActivities = document.getElementById("joined_activities");
    const createdActivities = document.getElementById("created_activities");
    const myFriends = document.getElementById("myFriends");

    createdActivities.style.display = "none";
    myFriends.style.display = "block";
    joinedActivities.style.display = "none";
}


document.getElementById("chooseFile").style.display = "none";
function setProfile() {
    document.getElementById("chooseFile").style.display = "block";
}


// adding friends function
function addFriends() {
    const urlParams = new URLSearchParams(window.location.search);
    const friendId = urlParams.get('userId');
    const auth2 = firebase.auth();
    userUID = auth2.currentUser.uid;
    db.collection("Users").doc(userUID).collection("Friends").get().then(myFriends =>{
        myFriends.forEach(myFriendsInfo =>{
           if(myFriendsInfo.data().friendId != friendId){
            db.collection("Users").doc(friendId).get().then(userInfo => {
                friendName = userInfo.data().name;
        
                //Data to store in the Friends document:
                const friendsData = {
                    friendId: friendId,
                    friendName: friendName
                };
                db.collection("Users").doc(userUID).collection("Friends").add(friendsData)
                    .then(() => {
                        console.log("friend added!");
                    })
        
                    .catch((error) => {
                        console.error("Error adding chat: ", error);
                    });
                db.collection("Users").doc(userUID).get().then(myInfo => {
        
                    db.collection("Users").doc(friendId).collection("Friends").add({
                        friendId: userUID,
                        friendName: myInfo.data().name
                    })
                })
            })
           } else{
            alert("You have already added this person!");
           }
        })
    })
    

}





function getFriends(collection, userId) {
    const friendsList = document.getElementById('firendsList');

    db.collection(collection).doc(userId).collection("Friends").get()
        .then((allMyFriends) => {
            allMyFriends.forEach(doc => {

                var friendName = doc.data().friendName;
                var friendId = doc.data().friendId;
                // Create a list item
                const listItem = document.createElement('li');

                listItem.setAttribute("class", "list-group-item");
                // Create a link for each friend with the user ID in the URL
                const participantLink = document.createElement('a');
                participantLink.href = `user_home_page.html?userId=${friendId}`;
                participantLink.innerText = friendName; // Replace with the actual field name

                // Append the link to the list item
                listItem.appendChild(participantLink);

                // Append the list item to the friend list
                friendsList.appendChild(listItem);

            });
        })
}

db.collection("Users").get().then(allUsers => {
    allUsers.forEach(userInfo => {

        const auth2 = firebase.auth();
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        //Get the user's UID
        userUID = auth2.currentUser.uid;
        if(userUID == userId){
            document.getElementById("addAsFriend").style.display = "none";
        }
    })
})
