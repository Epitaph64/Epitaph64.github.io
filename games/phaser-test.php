<?php
/**
 * Created by PhpStorm.
 * User: Epitaph64
 * Date: 7/15/2015
 * Time: 8:51 AM
 */

include "../layout.php";

$content = '
<article>
    <h1>Phaser test</h1>
    <br>
    <div id="phaser-test" style="width:100%"></div>
    <script type="text/javascript" src="/dist/phaser-game/phaser-game.js"></script>
    <br>
    <a href="/">Go Home</a>
</article>';

layout($content, 'Phaser Test', '
<script src="/dist/phaser.min.js"></script>
<script type="text/javascript" src="/dist/phaser-game/phaser-game.js"></script>');

?>
