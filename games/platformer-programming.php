<?php
/**
 * Created by PhpStorm.
 * User: Epitaph64
 * Date: 7/13/2015
 * Time: 9:21 PM
 */
include "../layout.php";

$content = '
<article>
    <h1>JPlatformer, and platforming games in general</h1>
    <p>One type of game I\'ve spent quite a bit of time experimenting with is the platformer genre.</p>
    <div class="video-container">
        <iframe src="https://www.youtube.com/embed/IdJxaUg3yZg" frameborder="0" allowfullscreen class="video"></iframe>
    </div>
    <p>Above is the first version of Jplatformer.</p>
    <p>This video marks about a month after development had started. However, at the time I was developing this, Minecraft
    was the new kid on the block that everyone looked up to. I realized that my game would have to make use of procedural
    content generation in order to quench the thirst of this new generation of gamers. It was at this point that I went back
    to the drawing board in order to figure out how I should tackle the level generation and keep interest in progressing.</p>
    <br>
    <div class="video-container">
        <iframe src="https://www.youtube.com/embed/DCMHlECggjY" frameborder="0" allowfullscreen class="video"></iframe>
    </div>
    <p>This video aboves shows the second attempt at a platformer game, but this time with procedural level generation at
    the core of how the game plays. In this video, you can see the very rudimentary system I worked out for the level
    generator. Essentially, the algorithm creates different intervals of terrain at different depths. However, if there
    is a sudden jump in height required to traverse, the player must be able to reach it from either the level they stand
    on, or one of the intervals they passed earlier. Also, I added a springboard which would allow the player to scale
    which would otherwise be impassable given the prior terrain. The idea here was that there was an optimal "best" path
    that the player could take through the level, but it would require extremely precise movements in order to thread the
    line required.</p>
    <p>Unfortunately, this is currently where the story ends. I certainly hope I will find a time to return to working
    on this game. Although I doubt it would ever be something I could sell, I do want to just have finished what I have
    started a long time ago.</p>
    <br>
    <a href="/about-me.php">Return to About Me</a>
</article>';

layout($content, 'Jplatformer');

?>

