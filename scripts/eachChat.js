const auth2 = firebase.auth();


function displayChatsInfo() {
    //get docID from URL:
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    console.log(ID);



    db.collection("Users").get().then(allUsers => {
        allUsers.forEach(userInfo => {
            //Get the user's UID
            userUID = auth2.currentUser.uid;
        })


        
        db.collection("Users").doc(userUID).collection("Friends").doc(ID).collection("Chats").orderBy("timestamp").get().then(allChats => {
            allChats.forEach(chatInfo => {
                let cardTemplate = document.getElementById("eachChatCardTemplate"); // Retrieve the HTML element with the ID "chatCardTemplate" and store it in the cardTemplate variable. z
                message = chatInfo.data().message;
                senderId = chatInfo.data().senderId;
                receiverId = chatInfo.data().receiverId;


                let newCard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.

                
                newCard.querySelector('#messages').innerHTML = message;

                console.log(message);


                if (userUID == senderId) {
                    newCard.querySelector('.card').style.direction = "rtl";
                } else if (userUID == receiverId) {
                    newCard.querySelector('.card').style.direction = "ltr";
                }

                document.getElementById("eachChats-go-here").appendChild(newCard);

            })
        })



    })

}
displayChatsInfo();




function sendMessage() {

    if (auth2.currentUser) {
        let params = new URL(window.location.href);
        let ID = params.searchParams.get("docID");
        const message = document.getElementById("message").value;
        userUID = auth2.currentUser.uid;
        db.collection("Users").doc(userUID).collection("Friends").get().then(allfriends => {
            allfriends.forEach(friendInfo => {
                if (friendInfo.id == ID) {

                    receiverId2 = friendInfo.data().friendId;
                    receiverName2 = friendInfo.data().friendName;
                    const chatsData = {
                        message: message,
                        receiverName: receiverName2,
                        receiverId: receiverId2,
                        senderId: userUID,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    };
                   

                    db.collection("Users").doc(userUID).collection("Friends").doc(friendInfo.id).collection("Chats").add(chatsData)
                        .then(() => {
                            document.getElementById("chatForm").reset();
                            location.reload();
                        })

                        .catch((error) => {
                            console.error("Error adding chat: ", error);
                        });
                    db.collection("Users").doc(receiverId2).collection("Friends").get().then(allFriends2 => {
                        allFriends2.forEach(friendInfo2 => {
                            if (userUID == friendInfo2.data().friendId) {

                                db.collection("Users").doc(receiverId2).collection("Friends").doc(friendInfo2.id).collection("Chats").add(chatsData);
                            }
                        })
                    })
                }
            })


        })

    } else {
        //If user isn't authenticated:
        console.log("User is not authenticated.");
    }
}