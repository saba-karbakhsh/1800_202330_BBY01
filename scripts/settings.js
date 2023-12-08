function deleteAccount (){
    // grab the user delete the user and there activities
    const currentUserID = authRef.currentUser.uid;
    const ActiveCollectionRef = db.collection("Activities");
    const userCollectionRef = db.collection("Users");

    deleteActivities(ActiveCollectionRef, currentUserID);
    deleteFriends(userCollectionRef, currentUserID);

    //deletes the user Doc stored in users.
    userCollectionRef.doc(currentUserID).delete();

    
    const user = authRef.currentUser;

    const credential = promptForCredentials();
    
    user.reauthenticateWithCredential(credential)
        .then(() => {
        // User re-authenticated.
        user.delete()
            .then(() => {
            window.location.href = "./welcome.html";
          }).catch((error) => {
            // An error ocurred
            console.log(error);
          });
    }).catch((error) => {
        // An error occurred
        console.log(error);
    });

}


function promptForCredentials() {
    const email = prompt("Enter your email: ");
    const password = prompt("Enter your password: ");
  
    // Create a credential with the provided email and password
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  
    return credential;
}



function deleteActivities(collectionRef, userID){
    collectionRef
    .where("userID", "==", userID)
    .get()
    .then(activity => {
        //Iterate through each activity
        // In each activity delete the participants subcollection by deleting all the docs
        //after that delete the activity itself then move onto the next activity
        activity.forEach(doc => {
            const activityRef = doc.id;

            //delete participants page
            collectionRef
                .doc(activityRef)
                .collection("participants")
                .get()
                .then(participant => {
                    participant.forEach(doc => {
                        collectionRef
                            .doc(activityRef)
                            .collection("participants")
                            .doc(doc.id)
                            .delete()
                    })
                })
            collectionRef.doc(activityRef).delete();
        })
    })
}


function deleteFriends(collectionRef, userID){
    console.log("This was referenced");
    collectionRef
    .doc(userID)
    .collection("Friends")
    .get()
    .then(friends => {
        friends.forEach(doc =>{
            collectionRef
                .doc(userID)
                .collection("Friends")
                .doc(doc.id)
                .delete()
                .then(() => {
                    console.log("each friend was deleted");
                })
        })
    })
}