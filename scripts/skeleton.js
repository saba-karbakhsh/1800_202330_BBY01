//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
            // User is signed in.
            // Do something for the user here. //after login state
            $('#navbarPlaceholder').load('./text/nav_after_login.html', function() {
                const searchBar = document.getElementById("searchBar");
                const searchButton = document.getElementById("searchSubmit");
                // const searchForm = document.getElementById("searchForm");
                
                let currentPage = window.location.pathname;
                const bp = ["/browser(cat1).html", "/browser(cat2).html", "/browser(cat3).html", "/browser(cat4).html",];
            
                if(currentPage == bp[0] || currentPage == bp[1] || currentPage == bp[2] || currentPage == bp[3]){    
                    // console.log("Page a match");
                    searchBar.style.display = "none";
                    searchButton.style.display = "none";

                } else {
                    // console.log("Page not a match");
                }
            });
            $('#footerPlaceholder').load('./text/footer_after_login.html');

        } else {
            // No user is signed in. //before login state
            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            $('#footerPlaceholder').load('./text/footer_before_login.html');
        }
    });
}
loadSkeleton()//invoke the function


