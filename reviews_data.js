const GLOBAL_REVIEWS = [
  {
    id: "g1",
    name: "Cosmic",
    rating: 5,
    details: "The security mitigation in v3.2 is actually insane. 100% vector coverage is a first for this env. Highly recommended for heavy stress testing.",
    date: 1712174400000,
    featured: true,
    global: true
  },
  {
    id: "g2",
    name: "Madium",
    rating: 4,
    details: "Performance is solid, but encountered a minor skip on the UAC bypass probe. Still much better than previous iterations. The UI library support is great.",
    date: 1712160000000,
    featured: true,
    global: true
  },
  {
    id: "g3",
    name: "Cosmic",
    rating: 5,
    details: "Zero exploitable paths detected. The VPS isolation check is robust. This is the gold standard for executor health checks.",
    date: 1712145600000,
    featured: false,
    global: true
  },
  {
    id: "g4",
    name: "Madium",
    rating: 5,
    details: "The Fibonacci big-integer benchmark is a killer test. Madium handled it like a champ. 2,090 digits in under 60s is impressive.",
    date: 1712131200000,
    featured: false,
    global: true
  }
];

async function getMergedReviews() {
  const localRevs = JSON.parse(localStorage.getItem('all_reviews') || "[]");
  const remoteRevs = await VPSSync.getReviews();
  
  // Merge reviews, giving precedence to remote ones if IDs match
  const mergedIds = new Set();
  const merged = [];

  const add = (r, isRemote = false) => {
    if (!mergedIds.has(r.id)) {
      mergedIds.add(r.id);
      merged.push({ ...r, global: isRemote });
    }
  };

  remoteRevs.forEach(r => add(r, true));
  localRevs.forEach(r => add(r));
  GLOBAL_REVIEWS.forEach(r => add(r, true));

  return merged.sort((a, b) => b.date - a.date);
}
