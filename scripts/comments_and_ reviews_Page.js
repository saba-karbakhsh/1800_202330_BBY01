//Read ActivitiesID from local storage. 
//Need Activity ID
var activityDocID = localStorage.getItem("ActivitiesID");    //visible to all functions on this page


// We now can use the ActivitiesID to read the name of the Activity from Firestore.
function getActivityName(id) {
    db.collection("Activities")
      .doc(id)
      .get()
      .then((thisHike) => { //where thisHike = doc.data();
        var hikeName = thisHike.data().title;  //where hikeName = doc.data().title;
        document.getElementById("activityName").innerHTML = hikeName;
          });
}
getActivityName(activityDocID);


// Add this JavaScript code to make stars clickable
// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});


//Write a new collection called "reviews"
function writeReview() {
    console.log("inside write review");
    let activityTitle = document.getElementById("title").value;
    let activityLevel = document.getElementById("level").value;
    let activitySeason = document.getElementById("season").value;
    let activityDescription = document.getElementById("description").value;
    let activityFlooded = document.querySelector('input[name="flooded"]:checked').value;
    let activityScrambled = document.querySelector('input[name="scrambled"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'activityRating' to keep track of the rating count
    let activityRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
                        activityRating++;
        }
    });

    console.log(activityTitle, activityLevel, activitySeason, activityDescription, activityFlooded, activityScrambled, activityRating);

    var user = firebase.auth().currentUser;
    if (user) {

        var currentUser = db.collection("Users").doc(user.uid); //Corroborate user.uid
        var userID =  user.uid; //Corroborate userID
        

        // Get the document for the current user.
        db.collection("reviews").add({
            activityDocID: activityDocID,
            userID: userID,
            title: activityTitle,
            level: activityLevel,
            season: activitySeason,
            description: activityDescription,
            flooded: activityFlooded,
            scrambled: activityScrambled,
            rating: activityRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         }).then(() => {
            window.location.href = "thanks_for_Review.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'comment_and_review_page.html';
    }


}



/** 

const activityForm = document.getElementById("comments");

activityForm.addEventListener("submit", function(e) {
    e.preventDefault(); //prevent default form submission

    if(auth2.currentUser) {
        //Get Form Data:
        const userName = document.getElementById("name").value;
        const description = document.getElementById("comment").value;
       
        //Get the user's UID
        
        const userUID = auth2.currentUser.uid;

        //Reference to the activities collection:
        const activitiesCollectionRef = db2.collection("comments");

        //Data to store in the activity document:
        const activityData = {
            userName: userName,
            description: description,
            userID: userUID
        };



        //Reset form after submission:
            //    activityForm.reset();
            //}).catch((error) => {
            //    console.error("Error uploading image:", error);
           // });
            activityForm.reset();
        })

        .catch((error) => {
            console.error("Error adding activity: ", error);
        });

    } else {
        //If user isnt authenticated:
        console.log("User is not authenticated.");
    }

    
})

*/
