# contents

`STRP` is de Unity app. Zelf even builden naar een Visual Studio Project.

De server zit onder `server` :)
Hiervoor moet er NodeJS plus NPM zijn geïnstalleerd.
Doe `npm install` en daarna `npm run debug`.

Op [localhost:8080](http://localhost:8080) draait de uploader.

Met [localhost:8080/list](http://localhost:8080/list) haal je de lijst met alle geüploade plaatjes op.
Met [localhost:8080/selection](http://localhost:8080/selection) haal je de lijst met geselecteerde plaatjes op.

Voor nu kan je alleen even selecteren/deselecteren door het volgende aan te roepen:

[localhost:8080/select/naam-van-plaatje](http://localhost:8080/select/naam-van-plaatje)

Waarbij `naam-van-plaatje` de naam is zonder de plaatjes folder en extensie.

[localhost:8080/deselect/naam-van-plaatje](http://localhost:8080/deselect/naam-van-plaatje)
deselecteert hem weer.

En uiteraard
[localhost:8080/delete/naam-van-plaatje](http://localhost:8080/delete/naam-van-plaatje)
delete hem.