function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("activityCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allActivities => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allActivities.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;       // get value of the "name" key
                var description = doc.data().description;  // get value of the "details" key
                var datetime = doc.data().datetime;    //get unique ID to each hike to be used for fetching right image
                var location = doc.data().location; //gets the length field
                var category =  doc.data().category;
                var docID = doc.id;
                let newCard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                console.log(category);
                console.log(newCard);
                //update title and text and image
                newCard.querySelector('.card-title').innerHTML = title;
                newCard.querySelector('.card-location').innerHTML = location;
                newCard.querySelector('.card-text').innerHTML = description;
                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                if (category == "Gastronomy"){
                    document.getElementById(collection + "-go-here-" + category).appendChild(newCard);
                }

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("Activities");  //input param is the name of the collection