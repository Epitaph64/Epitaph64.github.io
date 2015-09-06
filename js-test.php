<?php

include "layout.php";

$content = '
<div id="wrapper">
    <div class="grid">
        <div class="col-1-2">
            <h1>Action Panel</h1>
            <button id="button-eat" class="action">Eat</button>
            <button id="button-sleep" class="action">Sleep</button>
            <button id="button-secret" class="action">Secret</button>
        </div>
        <div class="col-1-2">
            <h1>Items</h1>
            <img src="img/heart.png" width="9" height="9"/> - <span id="heart-count"></span>
        </div>
        <div class="col-1-2">
            <div id="log">
                <h1>Message Log:</h1>
            </div>
        </div>
    </div>
    <script src="dist/js-test.js"></script>
    </div>
</div>
';

layout($content);

?>

