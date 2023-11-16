// Declare a global variable to store the File Object reference
var ImageFile;

// Function to handle the file input change event
function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // Pointer #1
    const image = document.getElementById("mypic-goes-here");   // Pointer #2

    // Attach listener to input file
    // When this file changes, do something
    fileInput.addEventListener('change', function (e) {
        // The change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        // Change the DOM img element source to point to this file
        image.src = blob;    // Assign the "src" property of the "img" tag
    });
}

// Invoke the file input listener
chooseFileListener();

// Function to save user information (profile picture) to Firestore and Cloud Storage
function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Create a reference to the Cloud Storage path for the user's profile picture
            var storageRef = storage.ref("images/" + user.uid + ".jpg");

            // Asynchronous call to put File Object (global variable ImageFile) onto Cloud Storage
            storageRef.put(ImageFile)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');

                    // Asynchronous call to get URL from Cloud Storage
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get "url" of the uploaded file
                            console.log("Got the download URL.");

                            // Asynchronous call to save the profile picture URL into Firestore
                            db.collection("Users").doc(user.uid).update({
                                profilePic: url // Save the URL into users collection
                            })
                                .then(function () {
                                    console.log('Added Profile Pic URL to Firestore.');
                                })
                                .catch(function (error) {
                                    console.error('Error updating user profile with profile picture URL:', error);
                                });
                        })
                        .catch(function (error) {
                            console.error('Error getting download URL from Cloud Storage:', error);
                        });
                })
                .catch(function (error) {
                    console.error('Error uploading file to Cloud Storage:', error);
                });
        } else {
            console.log("No user is logged in");
        }
    });
}

// Function to populate user information (profile picture) based on the current user
let currentUser;

function populateInfo(userId, currentUserId) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Check if the current user is the same as the user whose profile is being viewed
            const isCurrentUser = user.uid === userId;

            // Display the profile picture only if it's the current user's profile
            if (isCurrentUser) {
                const fileInput = document.getElementById("mypic-input");
                const saveButton = document.getElementById("save-button");

                // Show the file input and save button
                fileInput.style.display = "inline-block";
                saveButton.style.display = "inline-block";
            } else {
                // If it's not the current user's profile, hide the file input and save button
                const fileInput = document.getElementById("mypic-input");
                const saveButton = document.getElementById("save-button");

                // Hide the file input and save button
                fileInput.style.display = "none";
                saveButton.style.display = "none";
            }

            // Go and get the current user info from Firestore
            currentUser = db.collection("Users").doc(userId);

            currentUser.get()
                .then(userDoc => {
                    let picUrl = userDoc.data().profilePic;

                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                    } else {
                        console.log("picURL is null");
                    }
                });
        } else {
            console.log("no user is logged in");
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        // Get the current logged-in user ID
        const currentUserId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

        // Call populateInfo with both user IDs
        populateInfo(userId, currentUserId);
    } else {
        console.error('User ID not found in the URL');
    }
});


// Invoke the function to populate user information
//populateInfo();
