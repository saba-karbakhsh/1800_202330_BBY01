//Read ActivitiesID from local storage. 
var activityDocID = localStorage.getItem("ActivitiesID");


// We now can use the ActivitiesID to read the name of the Activity from Firestore.
function getActivityName(id) {
    db.collection("Activities")
      .doc(id)
      .get()
      .then((thisActivity) => {
        var ActivityName = thisActivity.data().title;
        document.getElementById("activityName").innerHTML = ActivityName;
          });
}
getActivityName(activityDocID);


// Creating clickable stars:
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
    let joinAgain = document.querySelector('input[name="joinAgain"]:checked').value;
    let feeling = document.querySelector('input[name="feeling"]:checked').value;

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

    console.log(activityTitle, activityLevel, activitySeason, activityDescription, joinAgain, feeling, activityRating);

    var user = firebase.auth().currentUser;
    if (user) {

        var userID =  user.uid;
        
        // Get the document for the current user and write to Firestore collection:
        db.collection("reviews").add({
            activityDocID: activityDocID,
            userID: userID,
            title: activityTitle,
            Enjoyment: activityLevel,
            season: activitySeason,
            description: activityDescription,
            WouldJoinAgain: joinAgain,
            Feeling: feeling,
            rating: activityRating,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         }).then(() => {
            // Redirect to the thanks page
            window.location.href = "thanks_for_Review.html"; 
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'comment_and_review_page.html';
    }
}
