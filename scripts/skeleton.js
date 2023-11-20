//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
            // User is signed in.
            // Do something for the user here. //after login state
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer_after_login.html')); 
            console.log($('#welcomePlaceholder').load('./text/welcome_popup.html')); 
        } else {
            // No user is signed in. //before login state
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer_before_login.html'));
        }
    });
}
loadSkeleton(); //invoke the function