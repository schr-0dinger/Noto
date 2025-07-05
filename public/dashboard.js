const ranks = [
  { name: "Iron",         minHours: 0,     color: "iron" },
  { name: "Copper",       minHours: 10,    color: "copper" },
  { name: "Bronze",       minHours: 20,    color: "bronze" },
  { name: "Silver",       minHours: 40,    color: "silver" },
  { name: "Gold",         minHours: 75,    color: "gold" },
  { name: "Platinum",     minHours: 125,   color: "platinum" },
  { name: "Titanium",     minHours: 200,   color: "titanium" },
  { name: "Crystal",      minHours: 300,   color: "crystal" },
  { name: "Pearl",        minHours: 400,   color: "pearl" },
  { name: "Sapphire",     minHours: 500,   color: "sapphire" },
  { name: "Ruby",         minHours: 600,   color: "ruby" },
  { name: "Emerald",      minHours: 750,   color: "emerald" },
  { name: "Diamond",      minHours: 900,   color: "diamond" },
  { name: "Obsidian",     minHours: 1050,  color: "obsidian" },
  { name: "Jade",         minHours: 1200,  color: "jade" },
  { name: "Amethyst",     minHours: 1350,  color: "amethyst" },
  { name: "Moonstone",    minHours: 1500,  color: "moonstone" },
  { name: "Meteorite",    minHours: 1700,  color: "meteorite" },
  { name: "Unobtainium",  minHours: 2000,  color: "unobtainium" }
];

function getCurrentRank(totalHours) {
  return ranks.reduce((acc, rank) => {
    return totalHours >= rank.minHours ? rank : acc;
  }, ranks[0]);
}

fetch('/stats')
  .then(res => res.json())
  .then(data => {

    const newRank = getCurrentRank(data.totalHours);

    data.rank = newRank;

    document.getElementById('rank-name').textContent = newRank.name;
    document.getElementById('level-bar').className = `${newRank.color}`
    document.getElementById('total-hours').textContent = data.totalHours + 'h';
    document.getElementById('day-streak').textContent = data.streak.current;
    document.getElementById('best-streak').textContent = data.streak.best;
    document.getElementById('daily-quote').textContent = "Focus on the process, not just the outcome";
    document.getElementById('avg-7').textContent = data.averages.last7Days + 'h';
    document.getElementById('avg-30').textContent = data.averages.last30Days + 'h';
    document.getElementById('avg-total').textContent = data.averages.totalAvg + 'h';
    document.getElementById('today-sessions').textContent = data.today.sessions;
    document.getElementById('today-duration').textContent = data.today.durationMinutes + 'm';
    document.getElementById('total-sessions').textContent = data.totalSessions;
    document.getElementById('total-duration').textContent = data.totalHours + 'h';
    document.getElementById('target-hours').textContent = data.targetHours;

    // Compute progress %
    const targetProgress = data.totalHours && data.targetHours
        ? Math.min((data.totalHours / data.targetHours) * 100, 100)
        : 0;
    document.getElementById('target-progress').style.width = targetProgress + '%';
    console.log(targetProgress);

    // Optionally, add CSS rank-based color
    document.getElementById('target-progress').classList.add(data.rank.color);
    document.querySelector('.badge-custom').classList.add(data.rank.color);

    const currentIndex = ranks.findIndex(rank => rank.name === newRank.name);
    const nextRank = ranks[currentIndex + 1]

    let message = '';
    if(nextRank) {
        const hoursLeft = Math.max(0, nextRank.minHours - data.totalHours);
        message = `${hoursLeft}h to reach ${nextRank.name}`;
    } else {
        message = `You've reached the highest rank: ${newRank.name}!`;
    }

    
    document.getElementById('rank-message').textContent = message;
  })
  .catch(error => console.error('Error loading stats:', error));
