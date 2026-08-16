/**
 * Tripoozkk Brand Portal - Application Controller
 * Handles the archetype modal showcase, notification alerts, and
 * a luxury street-vibe Web Audio synth engine with diamond-shine effects.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. ARCHETYPES DATABASE
  const archetypes = {
    diamond: {
      name: "Diamond Archetype",
      image: "assets/diamond.jpg",
      tier: "Iced Out",
      badge: "badge-legendary",
      quote: "Shine. Build. Elevate.",
      desc: "A stunning masterpiece fully encrusted in brilliant refractive diamonds, reflecting high-society luxury and raw street power. Symbolizes absolute perfection, clarity, and unbreakable spirit under pressure. Decorated with a customized SHINE BUILD ELEVATE neck tattoo.",
      traits: {
        skin: "Iced Diamond Facets",
        headwear: "Diamond Crown of Chaos",
        necklace: "Diamond Smile Medallion",
        smoke: "Shimmering Crystal Cloud",
        tattoo: "SHINE BUILD ELEVATE",
        earring: "Dangling Smiley Drop",
        companions: "Left & Right Diamond Blobs"
      }
    },
    chrome: {
      name: "Chrome Archetype",
      image: "assets/chrome.jpg",
      tier: "Liquid Metal",
      badge: "badge-epic",
      quote: "Stay Focused. Build Legacy.",
      desc: "A sleek metallic shell finished in liquid mirror chrome, representing resilience, technological edges, and modern industrial luxury. Features heavy chrome body reflections, an iced-out silver chain, and double-X neck ink.",
      traits: {
        skin: "Polished Mirror Chrome",
        headwear: "Silver Spiky Grunge Hair",
        necklace: "Heavy Cuban Link Silver",
        smoke: "Chrome Cloud Vapor",
        tattoo: "STAY FOCUSED BUILD LEGACY",
        earring: "Dangling Silver Medal",
        companions: "Liquid Metal Slime Companion"
      }
    },
    gold: {
      name: "Gold Archetype",
      image: "assets/gold.jpg",
      tier: "24K Liquid",
      badge: "badge-legendary",
      quote: "Good Vibes Only.",
      desc: "Drenched completely in pure 24K molten gold. The Gold Archetype represents royal prosperity, street royalty, and unapologetic wealth. Features heavy golden jewelry and golden smoke ring trails.",
      traits: {
        skin: "Liquid 24K Gold Coating",
        headwear: "Dripping Crown of Gold",
        necklace: "Heavy Gold Link Medallion",
        smoke: "Golden Smoke Swirls",
        tattoo: "GOOD VIBES ONLY",
        earring: "Gold Dripping Smiley",
        companions: "Double Liquid Gold Blobs"
      }
    },
    slime: {
      name: "Slime Archetype",
      image: "assets/slime.jpg",
      tier: "Wet Brain",
      badge: "badge-rare",
      quote: "Wet Brain Club.",
      desc: "The original sewage-born zombie slime mutant. A catalyst of the entire Tripoozkk universe, blending olive greens, moss walls, and golden accessories in a beautiful grunge package. Features the famous WET BRAIN neck tattoo.",
      traits: {
        skin: "Zombified Beige & Green Drips",
        headwear: "Messy Black Grunge Spikes",
        necklace: "Heavy Cuban Link Gold",
        smoke: "Pulsing Toxic Vapor Trail",
        tattoo: "WET BRAIN",
        earring: "Slime Smile Medallion",
        companions: "Green & Purple Slime Buddies"
      }
    }
  };

  // State Variables
  let soundEnabled = false;
  let audioCtx = null;
  let ambientOsc = null;
  let ambientInterval = null;

  // DOM Elements
  const soundToggleBtn = document.getElementById("sound-toggle");
  const modal = document.getElementById("nft-modal");
  const modalClose = document.getElementById("modal-close");
  
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalRarityBadge = document.getElementById("modal-rarity-badge");
  const modalArchetypeType = document.getElementById("modal-archetype-type");
  const modalDescription = document.getElementById("modal-description");
  const modalTraitsContainer = document.getElementById("modal-traits-container");
  
  const downloadLink = document.getElementById("modal-download");
  const openseaLink = document.getElementById("modal-opensea");

  // FAQ Accordion Handler
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
      playSquelch(160, 0.1);
    });
  });

  // 2. SYNTHESIZED AUDIO ENGINE (Web Audio API)
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Organic dripping/squelching sound
  function playSquelch(startFreq = 300, duration = 0.15) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  }

  // Shimmering chime for gold and diamond interactions
  function playShimmerChime() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const notes = [880.00, 1046.50, 1318.51, 1567.98]; // A5, C6, E6, G6 (Crystal notes)
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gainNode.gain.setValueAtTime(0.06, now + idx * 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.25);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Start low-fi golden street bass loop (45Hz pulses every 1.6s)
  function startGoldPulseLoop() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const playPulse = () => {
      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(55, now); // A1 note
        osc.frequency.linearRampToValueAtTime(30, now + 0.5); // slide down
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(80, now);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        
        osc.start();
        osc.stop(now + 0.7);
      } catch (e) {}
    };

    playPulse();
    ambientInterval = setInterval(playPulse, 1600);
  }

  function stopGoldPulseLoop() {
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  }

  // Sound Toggle Button
  soundToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundToggleBtn.innerHTML = `🔊 <span class="desktop-only">Sound On</span>`;
      soundToggleBtn.classList.add("active");
      initAudio();
      playShimmerChime();
      startGoldPulseLoop();
      showNotification("Audio Active", "Low-fi Golden Pulse loop and squelches activated!");
    } else {
      soundToggleBtn.innerHTML = `🔇 <span class="desktop-only">Sound Off</span>`;
      soundToggleBtn.classList.remove("active");
      stopGoldPulseLoop();
    }
  });

  // Attach sounds to interactives
  const addSoundsToButtons = () => {
    document.querySelectorAll("button, select, input, .nft-card, a, .stack-card").forEach(elem => {
      if (elem.dataset.soundAdded) return;
      elem.dataset.soundAdded = "true";
      
      elem.addEventListener("mouseenter", () => {
        if (soundEnabled) {
          if (elem.classList.contains("primary") || elem.dataset.archetype === "gold" || elem.dataset.archetype === "diamond") {
            playShimmerChime();
          } else {
            playSquelch(220, 0.05);
          }
        }
      });
      elem.addEventListener("click", () => {
        if (soundEnabled) {
          if (elem.dataset.archetype === "gold" || elem.dataset.archetype === "diamond") {
            playShimmerChime();
          } else {
            playSquelch(280, 0.12);
          }
        }
      });
    });
  };

  // 3. DETAIL MODAL SHOWCASE
  function openModal(archetypeKey) {
    const data = archetypes[archetypeKey];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.name;
    modalTitle.textContent = data.name;
    modalRarityBadge.textContent = data.tier;
    modalRarityBadge.className = `card-tier ${data.badge}`;
    
    // Capitalize Class Name
    modalArchetypeType.textContent = archetypeKey.charAt(0).toUpperCase() + archetypeKey.slice(1);
    modalDescription.textContent = data.desc;

    // Direct image download link
    downloadLink.href = data.image;
    downloadLink.download = `tripoozkk_${archetypeKey}.jpg`;

    // Real OpenSea link
    openseaLink.href = "https://opensea.io/collection/tripoozkk";
    openseaLink.onclick = () => {
      playShimmerChime();
      showNotification("Sewer Vault", "Opening the official Tripoozkk OpenSea collection...");
    };

    // Populating traits
    modalTraitsContainer.innerHTML = "";
    for (const cat in data.traits) {
      const val = data.traits[cat];
      const niceCat = cat.charAt(0).toUpperCase() + cat.slice(1);

      const traitBox = document.createElement("div");
      traitBox.className = "modal-trait-card";
      traitBox.innerHTML = `
        <span class="trait-category">${niceCat}</span>
        <span class="trait-value text-gold">${val}</span>
      `;
      modalTraitsContainer.appendChild(traitBox);
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable background scrolling
  }

  function closeModal() {
    playSquelch(140, 0.08);
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Enable scrolling
  }

  // Setup click triggers on grid cards
  document.querySelectorAll(".nft-card").forEach(card => {
    card.addEventListener("click", () => {
      const archKey = card.dataset.archetype;
      openModal(archKey);
    });
  });

  // Setup click triggers on hero stack cards
  document.querySelectorAll(".stack-card").forEach(card => {
    card.addEventListener("click", () => {
      // Find class mapping (e.g. card-gold -> gold)
      const classes = Array.from(card.classList);
      const mappedClass = classes.find(c => c.startsWith("card-"));
      if (mappedClass) {
        const archKey = mappedClass.replace("card-", "");
        openModal(archKey);
      }
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // 4. FLOATING NOTIFICATIONS
  function showNotification(title, message) {
    const notifyContainer = document.getElementById("notifications-container");
    const note = document.createElement("div");
    note.className = "notification";
    note.innerHTML = `
      <div class="note-title">${title}</div>
      <div class="note-message">${message}</div>
    `;
    notifyContainer.appendChild(note);
    
    // Slide in
    setTimeout(() => note.classList.add("active"), 10);
    
    // Auto-remove
    setTimeout(() => {
      note.classList.remove("active");
      setTimeout(() => note.remove(), 300);
    }, 3500);
  }

  // Copy-to-Clipboard handler for smart contract hash
  const contractHash = document.querySelector(".contract-hash");
  if (contractHash) {
    contractHash.addEventListener("click", () => {
      navigator.clipboard.writeText("0x59395cd693607cd7fd782f6884968a122fb24a71");
      showNotification("Address Copied", "Contract Address saved to clipboard!");
    });
  }

  // Initial sound bindings
  addSoundsToButtons();
});
