function displayActivityInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "Activities" )
        .doc( ID )
        .get()
        .then( doc => {
            thisActivity = doc.data();
            hikeName = doc.data().title;
            
            // only populate title, and image
            document.getElementById( "activity_title" ).innerHTML = hikeName;
           
        } );
}
displayActivityInfo();