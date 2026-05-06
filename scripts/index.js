const filterDropdown = document.getElementById('skill-filter-dropdown');
const filterDropdownWrapper = document.querySelector('.skill_filter-dropdown');
const filterButton = document.querySelector('.skill_filter-box-button');
const filterButtonLabel = filterButton.querySelector('span');
const skillBoxes = document.querySelectorAll('.skill-box');
const filterTags = document.querySelectorAll('.skill_filter-tag');

function toggleFilterDropdown() {
    filterDropdown.classList.toggle('show');
    filterDropdownWrapper.classList.toggle('open');
}

function getSelectedFilters() {
    return Array.from(document.querySelectorAll('.skill_filter-tag.active')).map(tag => {
        return tag.querySelector('span:last-child').textContent.trim();
    });
}

function updateFilterButtonLabel() {
    const selected = getSelectedFilters();
    if (selected.length === 0) {
        filterButtonLabel.textContent = 'Filter';
        filterButton.removeAttribute('data-count');
    } else {
        filterButtonLabel.textContent = `Filter (${selected.length})`;
        filterButton.setAttribute('data-count', selected.length);
    }
}

function applyFilters() {
    const selected = getSelectedFilters();
    let visibleCount = 0;

    skillBoxes.forEach(box => {
        const tagEl = box.querySelector('.skill-text-tag');
        const tagText = tagEl ? tagEl.textContent.trim() : '';

        if (selected.length === 0 || selected.includes(tagText)) {
            box.style.display = '';
            visibleCount++;
        } else {
            box.style.display = 'none';
        }
    });

    updateFilterButtonLabel();
    updateEmptyState(visibleCount);
}

function updateEmptyState(visibleCount) {
    let emptyState = document.querySelector('.skill_grid-empty');

    if (visibleCount === 0) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'skill_grid-empty';
            emptyState.textContent = 'No skills match the selected filters.';
            document.querySelector('.skill_grid-box').appendChild(emptyState);
        }
        emptyState.style.display = '';
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }
}

function clearFilters(event) {
    if (event) event.stopPropagation();
    filterTags.forEach(tag => tag.classList.remove('active'));
    applyFilters();
}

filterTags.forEach(tag => {
    tag.addEventListener('click', function(event) {
        event.stopPropagation();
        this.classList.toggle('active');
        applyFilters();
    });
});

document.addEventListener('click', function(event) {
    const button = document.querySelector('.skill_filter-box-button');
    if (!filterDropdown.contains(event.target) && !button.contains(event.target)) {
        filterDropdown.classList.remove('show');
        filterDropdownWrapper.classList.remove('open');
    }
});

const mobileMenuButton = document.getElementById('navbar_mobile-menu');
const mobileDropdown = document.getElementById('navbar_mobile-dropdown');

if (mobileMenuButton && mobileDropdown) {
    mobileMenuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        mobileDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        if (!mobileDropdown.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileDropdown.classList.remove('open');
        }
    });
}

async function fetchYouTubeTitle(videoId) {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.title;
    } catch (error) {
        console.error('Failed to fetch YouTube title:', error);
        return null;
    }
}

function loadMusicTitles() {
    document.querySelectorAll('.music-title[data-youtube-id]').forEach(async (el) => {
        const videoId = el.getAttribute('data-youtube-id');
        const title = await fetchYouTubeTitle(videoId);
        if (title) {
            el.textContent = title;
        } else {
            el.textContent = 'YouTube Music';
        }
    });
}

loadMusicTitles();
