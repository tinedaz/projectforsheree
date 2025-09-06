// Function to handle the initial verification step
function checkVerification() {
    const passwordInput = document.getElementById('verificationInput');
    const errorMessage = document.getElementById('verificationErrorMessage');
    const correctPassword = 'chewy';

    if (passwordInput.value.toLowerCase().trim() === correctPassword) {
        // Correct answer, hide verification and start loading
        const verificationScreen = document.getElementById('verification-screen');
        verificationScreen.style.opacity = '0';

        setTimeout(() => {
            verificationScreen.style.display = 'none';
            startLoading();
        }, 600);

    } else {
        // Wrong answer, show error message
        errorMessage.textContent = 'wrong answer! try again.';
        errorMessage.style.color = '#ff6b6b';
        passwordInput.value = '';

        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2500);
    }
}

// New function to handle the loading screen sequence
function startLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.style.display = 'flex';
    
    setTimeout(() => {
        loadingScreen.style.opacity = '1';
        
        // Show loading screen for 3 seconds, then show main content
        setTimeout(function() {
            // Hide loading screen
            loadingScreen.style.opacity = '0';
            
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                
                // Show main content with first intro screen
                mainContent.style.display = 'flex';
                mainContent.style.opacity = '1';
                
                // Make sure first intro screen is visible
                const introScreen1 = document.getElementById('intro-screen-1');
                introScreen1.style.display = 'flex';
                introScreen1.style.opacity = '1';
            }, 1000); // Wait for fade out
            
        }, 3000); // Show loading for 3 seconds
        
    }, 100);
}

// Function to navigate between intro screens
function goToIntroScreen(screenNumber) {
    // Find currently visible intro screen
    const currentScreen = document.querySelector('.intro-screen[style*="opacity: 1"]') || 
                         document.querySelector('.intro-screen:not([style*="display: none"])');
    
    const targetScreen = document.getElementById(`intro-screen-${screenNumber}`);
    
    if (currentScreen && targetScreen && currentScreen !== targetScreen) {
        // Fade out current screen
        currentScreen.style.opacity = '0';
        
        setTimeout(() => {
            // Hide current screen
            currentScreen.style.display = 'none';
            
            // Show target screen
            targetScreen.style.display = 'flex';
            
            setTimeout(() => {
                targetScreen.style.opacity = '1';
            }, 100);
            
        }, 600);
    }
}

function start() {
    // Hide all intro screens and show main navigation
    const introScreens = document.querySelectorAll('.intro-screen');
    const currentIntroScreen = document.querySelector('.intro-screen[style*="opacity: 1"]') || 
                              document.querySelector('.intro-screen:not([style*="display: none"])');
    
    if (currentIntroScreen) {
        currentIntroScreen.style.opacity = '0';
        
        setTimeout(() => {
            // Hide all intro screens
            introScreens.forEach(screen => {
                screen.style.display = 'none';
            });
            
            // Create the main navigation content
            const newContent = document.createElement('div');
            newContent.className = 'second-section';
            newContent.innerHTML = `
                <button class="back-btn" onclick="goBackToIntro()">← back</button>
                <div class="navigation-image">
                    <img src="resources/sheree_pic1.jpg" alt="sheree" class="sheree-nav-pic">
                </div>
                <h2 class="second-text">where to go, miss sheree?</h2>
                <div class="button-container">
                    <button class="btn choice-btn" onclick="handleChoice(1)">letter</button>
                    <button class="btn choice-btn" onclick="handleChoice(2)">moments</button>
                    <button class="btn choice-btn" onclick="handleChoice(3)">playlist</button>
                    <button class="btn choice-btn" onclick="handleChoice(4)">gift</button>
                </div>
            `;
            
            // Add the new content to the main-content div
            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(newContent);
            
            // Fade in the new content
            setTimeout(() => {
                newContent.style.opacity = '1';
            }, 100);
            
        }, 600);
    }
}

function goBackToIntro() {
    // Remove the second section
    const secondSection = document.querySelector('.second-section');
    if (secondSection) {
        secondSection.style.opacity = '0';
        
        setTimeout(() => {
            secondSection.remove();
            
            // Show the last intro screen (screen 3)
            const lastIntroScreen = document.getElementById('intro-screen-3');
            lastIntroScreen.style.display = 'flex';
            
            setTimeout(() => {
                lastIntroScreen.style.opacity = '1';
            }, 100);
            
        }, 600);
    }
}

function handleChoice(choice) {
    if (choice === 1) {
        showLetterQuestion();
    } else if (choice === 2) {
        showMomentsSection();
    } else if (choice === 3) {
        showPlaylistSection();
    }
    else if (choice === 4) {
        showGiftSection();
    }
}

function showLetterQuestion() {
    const secondSection = document.querySelector('.second-section');
    secondSection.style.opacity = '0';
    
    setTimeout(() => {
        secondSection.style.display = 'none';
        
        const questionSection = document.createElement('div');
        questionSection.className = 'question-section';
        questionSection.innerHTML = `
            <button class="back-btn" onclick="goBack()">← back</button>
            <div class="question-content">
                <h2 class="question-text">answer this question to unlock the letter:</h2>
                <input type="text" class="answer-input" id="answerInput" placeholder="name of our plushy">
                <button class="btn submit-btn" onclick="checkAnswer()">submit</button>
                <p class="error-message" id="errorMessage"></p>
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(questionSection);
        
        setTimeout(() => {
            questionSection.style.opacity = '1';
        }, 100);
        
    }, 600);
}

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.toLowerCase().trim();
    const correctAnswer = 'kfc';
    
    if (userAnswer === correctAnswer) {
        showLetter();
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'wrong answer! try again.';
        errorMessage.style.color = '#ff6b6b';
        document.getElementById('answerInput').value = '';
        
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
}

function showLetter() {
    const questionSection = document.querySelector('.question-section');
    questionSection.style.opacity = '0';
    
    setTimeout(() => {
        questionSection.style.display = 'none';
        
        const letterSection = document.createElement('div');
        letterSection.className = 'letter-section';
        letterSection.innerHTML = `
            <button class="back-btn" onclick="goBack()">← back</button>
            <div class="letter" id="letterBox">
                <p id="typedText"></p>
                <img src="resources/signature.png" alt="Signature" class="signature-img">
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(letterSection);
        
        setTimeout(() => {
            letterSection.style.opacity = '1';
            typeWriterEffect();
        }, 100);
        
    }, 600);
}

const message = `Lorr Sheree, my baby, I hope you’re doing good today. But if you’re not, I’ll be right here, whatever you feel, I’ll feel it with you.

Something struck me. I’m still protecting myself and think you’re giving me less. But you’re not; it’s just me thinking about it. Because when I think of it, you’re actually giving more. That hits me, and I realized that I’m not just a guy in your life but someone with a place in your life. That changes my perspective, and I feel more in love with you. I assure you once again that everything will be alright, and I’ll show more and make you feel more loved from now on.

I know I’ve not been doing well for us in the past few days, and I’m sorry I didn’t notice you last time.
I’ll make bawi my baby, okay? Trust me. Please hug na and kiss na :( I miss you so much, Sheree.`;

function typeWriterEffect() {
    const typedText = document.getElementById("typedText");
    const signatureImg = document.querySelector(".signature-img");
    let i = 0;
    
    // Hide signature initially
    signatureImg.style.opacity = '0';

    function typeWriter() {
        if (i < message.length) {
            typedText.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else {
            // Typing is complete, now show the signature
            setTimeout(() => {
                signatureImg.style.opacity = '1';
            }, 500); // 500ms delay after typing finishes
        }
    }
    typeWriter();
}

function goBack() {
    const questionSection = document.querySelector('.question-section');
    const letterSection = document.querySelector('.letter-section');
    const momentsSection = document.querySelector('.moments-section');
    const existingSecondSection = document.querySelector('.second-section');
    const playlistSection = document.querySelector('.playlist-section');
    const giftSection = document.querySelector('.gift-section');
    
    if (questionSection) questionSection.remove();
    if (letterSection) letterSection.remove();
    if (momentsSection) momentsSection.remove();
    if (existingSecondSection) existingSecondSection.remove();
    if (playlistSection) playlistSection.remove();
    if (giftSection) giftSection.remove();
    
    const secondSection = document.createElement('div');
    secondSection.className = 'second-section';
    secondSection.innerHTML = `
        <button class="back-btn" onclick="goBackToIntro()">← back</button>
        <div class="navigation-image">
            <img src="resources/sheree_pic1.jpg" alt="sheree" class="sheree-nav-pic">
        </div>
        <h2 class="second-text">where to go, miss sheree?</h2>
        <div class="button-container">
            <button class="btn choice-btn" onclick="handleChoice(1)">letter</button>
            <button class="btn choice-btn" onclick="handleChoice(2)">moments</button>
            <button class="btn choice-btn" onclick="handleChoice(3)">playlist</button>
            <button class="btn choice-btn" onclick="handleChoice(4)">gift</button>
        </div>
    `;
    
    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(secondSection);
    
    setTimeout(() => {
        secondSection.style.opacity = '1';
    }, 100);
}

function showMomentsSection() {
    const secondSection = document.querySelector('.second-section');
    secondSection.style.opacity = '0';
    
    setTimeout(() => {
        secondSection.style.display = 'none';
        
        const momentsSection = document.createElement('div');
        momentsSection.className = 'moments-section';
        momentsSection.innerHTML = `
            <button class="back-btn" onclick="goBack()">← back</button>
            <h2 class="moments-title">moments</h2>
            <div class="moments-nav">
                <button class="moments-nav-btn active" onclick="showMomentsCategory('dazz dgc')">dazz dgc</button>
                <button class="moments-nav-btn" onclick="showMomentsCategory('online')">online</button>
                <button class="moments-nav-btn" onclick="showMomentsCategory('facts')">facts</button>
                <button class="moments-nav-btn" onclick="showMomentsCategory('first meet')">first meet</button>
            </div>
            <div class="gallery-container" id="galleryContainer">
                </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(momentsSection);
        
        setTimeout(() => {
            momentsSection.style.opacity = '1';
            // Load default category
            showMomentsCategory('dazz dgc');
        }, 100);
        
    }, 600);
}

function showMomentsCategory(category) {
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.moments-nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    const galleryContainer = document.getElementById('galleryContainer');
    
    if (category === 'facts') {
        // Show facts content instead of gallery
        galleryContainer.innerHTML = `
            <div class="facts-content">
                <div class="fact-item">
                    <h3>Fun Fact #1</h3>
                    <p>80+ days na sana tiktok streak natin, na-end nang 2 beses</p>
                </div>
                <div class="fact-item">
                    <h3>Fun Fact #2</h3>
                    <p>I added you first sa FB, hindi mo 'ko inaccept agad</p>
                </div>
                <div class="fact-item">
                    <h3>Fun Fact #3</h3>
                    <p>Sa sobrang pagka-miss ko sayo, iniyakan kita</p>
                </div>
                <div class="fact-item">
                    <h3>Kinabahan moments</h3>
                    <p>Nung nag-cr tayo after ng sinehan, I can't find my phone, nag-panic ako kasi parang tinanggal sa cord. Tas ayun nasa maliit lang pala na zipper hehe.</p>
                </div>
                </div>
                <div class="fact-item">
                    <h3>Random Fact</h3>
                    <p>Since nung inunan ko si KFC, mas sumarap yung tulog ko.</p>
                </div>
                <div class="fact-item">
                    <h3>Random Fact</h3>
                    <p>Kapag miss kita, I spray a little bit sa wrist nung binigay mo saking pabango.</p>
                </div>
            </div>
        `;
    } else {
        // Show gallery for other categories
        const galleryHTML = `
            <div class="photo-gallery">
                ${generateGalleryPhotos(category)}
            </div>
        `;
        galleryContainer.innerHTML = galleryHTML;
    }
}

// Image paths for different categories
const imageData = {
    'dazz dgc': [
        'resources/dgc1.png',
        'resources/dgc2.png',
        'resources/dgc3.png',
        'resources/dgc4.png',
        'resources/dgc5.png',
        'resources/dgc6.png',
        'resources/dgc7.png',
        'resources/dgc8.png'
    ],
    'online': [
        'resources/online1.jpg',
        'resources/online2.jpg',
        'resources/online3.jpg',
        'resources/online4.jpg',
        'resources/online5.jpg',
        'resources/online6.jpg',
        'resources/online7.jpg',
        'resources/online8.png',
        'resources/online9.png',
        'resources/online10.png',
        'resources/online11.jpg',
        'resources/online12.png'
    ],
     'first meet': [
        // Corrected image paths for the 'first meet' category
        'resources/firstmeet/fm1.jpg',
        'resources/firstmeet/fm2.jpg',
        'resources/firstmeet/fm3.jpg',
        'resources/firstmeet/fm4.jpg',
        'resources/firstmeet/fm5.jpg',
        'resources/firstmeet/fm6.jpg',
        'resources/firstmeet/fm7.jpg',
        'resources/firstmeet/fm8.jpg'
    ]
};

function generateGalleryPhotos(category) {
    const images = imageData[category] || [];
    const photoCount = category === 'online' ? 12 : 8; // 12 photos for online, 8 for others
    let photosHTML = '';
    
    for (let i = 0; i < photoCount; i++) {
        if (images[i]) {
            // Use real image
            photosHTML += `
                <div class="photo-item" onclick="openPhotoModal('${category}', ${i + 1})">
                    <img src="${images[i]}" alt="${category} photo ${i + 1}" class="gallery-photo">
                </div>
            `;
        } else {
            // Use placeholder if image doesn't exist
            photosHTML += `
                <div class="photo-item" onclick="openPhotoModal('${category}', ${i + 1})">
                    <div class="placeholder-photo">
                        <div class="photo-placeholder-content">
                            <span>${category}</span>
                            <span>Photo ${i + 1}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    return photosHTML;
}

function openPhotoModal(category, photoNumber) {
    const images = imageData[category] || [];
    const imageSrc = images[photoNumber - 1];
    const totalPhotos = category === 'online' ? 12 : 8;
    
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    
    let photoContent;
    if (imageSrc) {
        photoContent = `<img src="${imageSrc}" alt="${category} photo ${photoNumber}" class="modal-image">`;
    } else {
        photoContent = `
            <div class="placeholder-photo large">
                <div class="photo-placeholder-content">
                    <span>${category}</span>
                    <span>Photo ${photoNumber}</span>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePhotoModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closePhotoModal()">×</button>
                <div class="modal-photo">
                    ${photoContent}
                </div>
                <div class="modal-nav">
                    <button class="modal-nav-btn" onclick="navigatePhoto('${category}', ${photoNumber}, -1)">‹</button>
                    <span class="photo-counter">${photoNumber} / ${totalPhotos}</span>
                    <button class="modal-nav-btn" onclick="navigatePhoto('${category}', ${photoNumber}, 1)">›</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function navigatePhoto(category, currentPhoto, direction) {
    const totalPhotos = category === 'online' ? 12 : 8;
    const newPhoto = currentPhoto + direction;
    if (newPhoto >= 1 && newPhoto <= totalPhotos) {
        closePhotoModal();
        setTimeout(() => {
            openPhotoModal(category, newPhoto);
        }, 300);
    }
}

function showPlaylistSection() {
    const secondSection = document.querySelector('.second-section');
    secondSection.style.opacity = '0';
    
    setTimeout(() => {
        secondSection.style.display = 'none';
        
        const playlistSection = document.createElement('div');
        playlistSection.className = 'playlist-section';
        playlistSection.innerHTML = `
            <button class="back-btn" onclick="goBack()">← back</button>
            <h2 class="playlist-title">kumbaga i miss you playlist</h2>
            <div class="spotify-container">
                <div class="spotify-image-wrapper">
                    <img src="resources/spotify_playlist.png" alt="Spotify Playlist" class="spotify-playlist-img">
                    <div class="spotify-link-icon" onclick="openSpotifyLink()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="song-list-container">
                    <div class="song-list" id="songList">
                        ${generateSongList()}
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(playlistSection);
        
        setTimeout(() => {
            playlistSection.style.opacity = '1';
        }, 100);
        
    }, 600);
}

function openSpotifyLink() {
    // Replace this URL with your actual Spotify playlist link
    const spotifyUrl = 'https://open.spotify.com/playlist/4fO0lcemzZ6fZFgv8fsZHY';
    window.open(spotifyUrl, '_blank');
}

// Data for the songs
const songs = [
    { title: "4 Seasons", artist: "Rex Orange County" },
    { title: "Last Forever", artist: "LANY" },
    { title: "Lean On Me", artist: "HONNE" },
    { title: "Sunflower", artist: "Rex Orange County" },
    { title: "Nobody Gets Me", artist: "SZA" },
    { title: "DAISIES", artist: "Justin Bieber" },
    { title: "P.S. I LOVE YOU", artist: "Paul Partohap" },
    { title: "Old Love", artist: "yuji, putri dahlia" },
    { title: "dna", artist: "LANY" },
    { title: "The Most Beautiful Thing", artist: "Bruno Major" },
    { title: "Sunsets With You", artist: "Cliff, Yden" },
    { title: "Pancakes for Dinner", artist: "Lizzy McAlpine" },
    { title: "Ang Pag-ibig", artist: "Rob Deniel" },
    { title: "Dito Sa'kin", artist: "Earl Agustin" },
    { title: "Janice", artist: "Dilaw" },
    { title: "Sagip Hanggang Dulo", artist: "Jan Roberts" },
    { title: "kahel na langit", artist: "Maki" },
    { title: "Ikaw Lang Patutunguhan", artist: "Amiel Sol" },
    { title: "Ikot", artist: "Over October" },
    { title: "Nahuhulog", artist: "Jed Baruelo" }
];

function generateSongList() {
    let songsHTML = '';
    
    songs.forEach((song, index) => {
        // Create a URL-friendly name from the song title, replacing spaces with underscores and removing special characters.
        const imageName = song.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s/g, '_');
        const imageSrc = `resources/covers/${imageName}_cover.jpg`;

        songsHTML += `
            <div class="song-item">
                <span class="song-number">${index + 1}</span>
                <img src="${imageSrc}" alt="${song.title} Album Art" class="song-icon">
                <div class="song-details">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                </div>
            </div>
        `;
    });
    
    return songsHTML;
}

function showGiftSection() {
    const secondSection = document.querySelector('.second-section');
    secondSection.style.opacity = '0';
    
    setTimeout(() => {
        secondSection.style.display = 'none';
        
        const giftSection = document.createElement('div');
        giftSection.className = 'gift-section';
        giftSection.innerHTML = `
            <button class="back-btn" onclick="goBack()">← back</button>
            <h2 class="gift-title">a little gift for you</h2>
            <div class="gift-content">
                <img src="resources/flowers_for_sheree.png" alt="Flowers for Sheree" class="gift-image">
                <div class="gift-message">
                    <p>Carefully picked online by daz 💝</p>
                    <p>Remember when I said I will give you flowers? Here's a digital bouqet for you, I picked it and constructed it online!</p>
                    <p>I hope you like it, my baby.</p>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.appendChild(giftSection);
        
        setTimeout(() => {
            giftSection.style.opacity = '1';
        }, 100);
        
    }, 600);

}
