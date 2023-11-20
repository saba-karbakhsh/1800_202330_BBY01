function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Let's know who the logged-in user is by logging their UID
            console.log(user.uid); 
            // Go to the Firestore document of the user
            currentUser = db.collection("Users").doc(user.uid); 
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                console.log(userName);
                
            })
        } else {
            console.log("No user is logged in.");
        }
    })
}

insertNameFromFirestore();


setTimeout(() => {
    const popUP = document.getElementById('welcomeContainer');
    popUP.style.display='none';
    popUP.style.transition='1s';

}, 4000);