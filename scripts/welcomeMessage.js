function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("Users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("welcomeText").innerText ="Welcome " + userName + "!";
                // document.getElementById("authorBox").innerHTML = "Posted by: " + userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();


setTimeout(() => {
    const popUP = document.getElementById('welcomeContainer');
    popUP.style.display='none';
    popUP.style.transition='1s';

}, 4000);