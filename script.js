const intro = document.querySelector(".intro");
const skipButton = document.querySelector(".skip");
const photoDeck = document.querySelector(".photo-deck");
const photoWindow = document.querySelector(".photo-window");
const profilePhoto = document.querySelector(".profile-photo");
const photoCount = document.querySelector(".photo-count");
const keywordsSection = document.querySelector(".keywords-section");
const contactLetter = document.querySelector(".contact-letter");

contactLetter?.addEventListener("animationend", () => {
  contactLetter.classList.add("is-revealed");
});

function syncSectionRoute() {
  const contactIsActive = window.location.hash === "#contact";
  const educationIsActive = window.location.hash.startsWith("#education");
  const experienceIsActive = window.location.hash.startsWith("#experience") || window.location.hash.startsWith("#ia-");
  const yourekaIsActive = window.location.hash === "#experience-youreka";
  const biogdpIsActive = window.location.hash === "#experience-biogdp";
  const iaIsActive = window.location.hash === "#experience-ib-ia" || window.location.hash.startsWith("#ia-");
  const tutorIsActive = window.location.hash === "#experience-eyelevel";
  const hobbiesIsActive = window.location.hash.startsWith("#hobbies") || window.location.hash.startsWith("#art-") || window.location.hash.startsWith("#sport-") || window.location.hash.startsWith("#travel-");
  const hobbiesArtIsActive = window.location.hash === "#hobbies-art" || window.location.hash.startsWith("#art-");
  const hobbiesSportsIsActive = window.location.hash === "#hobbies-sports" || window.location.hash.startsWith("#sport-");
  const hobbiesTravelIsActive = window.location.hash === "#hobbies-travel" || window.location.hash.startsWith("#travel-");
  document.body.classList.toggle("route-education", educationIsActive);
  document.body.classList.toggle("route-experience", experienceIsActive);
  document.body.classList.toggle("route-youreka", yourekaIsActive);
  document.body.classList.toggle("route-biogdp", biogdpIsActive);
  document.body.classList.toggle("route-ia", iaIsActive);
  document.body.classList.toggle("route-tutor", tutorIsActive);
  document.body.classList.toggle("route-hobbies", hobbiesIsActive);
  document.body.classList.toggle("route-hobbies-art", hobbiesArtIsActive);
  document.body.classList.toggle("route-hobbies-sports", hobbiesSportsIsActive);
  document.body.classList.toggle("route-hobbies-travel", hobbiesTravelIsActive);
  document.body.classList.toggle("route-contact", contactIsActive);

  if (contactIsActive) {
    contactLetter?.classList.remove("is-revealed");
  }

  if (contactIsActive || educationIsActive || experienceIsActive || hobbiesIsActive) {
    document.body.classList.remove("intro-active");
    document.body.classList.add("intro-finished");
    window.requestAnimationFrame(() => {
      if (window.location.hash === "#contact" || window.location.hash === "#education" || window.location.hash === "#experience" || window.location.hash === "#hobbies" || window.location.hash === "#hobbies-art" || window.location.hash === "#hobbies-sports" || window.location.hash === "#hobbies-travel") {
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        document.querySelector(window.location.hash)?.scrollIntoView();
      }
    });
  } else if (window.location.hash) {
    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }
}

syncSectionRoute();
window.addEventListener("hashchange", syncSectionRoute);

const bookletScene = document.querySelector(".booklet-scene");
const bookletCover = document.querySelector(".booklet-cover");
const bookletTurn = document.querySelector(".booklet-turn");
const bookletClose = document.querySelector(".booklet-close");
const ibSpread = document.querySelector(".book-spread--ib");
const apSpread = document.querySelector(".book-spread--ap");

function setBookPage(page) {
  bookletScene.dataset.bookPage = String(page);
  const showingAp = page === 2;
  ibSpread.setAttribute("aria-hidden", String(showingAp));
  apSpread.setAttribute("aria-hidden", String(!showingAp));
  bookletTurn.setAttribute("aria-label", showingAp ? "Turn back to the IB pages" : "Turn to the AP pages");
  bookletTurn.querySelector(".turn-label").textContent = showingAp ? "← Back to IB" : "Next: AP →";
}

bookletCover.addEventListener("click", () => setBookPage(1));
bookletTurn.addEventListener("click", () => setBookPage(bookletScene.dataset.bookPage === "2" ? 1 : 2));
bookletClose.addEventListener("click", () => setBookPage(0));

const awardNames = document.querySelectorAll(".award-name");
const certificateDisplay = document.querySelector(".certificate-display");
const certificatePreview = document.querySelector(".certificate-preview");
const certificateTitle = document.querySelector(".certificate-title");
const certificateNote = document.querySelector(".certificate-note");

function showCertificate(award) {
  awardNames.forEach((item) => item.classList.toggle("is-active", item === award));
  certificatePreview.src = award.dataset.certificate;
  certificatePreview.alt = `${award.dataset.title} certificate`;
  certificateTitle.textContent = award.dataset.title;
  certificateNote.textContent = award.dataset.note;
  certificateDisplay.classList.add("has-certificate");
}

function clearCertificate() {
  awardNames.forEach((item) => item.classList.remove("is-active"));
  certificateDisplay.classList.remove("has-certificate");
  certificateTitle.textContent = "Certificate archive";
  certificateNote.textContent = "Hover or tap an award";
}

awardNames.forEach((award) => {
  const preload = new Image();
  preload.src = award.dataset.certificate;
  award.addEventListener("mouseenter", () => showCertificate(award));
  award.addEventListener("mouseleave", clearCertificate);
  award.addEventListener("focus", () => showCertificate(award));
  award.addEventListener("blur", clearCertificate);
  award.addEventListener("click", () => showCertificate(award));
});

const realPhotos = [
  {
    src: "assets/home-id/photo-1.jpg",
    alt: "Candice smiling by the sea at sunset",
  },
  {
    src: "assets/home-id/photo-2.png",
    alt: "Candice visiting Tokyo Tower",
  },
  {
    src: "assets/home-id/photo-3.png",
    alt: "Candice holding a clear umbrella by the sea",
  },
];

let photoIndex = -1;
let photoIsFlipping = false;
let doodleTimer;

realPhotos.forEach(({ src }) => {
  const image = new Image();
  image.src = src;
});

function showPhoto(nextIndex) {
  if (photoIsFlipping) return;
  photoIsFlipping = true;
  photoWindow.classList.add("is-flipping");

  window.setTimeout(() => {
    photoIndex = nextIndex;
    profilePhoto.src = realPhotos[photoIndex].src;
    profilePhoto.alt = realPhotos[photoIndex].alt;
    photoCount.textContent = `${photoIndex + 1} / ${realPhotos.length}`;
  }, 300);

  window.setTimeout(() => {
    photoWindow.classList.remove("is-flipping");
    photoIsFlipping = false;
  }, 640);
}

function beginPhotoSequence() {
  window.clearTimeout(doodleTimer);
  doodleTimer = window.setTimeout(() => showPhoto(0), 2000);
}

function finishIntro() {
  document.body.classList.remove("intro-active");
  document.body.classList.add("intro-finished");
  beginPhotoSequence();
}

intro.addEventListener("animationend", (event) => {
  if (event.animationName === "lift-away") finishIntro();
});

skipButton.addEventListener("click", () => {
  intro.classList.add("is-skipped");
});

photoDeck.addEventListener("click", () => {
  window.clearTimeout(doodleTimer);
  const nextIndex = photoIndex < 0 ? 0 : (photoIndex + 1) % realPhotos.length;
  showPhoto(nextIndex);
});

const keywordsObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) return;
    keywordsSection.classList.add("is-visible");
    keywordsObserver.disconnect();
  },
  { threshold: 0.34 },
);

keywordsObserver.observe(keywordsSection);

// Replay the opening while iterating: press the R key.
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "r") return;
  intro.classList.remove("is-skipped");
  document.body.classList.add("intro-active");
  document.body.classList.remove("intro-finished");
  intro.style.animation = "none";
  void intro.offsetWidth;
  intro.style.animation = "";
});

const siteScrollCue = document.querySelector(".site-scroll-cue");

function updateScrollCue() {
  const pageCanScroll = document.documentElement.scrollHeight > window.innerHeight + 80;
  const nearPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
  siteScrollCue.classList.toggle("is-visible", pageCanScroll && !nearPageEnd);
}

siteScrollCue.addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight * .82, behavior: "smooth" });
});

window.addEventListener("scroll", updateScrollCue, { passive: true });
window.addEventListener("resize", updateScrollCue);
window.addEventListener("hashchange", () => window.requestAnimationFrame(updateScrollCue));
window.requestAnimationFrame(updateScrollCue);

// Hand-drawn, draggable travel globe.
const travelGlobeCanvas = document.querySelector(".travel-globe-canvas");

if (travelGlobeCanvas) {
  const globeStage = document.querySelector(".globe-stage");
  const pinLayer = document.querySelector(".travel-pin-layer");
  const photoBubble = document.querySelector(".travel-photo-bubble");
  const bubbleImage = photoBubble.querySelector("img");
  const bubblePlace = photoBubble.querySelector(".travel-bubble-place");
  const bubbleCount = photoBubble.querySelector(".travel-photo-count");
  const previousPhoto = photoBubble.querySelector(".travel-photo-prev");
  const nextPhoto = photoBubble.querySelector(".travel-photo-next");
  const closeBubble = photoBubble.querySelector(".travel-bubble-close");
  const placeButtons = document.querySelector(".travel-place-buttons");
  const globeContext = travelGlobeCanvas.getContext("2d");
  bubbleImage.addEventListener("load", () => {
    photoBubble.classList.toggle("is-portrait", bubbleImage.naturalHeight > bubbleImage.naturalWidth * 1.15);
  });
  const travelPlaces = [
    ["Guangzhou", 23.13, 113.26, "guangzhou", 4],
    ["Beijing", 39.9, 116.4, "beijing", 11],
    ["Shanghai", 31.23, 121.47, "shanghai", 5],
    ["Qingdao", 36.07, 120.38, "qingdao", 6],
    ["Cancun", 21.16, -86.85, "cancun", 4],
    ["Seattle", 47.61, -122.33, "seattle", 4],
    ["Yellowstone National Park", 44.6, -110.5, "yellowstone", 6],
    ["Bahamas", 25.03, -77.4, "bahamas", 7],
    ["Tokyo", 35.68, 139.65, "tokyo", 6],
    ["Montreal", 45.5, -73.57, "montreal", 11],
    ["Alaska", 64.2, -149.5, "alaska", 7],
    ["Banff", 51.18, -115.57, "banff", 5],
    ["Paris", 48.86, 2.35, "paris", 4],
    ["Barcelona", 41.38, 2.17, "barcelona", 2],
    ["Italy", 42.5, 12.5, "italy", 4],
    ["Vietnam", 16, 108, "vietnam", 2],
    ["Maldives", 3.2, 73.2, "maldives", 5],
    ["Sri Lanka", 7.87, 80.77, "sri-lanka", 2],
    ["Thailand", 15.87, 100.99, "thailand", 2],
    ["Peru", -9.19, -75.02, "peru", 8],
  ].map(([name, lat, lon, slug, count]) => ({ name, lat, lon, slug, count }));
  const continentShapes = [
    [[72,-165],[60,-135],[52,-128],[48,-123],[35,-118],[24,-105],[18,-92],[28,-82],[45,-67],[55,-58],[70,-90]],
    [[13,-81],[5,-78],[-8,-80],[-22,-71],[-43,-68],[-55,-72],[-35,-52],[-10,-35],[4,-51]],
    [[72,-10],[62,12],[55,30],[45,42],[36,26],[36,5],[44,-10],[58,-8]],
    [[36,-17],[32,10],[15,22],[-5,38],[-34,20],[-35,5],[-10,-15],[10,-17]],
    [[76,32],[70,95],[60,150],[48,155],[34,140],[22,120],[8,105],[20,78],[35,58],[50,35]],
    [[-10,112],[-20,115],[-39,145],[-32,154],[-13,141]],
  ];
  let rotationLongitude = -15;
  let rotationLatitude = -8;
  let targetLongitude = null;
  let dragging = false;
  let moved = false;
  let lastX = 0;
  let lastY = 0;
  let activePlace = null;
  let activePhoto = 0;
  let stageSize = 0;
  let globeRadius = 0;

  function photoPath(place, index) {
    return `assets/hobbies/travel/${place.slug}/${String(index + 1).padStart(2, "0")}.jpg`;
  }

  function projectPoint(lat, lon) {
    const latitude = lat * Math.PI / 180;
    const longitude = (lon + rotationLongitude) * Math.PI / 180;
    const tilt = rotationLatitude * Math.PI / 180;
    const x = Math.cos(latitude) * Math.sin(longitude);
    const baseY = -Math.sin(latitude);
    const baseZ = Math.cos(latitude) * Math.cos(longitude);
    const y = baseY * Math.cos(tilt) - baseZ * Math.sin(tilt);
    const z = baseY * Math.sin(tilt) + baseZ * Math.cos(tilt);
    return { x: stageSize / 2 + x * globeRadius, y: stageSize / 2 + y * globeRadius, z };
  }

  function drawProjectedLine(points, stroke, width, close = false, fill = null) {
    const projected = points.map(([lat, lon]) => projectPoint(lat, lon));
    globeContext.beginPath();
    let drawing = false;
    projected.forEach((point) => {
      if (point.z < -.08) { drawing = false; return; }
      globeContext[drawing ? "lineTo" : "moveTo"](point.x, point.y);
      drawing = true;
    });
    if (close && drawing) globeContext.closePath();
    if (fill) { globeContext.fillStyle = fill; globeContext.fill(); }
    globeContext.strokeStyle = stroke;
    globeContext.lineWidth = width;
    globeContext.lineCap = "round";
    globeContext.lineJoin = "round";
    globeContext.stroke();
  }

  function drawGlobe() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    globeContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    globeContext.clearRect(0, 0, stageSize, stageSize);
    const center = stageSize / 2;
    const wash = globeContext.createRadialGradient(center - globeRadius * .35, center - globeRadius * .4, globeRadius * .08, center, center, globeRadius);
    wash.addColorStop(0, "#f5fbfa");
    wash.addColorStop(.58, "#b9dce4");
    wash.addColorStop(1, "#84adba");
    globeContext.beginPath();
    globeContext.arc(center, center, globeRadius, 0, Math.PI * 2);
    globeContext.fillStyle = wash;
    globeContext.fill();
    globeContext.save();
    globeContext.beginPath();
    globeContext.arc(center, center, globeRadius - 2, 0, Math.PI * 2);
    globeContext.clip();
    for (let lat = -60; lat <= 60; lat += 20) {
      const line = [];
      for (let lon = -180; lon <= 180; lon += 4) line.push([lat, lon]);
      drawProjectedLine(line, "rgba(20,20,20,.22)", 1);
    }
    for (let lon = -180; lon < 180; lon += 20) {
      const line = [];
      for (let lat = -88; lat <= 88; lat += 3) line.push([lat, lon]);
      drawProjectedLine(line, "rgba(20,20,20,.2)", 1);
    }
    continentShapes.forEach((shape, index) => {
      drawProjectedLine(shape, "rgba(20,20,20,.72)", 2.2, true, index % 2 ? "rgba(220,232,168,.72)" : "rgba(198,224,181,.78)");
    });
    globeContext.restore();
    for (let offset = -2; offset <= 2; offset += 2) {
      globeContext.beginPath();
      globeContext.arc(center + offset * .3, center - offset * .2, globeRadius + offset * .35, 0, Math.PI * 2);
      globeContext.strokeStyle = offset === 0 ? "#171717" : "rgba(23,23,23,.38)";
      globeContext.lineWidth = offset === 0 ? 3 : 1;
      globeContext.stroke();
    }
  }

  function updateBubblePhoto() {
    if (!activePlace) return;
    bubbleImage.src = photoPath(activePlace, activePhoto);
    bubbleImage.alt = `${activePlace.name} travel photo ${activePhoto + 1}`;
    bubblePlace.textContent = activePlace.name;
    bubbleCount.textContent = `${activePhoto + 1} / ${activePlace.count}`;
  }

  function setActivePlace(place) {
    activePlace = place;
    activePhoto = 0;
    photoBubble.hidden = false;
    document.querySelectorAll(".travel-pin, .travel-place-buttons button").forEach((element) => {
      element.classList.toggle("is-active", element.dataset.place === place.slug);
    });
    updateBubblePhoto();
  }

  travelPlaces.forEach((place) => {
    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "travel-pin";
    pin.dataset.place = place.slug;
    pin.setAttribute("aria-label", `View photos from ${place.name}`);
    pin.innerHTML = `<span>${place.name}</span>`;
    pin.addEventListener("mouseenter", () => setActivePlace(place));
    pin.addEventListener("focus", () => setActivePlace(place));
    pin.addEventListener("click", () => setActivePlace(place));
    pinLayer.append(pin);
    place.pin = pin;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.place = place.slug;
    button.textContent = place.name;
    button.addEventListener("click", () => {
      targetLongitude = -place.lon;
      setActivePlace(place);
    });
    placeButtons.append(button);
  });

  function positionPins() {
    travelPlaces.forEach((place) => {
      const point = projectPoint(place.lat, place.lon);
      place.pin.style.left = `${point.x}px`;
      place.pin.style.top = `${point.y}px`;
      place.pin.style.opacity = point.z > -.02 ? "1" : "0";
      place.pin.style.pointerEvents = point.z > -.02 ? "auto" : "none";
      place.pin.style.scale = `${.78 + Math.max(0, point.z) * .32}`;
    });
    if (activePlace && !photoBubble.hidden && window.innerWidth > 600) {
      const point = projectPoint(activePlace.lat, activePlace.lon);
      photoBubble.style.left = `${Math.max(170, Math.min(stageSize - 170, point.x))}px`;
      photoBubble.style.top = `${Math.max(270, point.y)}px`;
      photoBubble.style.opacity = point.z > -.02 ? "1" : "0";
      photoBubble.style.pointerEvents = point.z > -.02 ? "auto" : "none";
    }
  }

  function resizeGlobe() {
    const visibleWidth = globeStage.getBoundingClientRect().width;
    if (visibleWidth < 10) return;
    stageSize = visibleWidth;
    globeRadius = stageSize * .4;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    travelGlobeCanvas.width = Math.round(stageSize * ratio);
    travelGlobeCanvas.height = Math.round(stageSize * ratio);
    travelGlobeCanvas.style.width = `${stageSize}px`;
    travelGlobeCanvas.style.height = `${stageSize}px`;
  }

  function animateGlobe() {
    const currentWidth = globeStage.getBoundingClientRect().width;
    if (currentWidth > 10 && Math.abs(currentWidth - stageSize) > 1) resizeGlobe();
    if (stageSize < 10) {
      window.requestAnimationFrame(animateGlobe);
      return;
    }
    if (targetLongitude !== null) {
      let difference = ((targetLongitude - rotationLongitude + 540) % 360) - 180;
      rotationLongitude += difference * .09;
      if (Math.abs(difference) < .25) targetLongitude = null;
    } else if (!dragging && !activePlace && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotationLongitude += .025;
    }
    drawGlobe();
    positionPins();
    window.requestAnimationFrame(animateGlobe);
  }

  globeStage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, .travel-photo-bubble")) return;
    dragging = true;
    moved = false;
    lastX = event.clientX;
    lastY = event.clientY;
    globeStage.classList.add("is-dragging");
    globeStage.setPointerCapture(event.pointerId);
  });
  globeStage.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 2) moved = true;
    rotationLongitude += deltaX * .35;
    rotationLatitude = Math.max(-45, Math.min(45, rotationLatitude - deltaY * .18));
    targetLongitude = null;
    lastX = event.clientX;
    lastY = event.clientY;
  });
  function finishGlobeDrag() {
    dragging = false;
    globeStage.classList.remove("is-dragging");
  }
  globeStage.addEventListener("pointerup", finishGlobeDrag);
  globeStage.addEventListener("pointercancel", finishGlobeDrag);
  photoBubble.addEventListener("pointerdown", (event) => event.stopPropagation());
  previousPhoto.addEventListener("click", () => {
    activePhoto = (activePhoto - 1 + activePlace.count) % activePlace.count;
    updateBubblePhoto();
  });
  nextPhoto.addEventListener("click", () => {
    activePhoto = (activePhoto + 1) % activePlace.count;
    updateBubblePhoto();
  });
  closeBubble.addEventListener("click", () => {
    photoBubble.hidden = true;
    activePlace = null;
    document.querySelectorAll(".travel-pin, .travel-place-buttons button").forEach((element) => element.classList.remove("is-active"));
  });
  window.addEventListener("resize", resizeGlobe);
  window.addEventListener("hashchange", () => window.requestAnimationFrame(resizeGlobe));
  resizeGlobe();
  animateGlobe();
}
