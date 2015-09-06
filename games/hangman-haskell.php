<?php
/**
 * Created by PhpStorm.
 * User: Epitaph64
 * Date: 7/14/2015
 * Time: 9:10 PM
 */

include "../layout.php";

$header = '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gist-embed/2.1/gist-embed.min.js"></script>';

$content = '
<article>
    <h1>Hangman in Haskell</h1>
    <p>First and foremost - the code:</p>
    <script src="https://gist.github.com/Epitaph64/0cb73c025e5db56da969.js"></script>
    <p>Back when I was attempting to learn Haskell for the first time I decided that writing hangman should be a fun task
    to experiment with. I had written a simple hangman game in NASM (x86) assembly about a year ago at the time, and
    because I had spent the time to really understand the mechanics of hangman, I felt that it would be a suitable first
    project to make my time learning Haskell more interesting.</p>
    <p>It ended up taking quite a bit longer than I would have expected! After all, wrapping your head around functional
    programming is no easy task. I also received quite a bit of help from the kind folks at
    <a href="https://www.reddit.com/">r/haskell</a> towards the end in terms of polishing and condensing the script to
    something pictureseque I would argue!</p>
    <p>Functional programming is something I intend to return to at some point, once it\'s fully matured. Whether or not
    that fully matured language is Haskell at the time or not is yet to be seen. In the meantime, however, imperative
    languages are still "where it\'s at" if you\'re trying to get things done in a reasonable time frame - At least for us
    mortal beings.</p>
    <br>
    <a href="/about-me.php">Return to About Me</a>
</article>';

layout($content, 'Hangman in Haskell', $header);

?>
