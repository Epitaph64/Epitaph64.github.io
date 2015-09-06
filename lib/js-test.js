/**
 * Created by Epitaph64 on 7/10/2015.
 */
var hearts = 0;
var heart_count_text = document.getElementById("heart-count");
var button_secret = document.getElementById("button-secret");
button_secret.style.visibility = 'hidden';
button_secret.addEventListener("click", secret_func);

function secret_func() {
    switch(hearts) {
        default:
            create_log_entry("Yes, you found the \"secret\" button.");
            break;
        case 77:
            create_log_entry("Secret number recognized");
            break;
        case 100:
            change_hearts(1);
            create_log_entry("100 backwards is 001");
            break;
        case 101:
            change_hearts(1001);
            create_log_entry("Have 900 free hearts!");
    }
}

change_hearts(0);

function change_hearts(value) {
    hearts = value;
    heart_count_text.innerHTML = "" + hearts;
    if (hearts >= 50) {
        button_secret.style.visibility = 'visible';
    } else {
        button_secret.style.visibility = 'hidden';
    }
}

var button_sleep = document.getElementById("button-sleep");
button_sleep.addEventListener("click", sleep_func);

function sleep_func() {
    create_log_entry("You slumber for awhile.");
    if (hearts < 10) {
        change_hearts(10);
        create_log_entry("You have recovered hearts in your sleep!");
    }
}

var button_eat = document.getElementById("button-eat");
button_eat.addEventListener("click", eat_func);

function eat_func() {
    create_log_entry("You snarl down on some pancakes.");
    change_hearts(hearts+2);
}

// run game
setInterval(function () {
    if (hearts > 0) {
        change_hearts(hearts - 1);
        if (hearts == 0) {
            create_log_entry("Oh noes, your hearts have reached ZERO!");
        }
    }
}, 3000);

function create_log_entry(text) {
    var p_element = document.createElement("p");
    p_element.className = "log-entry";
    var node = document.createTextNode(text);
    p_element.appendChild(node);

    var log = document.getElementById("log");
    log.appendChild(p_element);

    if (log.children.length > 12) {
        log.removeChild(log.childNodes[2]);
    }
};
