// PWA
let updatedWorker;
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('{{base}}neoan3-pwa/serviceWorker/{{name}}/',{scope:'{{base}}'}).then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            registration.addEventListener('updatefound', ()=>{
                console.log('sw update!');
                updatedWorker = registration.installing;
                updatedWorker.addEventListener('statechange', ()=>{
                    if(updatedWorker.state === 'installed'){
                        const update = document.createElement('div');
                        update.style.position = 'fixed';
                        update.style.width = '90%';
                        update.style.top = '30%';
                        update.style.left = '5%';
                        update.style.padding = '7px';
                        update.style.background = 'rgba(255,255,255,.8)';
                        update.style.fontWeight = 'strong'
                        update.style.color = 'black';
                        update.style.border = '2px solid rgba(0,0,0,.8)';
                        update.style.borderRadius = '5px';
                        update.style.cursor = 'pointer';
                        update.innerText = 'The PWA content you are viewing is outdated! Click to reload';
                        update.addEventListener('click',()=>{
                            console.log('updating cache...')
                            updatedWorker.postMessage({ action: 'skipWaiting' })
                        })
                        document.body.appendChild(update)
                    }
                })
            })

        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
        let alreadyLoading = false;
        navigator.serviceWorker.addEventListener('controllerchange', ()=>{
            if(alreadyLoading) {
                return;
            }
            window.location.reload();
            alreadyLoading = true;
        })
    });
}
