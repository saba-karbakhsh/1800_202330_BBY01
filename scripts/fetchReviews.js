// Function to fetch reviews based on activity ID
function fetchReviews(activityID) {
    // Get the reviews collection
    let cardTemplate = document.getElementById("reviewCardTemplate");
    var reviewsRef = db.collection("reviews");
  
    // Query reviews with the given activity ID
    reviewsRef.where("activityDocID", "==", activityID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Access the review data using doc.data()
          var reviewData = doc.data();
          var title = doc.data().title;
          var rating = doc.data().rating;
          var description = doc.data().description;
          var enjoyed = doc.data().Enjoyment;
          var wouldAgain = doc.data().WouldJoinAgain;
          var postedBy = doc.data().userID;
          var userRef = db.collection("Users").doc(postedBy);
  
          userRef.get()
            .then((userDoc) => {
              var username = userDoc.data().name; // Replace 'name' with the actual field name in your document
              console.log('Username:', username);
  
              // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.
              let newCard = cardTemplate.content.cloneNode(true);
  
              // Update title and location and description
              newCard.querySelector('.card-title').innerHTML = title;
  
              // Create a clickable link for the username
              var usernameLink = document.createElement('a');
              usernameLink.href = 'user_home_page.html?userId=' + postedBy;
              usernameLink.innerHTML = username;
              newCard.querySelector('.posted-by').appendChild(usernameLink);
  
              newCard.querySelector('.card-text').innerHTML = "Comment: " + description;
  
              // Create and fill in star icons based on the rating
              for (let i = 1; i <= 5; i++) {
                var starElement = newCard.querySelector('#star' + i);
                if (i <= rating) {
                  starElement.innerHTML = 'star';
                } else {
                  starElement.innerHTML = 'star_outline';
                }
              }
  
              newCard.querySelector('.wouldAgain').innerHTML = "I would join the activity again: " + wouldAgain;
              newCard.querySelector('.enjoyed').innerHTML = enjoyed;
  
              // Add activity card to category template:
              document.getElementById("reviews-go-here").appendChild(newCard);
            });
        });
      });
  }
  
  // Get the activityID from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var activityID = urlParams.get("docID");
  
  // Call the fetchReviews function with the activityID
  fetchReviews(activityID);
  