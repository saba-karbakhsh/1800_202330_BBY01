function displayActivityInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let id = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( id );

    db.collection( "Activities" )
        .doc( id )
        .get()
        .then( doc => {
            thisHike = doc.data();
            hikeName = doc.data().title;
            description = doc.data().description;
            dateTime = doc.data().datetime;
            activityLocation = doc.data().location;
            
            document.getElementById( "activity_title" ).innerHTML = hikeName;
            document.getElementById( "description" ).innerHTML = description;
            document.getElementById( "dateTime" ).innerHTML = "Date and Time: " + dateTime;
            document.getElementById( "location" ).innerHTML = "Location: " + activityLocation;
           
        } );
}
displayActivityInfo();

//Function Saves the document ID of the activityt in your browser's local storage.
//NEED ACTIVITY ID

function saveActivityDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let id = params.searchParams.get("docID");
    localStorage.setItem('ActivitiesID', id);
    window.location.href = 'comment_and_review_page.html';
}



