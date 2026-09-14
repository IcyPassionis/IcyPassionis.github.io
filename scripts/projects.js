const projectFilterDropdown = document.getElementById('project-filter-dropdown');
const projectFilterDropdownWrapper = document.querySelector('.project_filter-dropdown');
const projectFilterButton = document.querySelector('.project_filter-box-button');
const projectFilterButtonLabel = projectFilterButton.querySelector('span');
const projectBoxes = document.querySelectorAll('.project-box');
const projectFilterTags = document.querySelectorAll('.project_filter-tag');
const projectCountLabel = document.getElementById('project-count');

function toggleProjectFilterDropdown() {
    projectFilterDropdown.classList.toggle('show');
    projectFilterDropdownWrapper.classList.toggle('open');
}

function getSelectedProjectFilters() {
    return Array.from(document.querySelectorAll('.project_filter-tag.active')).map(tag => {
        return tag.querySelector('span:last-child').textContent.trim();
    });
}

function updateProjectFilterButtonLabel() {
    const selected = getSelectedProjectFilters();
    if (selected.length === 0) {
        projectFilterButtonLabel.textContent = 'Filter';
        projectFilterButton.removeAttribute('data-count');
    } else {
        projectFilterButtonLabel.textContent = `Filter (${selected.length})`;
        projectFilterButton.setAttribute('data-count', selected.length);
    }
}

function applyProjectFilters() {
    const selected = getSelectedProjectFilters();
    let visibleCount = 0;

    projectBoxes.forEach(box => {
        const category = box.getAttribute('data-category');

        if (selected.length === 0 || selected.includes(category)) {
            box.style.display = '';
            visibleCount++;
        } else {
            box.style.display = 'none';
        }
    });

    projectCountLabel.textContent = visibleCount;
    updateProjectFilterButtonLabel();
    updateProjectEmptyState(visibleCount);
}

function updateProjectEmptyState(visibleCount) {
    let emptyState = document.querySelector('.project_grid-empty');

    if (visibleCount === 0) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'project_grid-empty';
            emptyState.textContent = 'No projects match the selected filters.';
            document.querySelector('.project_grid-box').appendChild(emptyState);
        }
        emptyState.style.display = '';
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }
}

function clearProjectFilters(event) {
    if (event) event.stopPropagation();
    projectFilterTags.forEach(tag => tag.classList.remove('active'));
    applyProjectFilters();
}

projectFilterTags.forEach(tag => {
    tag.addEventListener('click', function(event) {
        event.stopPropagation();
        this.classList.toggle('active');
        applyProjectFilters();
    });
});

document.addEventListener('click', function(event) {
    if (!projectFilterDropdown.contains(event.target) && !projectFilterButton.contains(event.target)) {
        projectFilterDropdown.classList.remove('show');
        projectFilterDropdownWrapper.classList.remove('open');
    }
});
