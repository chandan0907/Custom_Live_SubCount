// script.js
// Shows demo values immediately; optionally polls YouTube if you set apiKey/channelId.

const apiKey = "";           // put your API key here if you want live updates (or leave blank)
const channelId = "";        // put your channel id here if you want live updates
let goal = 1000;             // subscriber goal (change as needed)
let pollInterval = 15;       // seconds for API polling

// DOM refs
const barInner = document.getElementById('barInner');
const barText = document.getElementById('barText');
const currentEl = document.getElementById('current');
const goalDisplay = document.getElementById('goalDisplay');
const percentText = document.getElementById('percentText');

// state
let current = 697;   // demo starting value so you immediately see the bar (change to 0 if you want)
let display = current;

// format with commas
function formatNumber(n){
  return (Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// update visuals (smooth)
function updateVisuals(){
  // simple easing to match your previous smoothing
  display += Math.round((current - display) * 0.25);
  if(Math.abs(current - display) < 1) display = current;

  const pct = Math.max(0, Math.min(100, (display / goal) * 100));
  barInner.style.width = pct + '%';
  currentEl.textContent = formatNumber(display);
  goalDisplay.textContent = formatNumber(goal);
  percentText.textContent = ` (${Math.floor(pct)}%)`;
}

// basic YouTube polling (optional)
async function fetchYouTubeSubs(){
  if(!apiKey || !channelId) return; // not configured
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`;
  try{
    const res = await fetch(url);
    if(!res.ok){
      console.warn('YT API error', res.status);
      return;
    }
    const data = await res.json();
    if(data.items && data.items[0] && data.items[0].statistics){
      const subs = parseInt(data.items[0].statistics.subscriberCount || 0);
      current = subs;
    }
  }catch(e){
    console.error('YT fetch error', e);
  }
}

updateVisuals();
setInterval(updateVisuals, 80);

// if API configured, poll immediately and then on interval
if(apiKey && channelId){
  fetchYouTubeSubs();
  setInterval(fetchYouTubeSubs, pollInterval * 1000);
}
