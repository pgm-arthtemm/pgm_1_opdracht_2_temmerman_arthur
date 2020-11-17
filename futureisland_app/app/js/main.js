(() => {
    const app = {
        initialize: function () {
            console.log('1. Application started!');
            this.cacheElements();
            this.buildUI();
            this.ticking();
            this.registerListeners();
            setInterval(() => this.ticking(), 1000);
            this.createFromDay();
        },
        cacheElements: function () {
            console.log('2. Cache elements!');
            this.$nav = document.querySelector('.nav');
            this.$lineup = document.querySelector('.lineup');
            this.$countdown = document.querySelector('.countdown');
            this.$artistDetails = document.querySelector('.artist__details');
            this.$social = document.querySelector('.social');
        },
        buildUI: function () {
            console.log('3. Build the user interface.');
            this.$nav.innerHTML = this.generateNavigation();
            this.$lineup.innerHTML = this.generateHTMLForLineUp();
            this.$social.innerHTML = this.generateFooter();
        },
        registerListeners: function () {
            const $listOfArtists = this.$lineup.querySelectorAll('.artist');
            let $artist;
            for (let i = 0; i < $listOfArtists.length; i++) {
                $artist = $listOfArtists[i];
                $artist.addEventListener('click', (event) => {
                    const id = event.target.dataset.id;
                    let element = this.showArtistById(id);
                    this.showArtistDetail(element);
                });
            }
        },
        showArtistById(id) {
            return lineup.find(artist => {
                return (artist.id == id);
            })
        },
        showArtistDetail(lineup) {
            this.$artistDetails.innerHTML = this.generateHTMLForDetail(lineup);
        },
        generateHTMLForDetail: function (lineup) {
            tempStr = '';
            tempStr += `<button class="close_details">close</button>
            <img src="${lineup.artist.picture.small}" alt="${lineup.artist.name}">
            <p>${lineup.artist.name}</p>
            <p>${lineup.artist.synopsis}</p>
            <iframe width="841" height="526" src="${lineup.artist.media[0].sourceId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>Meer weten?</p>
            <ul>
                <li><a href="${lineup.artist.social.website}" target"=_blank">${lineup.artist.social.website}</a></li>
                <li><a href="${lineup.artist.social.facebook}" target="_blank">${lineup.artist.social.facebook}</a></li>
                <li><a href="${lineup.artist.social.twitter}" target="_blank">${lineup.artist.social.twitter}</a></li>
                <li><a href="${lineup.artist.social.instagram}" target="_blank">${lineup.artist.social.instagram}</a></li>
            </ul>`;
            return tempStr;
        },
        generateNavigation: function () {
            let tempStr = '<ul class="navigation">';
            tempStr += nav.map((navigation, index) => {
                return `<li class="navElements"><a href="${navigation.link}" target="_blank">${navigation.name}</a></li>`
            }).join('');
            tempStr += '</ul>';
            return tempStr;
        },
        generateCountDown: function () {
            let countDownDate = new Date(1625148000000);
            let now = new Date();
            let distance = countDownDate - now;
            
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countDownString = `${days} DAGEN ${hours}h ${minutes}m ${seconds}s`;
            return countDownString;
        },
        ticking: function () {
           const counter = this.generateCountDown();
           this.$countdown.innerHTML = counter;
        },
        createFromDay: function (index) {
            switch (new Date(lineup[index].from).getDay()) {
                case 0:
                    day = 'Sunday';
                    break;
                case 1:
                    day = 'Monday';
                    break;
                case 2:
                    day = 'Tuesday';
                    break;
                case 3:
                    day = 'Wednesday';
                    break;
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
            };
            return day;
        },
        generateHTMLForLineUp: function () {
            tempStr = '';
            lineup.map((artists, index) => {
                tempStr += `<div class="artist" data-id="${artists.id}" style="background-image:url(${artists.artist.picture.small})">
                <h2>${artists.artist.name}</h2>
                <span class="day">${this.createFromDay(index)}</span>
                <span class="place">${artists.place.name}</span>
                </div>`;
            }).join('');
            return tempStr;
        },
        generateSocial: function () {
            tempStr = '<ul class="socials">';
            tempStr += social.map((social, index) => {
                return `<li class="socialsElements"><a href="${social.link}" target="_blank" class="fas fa-${social.type}"</a></li>`
            }).join('');
            tempStr += '</ul>';
            return tempStr;
        },
        generateFooter: function () {
            tempStr = '';
            tempStr += this.generateSocial();
            return tempStr;
        },
    }
    app.initialize();
})();
