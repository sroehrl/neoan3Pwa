<?php
/* Generated by neoan3-cli */

namespace Neoan3\Components;

use Neoan3\Apps\Ops;
use Neoan3\Core\Unicore;

class Neoan3Pwa extends Unicore
{


    function init()
    {
        switch (sub(1)) {
            case 'manifest':
                $this->getManifest();
                break;
            case 'serviceWorker':
                $this->getServiceWorker();
                break;
            default: $this->register();
        }
    }
    function register()
    {
        header('Content-Type: application/javascript');
        echo Ops::embraceFromFile('/component/neoan3Pwa/registerServiceworker.js',[
            'base' => base,
            'name' => sub(2)
        ]);
        exit();
    }
    function getManifest()
    {
        $manifest = [
            'name'      => sub(2),
            'icons' => [['src'=>base.'component/neoan3Pwa/n3.png','type'=>'image/png','sizes'=>'512x512']],
            'start_url' => base,
            'display'   => 'standalone',
            'scope'     => base
        ];
        header('Content-Type: application/json');
        echo json_encode($manifest, JSON_UNESCAPED_SLASHES);
        exit();
    }

    function getServiceWorker()
    {
        $info = ['routes' => base, 'name' => sub(2),'base'=>base];
        $folders = scandir(path . '/component');

        foreach ($folders as $folder) {

            $potential = path . '/component/' . $folder . '/' . Ops::toPascalCase($folder) . '.ctrl.php';

            if ($folder != '.' && $folder != '..' && $folder != 'neoan3Pwa' && file_exists($potential)) {

                $class = '\\Neoan3\\Components\\' . Ops::toPascalCase($folder);
                if (method_exists($class, 'init')) {
                    $info['routes'] .= ',' . base . Ops::toKebabCase($folder) . '/';
                }
            }
        }
        header('Service-Worker-Allowed: /');
        header('Content-Type: application/javascript');
        echo Ops::embraceFromFile('component/neoan3Pwa/serviceWorker.js', $info);
        exit();
    }


}
