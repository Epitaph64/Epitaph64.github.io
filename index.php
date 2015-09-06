<?php

include "layout.php";

$content = '
<article>
    <h1>Welcome to e64.us!</h1>
    <p>This is the personal website of Walter Macfarland aka Epitaph64. You can <a href="about-me.php">read more about me here.</a></p>
</article>';
/* phaser article
<article>
    <h1>Experimenting with the Phaser JavaScript Gaming Engine</h1>
    <br>
    <p>You may move the player by clicking on the game window below and then using the W A S D keys. This is just a game demo
    I built after a couple of hours of toying around. I made use of the sprites I created for Jplatformer as I didn\'t want
    to have to search for new graphics just for a simple experiment.</p>
    <div id="phaser-test" style="width:100%"></div>
</article>
';
*/

layout($content, 'Home');

?>
