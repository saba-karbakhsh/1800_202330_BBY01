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
        console.log(message);

        //Get the user's UID
        userUID = auth2.currentUser.uid;


        db.collection("Users").get().then(users => {
            users.forEach(userInfo => {
                str = userInfo.data().name;
                if (receiverName == str) {
                    receiverId2 = userInfo.id;

                    //Data to store in the chats document:
                    const chatsData = {
                        message: message,
                        receiverName: receiverName,
                        receiverId: receiverId2,
                        senderId: userUID
                    };
                    //Add new activities document to the "Chats" collection:

                    db.collection("Users").doc(userUID).collection("Friends").get().then(allFriends => {
                        allFriends.forEach(friendInfo => {

                            if (friendInfo.data().friendId == receiverId2) {
                                db.collection("Users").doc(userUID).collection("Friends").doc(friendInfo.id).collection("Chats").add(chatsData)
                                    .then(() => {
                                        activityForm.reset();
                                    })

                                    .catch((error) => {
                                        console.error("Error adding chat: ", error);
                                    });

                            }
                        })
                    })
                    db.collection("Users").doc(receiverId2).collection("Friends").get().then(allFriends2 => {
                        allFriends2.forEach(friendInfo2 => {
                            if (userUID == friendInfo2.data().friendId) {

                                db.collection("Users").doc(receiverId2).collection("Friends").doc(friendInfo2.id).collection("Chats").add(chatsData);
                            }
                        })
                    })
                }
            });
        })

    } else {
        //If user isn't authenticated:
        console.log("User is not authenticated.");
    }

});
