// Function to display activity cards for category 1
function displayCardsDynamically(collection) {
    // Retrieve the HTML element with the ID "activityCardTemplate" and store it in the cardTemplate variable.
    let cardTemplate = document.getElementById("activityCardTemplate");
  
    // Go into collection called "Activities"
    db.collection(collection)
      .get()
      .then(allActivities => {
        // Iterate through each doc and get values:
        allActivities.forEach(doc => {
          var title = doc.data().title;
          var description = doc.data().description;
          var datetime = doc.data().datetime;
          var location = doc.data().location;
          var category = doc.data().category;
          var poster = doc.data().userID;
          var docID = doc.id;
  
          // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.
          let newCard = cardTemplate.content.cloneNode(true);
  
          // Get the user's name based on the poster's userID
          getUserName(poster)
            .then(userName => {
              // Update title, location, and description
              newCard.querySelector('.card-title').innerHTML = title;
  
              // Make the username clickable and redirect to user_home_page.html with userId parameter
              let postedByElement = newCard.querySelector('.postedBy');
              postedByElement.innerHTML = "posted by " + '<a href="user_home_page.html?userId=' + poster + '">' + userName + '</a>';
  
              newCard.querySelector('.card-location').innerHTML = location;
              newCard.querySelector('.card-text').innerHTML = description;
              newCard.querySelector('.card-datetime').innerHTML = datetime;
              newCard.querySelector('.readmore').href = 'eachActivity.html?docID=' + docID;
  
              // Add activity card to category template:
              if (category == 'Sports') {
                document.getElementById(collection + '-go-here-' + category).appendChild(newCard);
              }
            })
            .catch(error => {
              console.error('Error getting user name:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error getting activities:', error);
      });
  }
  
  // Function to get user name based on userID
  function getUserName(userID) {
    return db.collection('Users').doc(userID).get()
      .then(userDoc => {
        if (userDoc.exists) {
          return userDoc.data().name;
        } else {
          return 'Unknown User';
        }
      })
      .catch(error => {
        console.error('Error getting user name:', error);
        return 'Unknown User';
      });
  }
  
  // Display cards:
  displayCardsDynamically("Activities");
  