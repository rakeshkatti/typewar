const GOOGLE_CLIENT_ID = "53805206239-fliiinrnumott7bjt06tfkuscl2cn756.apps.googleusercontent.com";

function initializeGoogleAuth() {
    window.onGoogleYoloLoad = (googleyolo) => {
        const authPromise = googleyolo.hint({
            supportedAuthMethods: [
                "https://accounts.google.com",
                "googleyolo://id-and-password"
            ],
            supportedIdTokenProviders: [
                {
                    uri: "https://accounts.google.com",
                    clientId: GOOGLE_CLIENT_ID
                }
            ],
            context: "continue"
        });
        
        authPromise.then((credential) => {
            if (credential.id) {
                localStorage.setItem("username", credential.id);
            }
            if (credential.idToken) {
                fetch("http://localhost:2222/login", {
                method: 'POST',
                body: JSON.stringify({token: credential.idToken}),
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer',
            }).then(res=>res.json())
            .then(res => console.log(res));
            // Send the token to your auth backend.
            // useGoogleIdTokenForAuth(credential.idToken);
        }
    }, (error) => {
        switch (error.type) {
            case "userCanceled":
            // The user closed the hint selector. Depending on the desired UX,
            // request manual sign up or do nothing.
            break;
            case "noCredentialsAvailable":
            // No hint available for the session. Depending on the desired UX,
            // request manual sign up or do nothing.
            break;
            case "requestFailed":
            // The request failed, most likely because of a timeout.
            // You can retry another time if necessary.
            break;
            case "operationCanceled":
            // The operation was programmatically canceled, do nothing.
            break;
            case "illegalConcurrentRequest":
            // Another operation is pending, this one was aborted.
            break;
            case "initializationError":
            // Failed to initialize. Refer to error.message for debugging.
            break;
            case "configurationError":
            // Configuration error. Refer to error.message for debugging.
            break;
            default:
            // Unknown error, do nothing.
        }
    })
};
}

export default {
    initializeGoogleAuth
}