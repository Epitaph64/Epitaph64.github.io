<?php

include "layout.php";

$content = '
<article>
    <h2>Who am I?</h2>
    <p>I am a software developer and musician who is most at peace when he is creating something.
     I am also currently a Senior Undergraduate of Computer Science at the University of Arizona. Below is a short list of some of the projects
     I\'ve worked on over the past few years, as well as links to other platforms which I have content on.</p>
</article>
<article>
    <h2>Web Development Projects</h2>
    <table class="about-me-table">
        <tr>
            <td><a href="http://www2.engr.arizona.edu/~vasiclab/index.php">Error Correction Coding Laboratory Website</a></td>
            <td><p>Hired to overhaul the ECCL website, I\'ve worked on numerous feature and security improvements to the
             site over the past year. A few notable ones are a permissions and user management system, a BibTex parser
             using regular expressions which is capable of correcting small syntactical errors, and PDO prepared statements
             when appropriate to better protect against SQL injection.</p></td>
        </tr>
        <tr>
            <td><a href="https://cookies-boutique.com/">Cookies Boutique Website</a></td>
            <td><p>An e-commerce website I am working to create with a client in the Tucson area. The site is built using
            Wordpress and WooCommerce for the basic shop functionality, with a <a href="https://codex.wordpress.org/Child_Themes">child theme</a>
            based upon Canvas created to suite the client\'s needs.</p></td>
        </tr>
    </table>
</article>
<article>
    <h2>Game Programming</h2>
    <table class="about-me-table">
        <tr>
            <td><a href="http://github.com/Epitaph64/javabomber/">Javabomber</a></td>
            <td><p>A bomberman clone I created while learning Java back in 2009. The code has been moved from Google Code
            to Github due to <a href="http://www.theverge.com/2015/3/13/8206903/google-code-is-closing-down-github-bitbucket">the close of Google Code.</a></p></td>
        </tr>
        <tr>
            <td><a href="http://ludumdare.com/compo/minild-14/comment-page-1/?uid=666">Fishy Reticulum</a></td>
            <td><p>A small game a friend, <a href="https://twitter.com/AlexanderZero">AlexanderZero</a> and
                I built together in 48 hours for a Mini <a href="http://ludumdare.com/compo/">LudumDare</a> event.</p></td>
        </tr>
        <tr>
            <td><a href="/games/platformer-programming.php">JPlatformer, and platforming games in general</a></td>
            <td><p>My journey to create a platformer game with "fun" physics.</p></td>
        </tr>
        <tr>
            <td><a href="https://youtu.be/rffmeIf_1mo">SFML Artillery Game</a></td>
            <td><p>A simple artillery simulation I wrote in C++ with the great free game library <a href="http://www.sfml-dev.org/">SFML</a>
            one weekend. Features some random heightmap generation for the terrain, procedural texture for the terrain, and
            simple vector based physics.</p></td>
        </tr>
        <tr>
            <td><a href="http://bitbucket.org/wjmacfarland/settlement-game/overview">Planetary Survival</a></td>
            <td><p>A super simplified dwarf fortress clone which I worked on with <a href="https://twitter.com/JordanFitz">Jordan Fitzpatrick</a>
            and two other students during an object oriented programming and design course my junior year of college.
            I worked primarily on the GUI, map generator, and pathfinding systems.</p></td>
        </tr>
        <tr>
            <td><a href="/games/hangman-haskell.php">Hangman in Haskell</a></td>
            <td><p>A (may I call it riveting?) tale of my brief but enjoyable experimentations with the <a href="https://www.haskell.org/">Haskell</a> programming language.</p></td>
        </tr>
    </table>
</article>
<article>
    <h2>Music Compositions</h2>
    <table class="about-me-table">
        <tr>
            <td><a href="http://epitaph64.newgrounds.com/audio/">My Newgrounds</a></td>
            <td><p>I created my account back in 2008 and I continue to upload my amateur productions first and foremost here as I like to track my progress over the years in one place.</p></td>
        </tr>
        <tr>
            <td><a href="http://soundcloud.com/enzor/tracks">My Soundcloud</a></td>
            <td><p>Less updated than my Newgrounds (due to the cap on uploads for free accounts) but I still submit here occasionally.</p></td>
        </tr>
    </table>
</article>
<article>
    <h2>Other Links</h2>
    <table class="about-me-table">
        <tr>
            <td><a href="http://validopinion.wordpress.com/">A Valid Opinion Blog</a></td>
            <td><p>My Wordpress blog which has been sparsely updated. I am hoping to have more content soon either there or on my private domain.</p></td>
        </tr>
    </table>
</article>
';

layout($content, 'About Me');

?>

