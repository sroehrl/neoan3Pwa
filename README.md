# neoan3Pwa
Simple PWA helper for neoan3

This component generates everything necessary to convert your neoan3 app into a PWA.
It automatically searches for route-components in your component folder and adds them to the cache.

## Installation

1. **Fork** this repository
2. Run `neoan3 add component sroehrl/neoan3Pwa https://github.com/[userOrOrg]/[forkedRepo].git` in your project folder
3. In your frame, add the manifest and the service worker registration to your constants

```PHP
function constants()
    {
        return [
            'link'       => [                
                [
                    'rel' => 'manifest', 'href' => base .'neoan3-pwa/manifest/[your-app-name]'
                ]
            ],
            'js'         => [
                ['src' => base . 'neoan3-pwa/register/[your-app-name]']
            ],
            'meta'       => [
                ['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1']
            ]
        ];
    }
```

Alternatively, you can use `$this->addHead()` accordingly.

## Configuration

In components/neoan3Pwa you can 
- exchange the used icon
- add additional sources to the variable 'assets' in `serviceWorker.js`
- change scopes accordingy
