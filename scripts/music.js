const musicTracks = [
    {
        title: 'The Place Reality Forgot',
        youtubeId: '_pEc_9Gws8I',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/the-place-reality-forgot',
        uploadDate: '2026-09-24T00:40:26Z'
    },
    {
        title: 'Rekindle',
        youtubeId: 'f90fbPd6aFs',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/first-rekindle',
        uploadDate: '2025-12-24T20:21:22Z'
    },
    {
        title: 'Disphotic',
        youtubeId: '8CsbO_W1eUo',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/disphotic',
        uploadDate: '2025-12-29T23:22:27Z'
    },
    {
        title: 'Evoke',
        youtubeId: 'a-hI3upOhWY',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/evoke',
        uploadDate: '2026-04-19T18:21:18Z'
    },
    {
        title: 'Benthic',
        youtubeId: 'qjI0s9LAnkA',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/benthic',
        uploadDate: '2026-05-04T01:30:12Z'
    },
    {
        title: 'Cycle Of Despair',
        youtubeId: 'uF5YiOCPthg',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/cycle-of-despair',
        uploadDate: '2026-05-04T02:20:58Z'
    },
    {
        title: 'Beyond The Last Light',
        youtubeId: 'OoMa2Mz-bF4',
        soundcloudUrl: 'https://soundcloud.com/icypassionis/beyond-the-last-light',
        uploadDate: '2026-08-20T14:34:13Z'
    }
];

const musicGrid = document.querySelector('.music_grid-box');
const musicSortDropdown = document.getElementById('music-sort-dropdown');
const musicSortWrapper = document.querySelector('.music_sort-dropdown');
const musicSortButton = document.querySelector('.music_sort-dropdown .skill_filter-box-button');
const musicSortButtonLabel = musicSortButton ? musicSortButton.querySelector('span') : null;
const musicSortTags = document.querySelectorAll('.music_sort-tag');

let currentSort = 'new-old';

function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

function sortTracks(tracks) {
    const sorted = [...tracks];
    if (currentSort === 'new-old') {
        sorted.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (currentSort === 'old-new') {
        sorted.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    } else if (currentSort === 'name') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
}

function createTrackCard(track, index) {
    const card = document.createElement('div');
    card.className = 'music-box music-entrance';
    card.style.animationDelay = `${index * 0.06}s`;

    const thumbnail = document.createElement('div');
    thumbnail.className = 'music-thumbnail';
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${track.youtubeId}/maxresdefault.jpg`;
    img.alt = `${track.title} Thumbnail`;
    thumbnail.appendChild(img);

    const content = document.createElement('div');
    content.className = 'music-content';

    const title = document.createElement('h3');
    title.className = 'music-title';
    title.textContent = track.title;

    const date = document.createElement('div');
    date.className = 'music-upload-date';
    date.textContent = `Uploaded: ${formatDate(track.uploadDate)}`;

    const platforms = document.createElement('div');
    platforms.className = 'music-platforms';

    const ytLink = document.createElement('a');
    ytLink.href = `https://www.youtube.com/watch?v=${track.youtubeId}`;
    ytLink.target = '_blank';
    ytLink.rel = 'noopener noreferrer';
    ytLink.className = 'music-platform-button music-platform-youtube';
    ytLink.setAttribute('aria-label', `${track.title} on YouTube`);
    ytLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z"/></svg>';

    const scLink = document.createElement('a');
    scLink.href = track.soundcloudUrl;
    scLink.target = '_blank';
    scLink.rel = 'noopener noreferrer';
    scLink.className = 'music-platform-button music-platform-soundcloud';
    scLink.setAttribute('aria-label', `${track.title} on SoundCloud`);
    scLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 11h1c1.38 0 3 1.274 3 3c0 1.657 -1.5 3 -3 3l-6 0v-10c3 0 4.5 1.5 5 4"/><path d="M9 8l0 9"/><path d="M6 17l0 -7"/><path d="M3 16l0 -2"/></svg>';

    platforms.appendChild(ytLink);
    platforms.appendChild(scLink);

    content.appendChild(title);
    content.appendChild(date);
    content.appendChild(platforms);

    card.appendChild(thumbnail);
    card.appendChild(content);
    return card;
}

function renderMusic() {
    musicGrid.innerHTML = '';
    sortTracks(musicTracks).forEach((track, index) => {
        musicGrid.appendChild(createTrackCard(track, index));
    });
}

function toggleSortDropdown() {
    musicSortDropdown.classList.toggle('show');
    musicSortWrapper.classList.toggle('open');
}

function updateSortLabel(label) {
    if (musicSortButtonLabel) {
        musicSortButtonLabel.textContent = label;
    }
}

musicSortTags.forEach(tag => {
    tag.addEventListener('click', function(event) {
        event.stopPropagation();
        musicSortTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentSort = this.getAttribute('data-sort');
        updateSortLabel(this.querySelector('span:last-child').textContent.trim());
        renderMusic();
    });
});

document.addEventListener('click', function(event) {
    if (!musicSortWrapper.contains(event.target)) {
        musicSortDropdown.classList.remove('show');
        musicSortWrapper.classList.remove('open');
    }
});

renderMusic();
