const auth2 = firebase.auth();

function displayChats(collection) {


    let cardTemplate = document.getElementById("chatCardTemplate"); // Retrieve the HTML element with the ID "chatCardTemplate" and store it in the cardTemplate variable. z

    db.collection(collection).get().then(allUsers => {
        allUsers.forEach(userInfo => {
            //Get the user's UID
            userUID = auth2.currentUser.uid;
        })

        db.collection(collection).doc(userUID).collection("Friends").get().then(allMyFriends => {
            allMyFriends.forEach(myFriendsInfo => {
                db.collection(collection).doc(userUID).collection("Friends").doc(myFriendsInfo.id).collection("Chats").get().then(chats => {
                    if (!chats.empty) {

                        var receiverName = myFriendsInfo.data().friendName;
                        let newCard = cardTemplate.content.cloneNode(true);

                        var docID = myFriendsInfo.id;

                        newCard.querySelector('.card-title').innerHTML = receiverName;
                        newCard.querySelector('a').href = "eachChat.html?docID=" + docID;

                        document.getElementById("chats-go-here").appendChild(newCard);

                    }

                })
            })
        })
    })

}

displayChats("Users");  //input param is the name of the collection