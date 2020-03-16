$( document ).ready(function() {
    var headline = document.getElementById("headline");
    var $class = $('.rev')
    var headlineOptions = [
  'Space Cowboy',
  'Mad Scientist',
  'Rift Champion',
  'Web-Slinger',
  'Android Ninja',
  'Undercover Spy',
  'Game Addict',
  'Cyber Samurai',
  'Senpai',
  'Pirate',
  'Dreamer',
  'Dragon Slayer',
  'Hero of Time',
  "Normal Guy",
  '$VALUE_UNDEFINED',
  'Product Designer'
];
    setInterval(function () {
        $class.removeClass('rev');
        headlineUp();
    }, 4000);

    function headlineUp() {
        setTimeout(function () {
            $class.addClass('rev');
            headline.innerHTML = headlineOptions[Math.floor(Math.random() * headlineOptions.length)];
        }, 500)
    }
});