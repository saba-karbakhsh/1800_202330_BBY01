// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // get the user object from the Firebase authentication database
        var user = authResult.user; 
        //if new user, add this user to Firestore collection                           
        if (authResult.additionalUserInfo.isNewUser) {         
            db.collection("Users").doc(user.uid).set({         
                   name: user.displayName,
                   email: user.email,

            }).then(function () {
                   console.log("New user added to firestore");
                   //re-direct back to welcome.html after logging or signing up
                   window.location.assign("welcome.html");       
            }).catch(function (error) {
                   console.log("Error adding new user: " + error);
            });
        } else {
            return true;
        }
            return false;
        },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: "categories.html",
    signInOptions: [
      
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
  