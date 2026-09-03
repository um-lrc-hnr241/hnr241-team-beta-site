// Greenwood Community Garden — homepage "living garden" novelty scene.
// Builds a small decorative animated garden out of emoji characters:
// a row of plants/flowers plus bees, butterflies, and bugs that
// drift/crawl around using CSS keyframe animations (see styles.css).
//
// Accessibility notes:
// - The whole scene is decorative. The container in index.html already
//   has role="img" + aria-label, so all children created here are
//   additionally marked aria-hidden="true" to avoid any duplicate or
//   confusing announcements for assistive tech.
// - This script never inserts any information that isn't also available
//   in plain text elsewhere on the page (per WCAG: don't rely on
//   motion/animation alone to convey content).
// - Actual animation is handled by CSS. This script only decides
//   starting positions and randomizes timing slightly so the critters
//   don't all move in perfect unison. Users with prefers-reduced-motion
//   set will simply see the emoji sitting still, because the animation
//   is disabled entirely in CSS for that preference.

(function () {
  var container = document.getElementById('livingGarden');
  if (!container) return;

  // Row of static plants/flowers along the "ground".
  var plantEmojis = ['🌷', '🌻', '🌼', '🌿', '🍅', '🌱', '🌸', '🥬'];

  var plantsRow = document.createElement('div');
  plantsRow.className = 'garden-plants';
  plantsRow.setAttribute('aria-hidden', 'true');

  plantEmojis.forEach(function (emoji) {
    var span = document.createElement('span');
    span.className = 'garden-plant';
    span.textContent = emoji;
    plantsRow.appendChild(span);
  });

  container.appendChild(plantsRow);

  // A handful of critters that fly or crawl around the scene.
  var flyingEmojis = ['🐝', '🦋'];
  var crawlingEmojis = ['🐞', '🐛'];
  var totalCritters = 6;

  for (var i = 0; i < totalCritters; i++) {
    var isFlyer = i % 2 === 0;
    var emojiSet = isFlyer ? flyingEmojis : crawlingEmojis;
    var emoji = emojiSet[i % emojiSet.length];

    var critter = document.createElement('span');
    critter.className = 'garden-critter ' + (isFlyer ? 'fly-anim' : 'crawl-anim');
    critter.textContent = emoji;
    critter.setAttribute('aria-hidden', 'true');

    // Random-ish starting position within the scene (percentages keep it
    // responsive across screen sizes).
    var startLeft = 5 + Math.random() * 80; // 5%–85%
    var startTop = 5 + Math.random() * 55; // 5%–60%, stays above the ground row

    // Vary duration and delay a little so critters don't move in lockstep.
    var duration = (isFlyer ? 9 : 14) + Math.random() * 8; // seconds
    var delay = -1 * Math.random() * duration; // negative delay staggers start

    critter.style.left = startLeft + '%';
    critter.style.top = startTop + '%';
    critter.style.animationDuration = duration.toFixed(1) + 's';
    critter.style.animationDelay = delay.toFixed(1) + 's';

    container.appendChild(critter);
  }
})();
