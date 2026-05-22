/* 
   SPOTIFY CLONE – script.js
   Covers: 1-14  |  Songs: 18  */

// ── Song Data ──────────────────────────────────────────────
const songs = [
    { songName: "Dhup Chaya",               artist: "Warfaze",                  filePath: "songs/1.1.mp3",  coverPath: "covers.jpg/1.jpg"  },
    { songName: "Asha",                     artist: "Warfaze",                  filePath: "songs/1.2.mp3",  coverPath: "covers.jpg/1.jpg"  },
    { songName: "Hansnuhana",               artist: "Fossils / Rupam Islam",    filePath: "songs/2.1.mp3",  coverPath: "covers.jpg/2.jpg"  },
    { songName: "Ekla Ghor",                artist: "Rupam Islam",              filePath: "songs/2.2.mp3",  coverPath: "covers.jpg/2.jpg"  },
    { songName: "FE!N",                     artist: "Travis Scott",             filePath: "songs/3.mp3",    coverPath: "covers.jpg/3.jpg"  },
    { songName: "Summertime Sadness",       artist: "Lana Del Rey",             filePath: "songs/4.mp3",    coverPath: "covers.jpg/4.jpg"  },
    { songName: "BIRDS OF A FEATHER",       artist: "Billie Eilish",            filePath: "songs/5.1.mp3",  coverPath: "covers.jpg/5.jpg"  },
    { songName: "Hotline",                  artist: "Billie Eilish",            filePath: "songs/5.2.mp3",  coverPath: "covers.jpg/5.jpg"  },
    { songName: "Blinding Lights",          artist: "The Weeknd",               filePath: "songs/6.1.mp3",  coverPath: "covers.jpg/6.jpg"  },
    { songName: "Starboy",                  artist: "The Weeknd",               filePath: "songs/6.2.mp3",  coverPath: "covers.jpg/6.jpg"  },
    { songName: "Lover, You Should've Come Over", artist: "Jeff Buckley",       filePath: "songs/7.mp3",    coverPath: "covers.jpg/7.jpg"  },
    { songName: "SWIM",                     artist: "Chase Atlantic",           filePath: "songs/8.mp3",    coverPath: "covers.jpg/8.jpg"  },
    { songName: "Shunno",                   artist: "Tanveer Evan",             filePath: "songs/9.mp3",    coverPath: "covers.jpg/9.jpg"  },
    { songName: "Ei Obelay",                artist: "Shironamhin",              filePath: "songs/10.mp3",   coverPath: "covers.jpg/10.jpg" },
    { songName: "Smells Like Teen Spirit",  artist: "Nirvana",                  filePath: "songs/11.mp3",   coverPath: "covers.jpg/11.jpg" },
    { songName: "High Hopes",               artist: "Pink Floyd",               filePath: "songs/12.mp3",   coverPath: "covers.jpg/12.jpg" },
    { songName: "She Je Boshe Ache",        artist: "Arnob",                    filePath: "songs/13.mp3",   coverPath: "covers.jpg/13.jpg" },
    { songName: "Prithibi Ta Naki Chhoto",  artist: "Moheener Ghoraguli",       filePath: "songs/14.mp3",   coverPath: "covers.jpg/14.jpg" },
];

// ── Cover Albums (groups songs by cover image) ──────────────
const covers = [
    { id: 1,  name: "Warfaze",              genre: "music", songIndices: [0, 1]   },
    { id: 2,  name: "Fossils / Rupam Islam",genre: "music", songIndices: [2, 3]   },
    { id: 3,  name: "Travis Scott",         genre: "music", songIndices: [4]      },
    { id: 4,  name: "Lana Del Rey",         genre: "music", songIndices: [5]      },
    { id: 5,  name: "Billie Eilish",        genre: "music", songIndices: [6, 7]   },
    { id: 6,  name: "The Weeknd",           genre: "music", songIndices: [8, 9]   },
    { id: 7,  name: "Jeff Buckley",         genre: "music", songIndices: [10]     },
    { id: 8,  name: "Chase Atlantic",       genre: "music", songIndices: [11]     },
    { id: 9,  name: "Tanveer Evan",         genre: "music", songIndices: [12]     },
    { id: 10, name: "Shironamhin",          genre: "music", songIndices: [13]     },
    { id: 11, name: "Nirvana",              genre: "music", songIndices: [14]     },
    { id: 12, name: "Pink Floyd",           genre: "music", songIndices: [15]     },
    { id: 13, name: "Arnob",               genre: "music", songIndices: [16]     },
    { id: 14, name: "Moheener Ghoraguli",    genre: "music", songIndices: [17]     },
];

// ── State ───────────────────────────────────────────────────
let songIndex   = 0;
let isPlaying   = false;
let isMuted     = false;
let prevVolume  = 80;
let currentFilter = "all";

const audio = new Audio();
audio.volume = 0.8;

// ── DOM References ───────────────────────────────────────────
const coversGrid      = document.getElementById('coversGrid');
const masterPlay      = document.getElementById('masterPlay');
const playIcon        = document.getElementById('playIcon');
const pauseIcon       = document.getElementById('pauseIcon');
const prevBtn         = document.getElementById('previous');
const nextBtn         = document.getElementById('next');
const progressBar     = document.getElementById('myProgressBar');
const currentTimeEl   = document.getElementById('currentTime');
const totalTimeEl     = document.getElementById('totalTime');
const masterSongName  = document.getElementById('masterSongName');
const masterArtistName= document.getElementById('masterArtistName');
const playerCover     = document.getElementById('playerCover');
const playerThumbPlaceholder = document.getElementById('playerThumbPlaceholder');
const volumeBar       = document.getElementById('volumeBar');
const volumeBtn       = document.getElementById('volumeBtn');
const volHighIcon     = document.getElementById('volHighIcon');
const volLowIcon      = document.getElementById('volLowIcon');
const volMuteIcon     = document.getElementById('volMuteIcon');
const fullscreenBtn   = document.getElementById('fullscreenBtn');
const fsEnterIcon     = document.getElementById('fsEnterIcon');
const fsExitIcon      = document.getElementById('fsExitIcon');
const searchInput     = document.getElementById('searchInput');
const clearSearch     = document.getElementById('clearSearch');
const noResults       = document.getElementById('noResults');
const pillAll         = document.getElementById('pill-all');
const pillMusic       = document.getElementById('pill-music');

function renderCovers(filterText = '', filterGenre = 'all') {
    coversGrid.innerHTML = '';
    const query = filterText.trim().toLowerCase();
    let visible = 0;

    covers.forEach(cover => {
        const matchText = !query ||
            cover.name.toLowerCase().includes(query) ||
            songs[cover.songIndices[0]].songName.toLowerCase().includes(query) ||
            songs[cover.songIndices[0]].artist.toLowerCase().includes(query);

        const matchGenre = filterGenre === 'all' || cover.genre === filterGenre;

        if (!matchText || !matchGenre) return;
        visible++;

        const isActive = cover.songIndices.includes(songIndex) && isPlaying;
        const card = document.createElement('div');
        card.className = 'cover-card' + (isActive ? ' active-card' : '');
        card.dataset.coverId = cover.id;

        card.innerHTML = `
            <div class="cover-img-wrap">
                <img class="cover-img" src="${songs[cover.songIndices[0]].coverPath}"
                     alt="${cover.name}" loading="lazy">
                <div class="cover-play-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
            <span class="cover-name">${cover.name}</span>
            <span class="cover-subname">${cover.songIndices.length > 1
                ? cover.songIndices.length + ' songs'
                : songs[cover.songIndices[0]].songName}</span>
        `;

        card.addEventListener('click', () => playCover(cover));
        coversGrid.appendChild(card);
    });

    noResults.style.display = visible === 0 ? 'flex' : 'none';
}


function playSong(index, autoPlay = true) {
    if (index < 0 || index >= songs.length) return;
    songIndex = index;
    const song = songs[songIndex];

    audio.src = song.filePath;
    audio.currentTime = 0;

    // Update player UI
    masterSongName.textContent   = song.songName;
    masterArtistName.textContent = song.artist;

    // Update cover thumbnail
    playerCover.src = song.coverPath;
    playerCover.classList.remove('loaded');
    playerThumbPlaceholder.style.display = 'flex';
    playerCover.onload = () => {
        playerCover.classList.add('loaded');
        playerThumbPlaceholder.style.display = 'none';
    };

    progressBar.value = 0;
    updateProgressStyle(0);
    currentTimeEl.textContent = '0:00';
    totalTimeEl.textContent   = '0:00';

    if (autoPlay) {
        audio.play().catch(() => {});
        setPlayState(true);
    } else {
        setPlayState(false);
    }

    // Refresh active states on covers grid
    document.querySelectorAll('.cover-card').forEach(card => {
        const cov = covers.find(c => c.id == card.dataset.coverId);
        if (cov && cov.songIndices.includes(songIndex)) {
            card.classList.add('active-card');
        } else {
            card.classList.remove('active-card');
        }
    });
}

function playCover(cover) {
    // If same cover is already playing, toggle play/pause
    if (cover.songIndices.includes(songIndex) && audio.src) {
        togglePlayPause();
        return;
    }
    playSong(cover.songIndices[0]);
}

function setPlayState(playing) {
    isPlaying = playing;
    playIcon.style.display  = playing ? 'none'  : 'block';
    pauseIcon.style.display = playing ? 'block' : 'none';
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play().catch(() => {});
        setPlayState(true);
    } else {
        audio.pause();
        setPlayState(false);
    }
}


masterPlay.addEventListener('click', () => {
    if (!audio.src) {
        playSong(0);
    } else {
        togglePlayPause();
    }
});

prevBtn.addEventListener('click', () => {
    // If more than 3s in, restart current; else go to previous
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        const prev = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
        playSong(prev);
    }
});

nextBtn.addEventListener('click', () => {
    const next = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    playSong(next);
});

// Auto-advance on end
audio.addEventListener('ended', () => {
    const next = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    playSong(next);
});


audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.value = pct;
    updateProgressStyle(pct);
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
    const val = parseFloat(progressBar.value);
    updateProgressStyle(val);
    if (audio.duration) {
        audio.currentTime = (val / 100) * audio.duration;
    }
});

function updateProgressStyle(pct) {
    progressBar.style.setProperty('--progress', pct + '%');
}

volumeBar.addEventListener('input', () => {
    const val = parseInt(volumeBar.value);
    audio.volume  = val / 100;
    isMuted       = val === 0;
    prevVolume    = val > 0 ? val : prevVolume;
    updateVolumeStyle(val);
    updateVolIcon(val);
});

volumeBtn.addEventListener('click', () => {
    if (!isMuted && audio.volume > 0) {
        // Mute
        prevVolume   = volumeBar.value;
        audio.volume = 0;
        volumeBar.value = 0;
        isMuted = true;
    } else {
        // Unmute
        const restore = prevVolume > 0 ? prevVolume : 50;
        audio.volume    = restore / 100;
        volumeBar.value = restore;
        isMuted = false;
    }
    updateVolumeStyle(volumeBar.value);
    updateVolIcon(volumeBar.value);
});

function updateVolumeStyle(val) {
    volumeBar.style.setProperty('--vol', val + '%');
}

function updateVolIcon(val) {
    val = parseInt(val);
    volHighIcon.style.display = val > 30  ? 'block' : 'none';
    volLowIcon.style.display  = (val > 0 && val <= 30) ? 'block' : 'none';
    volMuteIcon.style.display = val === 0 ? 'block' : 'none';
}

// Init volume style
updateVolumeStyle(80);
updateVolIcon(80);

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen().catch(() => {});
    }
});

document.addEventListener('fullscreenchange', () => {
    const isFS = !!document.fullscreenElement;
    fsEnterIcon.style.display = isFS ? 'none'  : 'block';
    fsExitIcon.style.display  = isFS ? 'block' : 'none';
});


searchInput.addEventListener('input', () => {
    const q = searchInput.value;
    clearSearch.style.display = q ? 'flex' : 'none';
    renderCovers(q, currentFilter);
});

clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    searchInput.focus();
    renderCovers('', currentFilter);
});


[pillAll, pillMusic].forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderCovers(searchInput.value, currentFilter);
    });
});


function formatTime(secs) {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

renderCovers();
console.log('🎵 Spotify Clone loaded –', songs.length, 'songs ready.');

const aboutOverlay = document.getElementById('aboutOverlay');
const aboutClose   = document.getElementById('aboutClose');
const navAbout     = document.getElementById('navAbout');
const navHome      = document.getElementById('navHome');

function openAbout() {
    aboutOverlay.classList.add('open');
    navAbout.classList.add('active');
    navHome.classList.remove('active');
    document.body.style.overflow = 'hidden';
}

function closeAbout() {
    aboutOverlay.classList.remove('open');
    navAbout.classList.remove('active');
    navHome.classList.add('active');
    document.body.style.overflow = '';
}

navAbout.addEventListener('click', openAbout);
navHome.addEventListener('click', closeAbout);
aboutClose.addEventListener('click', closeAbout);


aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay) closeAbout();
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAbout();
});