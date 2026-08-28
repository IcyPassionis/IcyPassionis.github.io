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

const languageWrapper = document.querySelector('.navbar-language');
const languageButton = document.getElementById('navbar_language-button');
const languageDropdown = document.getElementById('navbar_language-dropdown');
const languageCurrent = document.getElementById('navbar_language-current');
const languageOptions = document.querySelectorAll('.navbar-language-option');

if (languageButton && languageDropdown) {
    languageButton.addEventListener('click', function(event) {
        event.stopPropagation();
        languageWrapper.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        if (!languageDropdown.contains(event.target) && !languageButton.contains(event.target)) {
            languageWrapper.classList.remove('open');
        }
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            languageCurrent.textContent = this.dataset.language.toUpperCase();
            languageWrapper.classList.remove('open');
        });
    });
}
