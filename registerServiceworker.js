// PWA
if ('serviceWorker' in navigator) {
    window.isUpdateAvailable = new Promise((resolve,reject)=>{
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('{{base}}neoan3-pwa/serviceWorker/{{name}}/',{scope:'{{base}}'})
                .then(function(registration) {
                    registration.onupdatefound = () =>{
                        const installingWorker = registration.installing;
                        installingWorker.onstatechange = () => {
                            switch (installingWorker.state) {
                                case 'installed':
                                    if (navigator.serviceWorker.controller) {
                                        // new update available
                                        resolve(registration);
                                    } else {
                                        // no update available
                                        resolve(false);
                                    }
                                    break;
                            }
                        };
                    }


                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.error('ServiceWorker registration failed: ', err);
                });
        });
    })
    window['isUpdateAvailable']
        .then(isAvailable => {
            if (isAvailable) {
                isAvailable.update();
            }
        });
}
