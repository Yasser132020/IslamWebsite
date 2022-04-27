



// exploreBtn

let hadith = document.querySelector('.hadith');

let exploreBtn = document.querySelector('.container .title .btn');

exploreBtn.addEventListener('click',() => {

        hadith.scrollIntoView({
            behavior : 'smooth'
        })
})

// nav links

let links = document.querySelectorAll('.header ul li');
let sections = document.querySelectorAll('section');

console.log(sections);

links.forEach(link => {

    link.addEventListener('click',() => {

        document.querySelector('.header ul li.active').classList.remove('active');

        link.classList.add('active');

        let target = link.dataset.filter;

        sections.forEach(section => {

            if(section.classList.contains(target))
            {
                section.scrollIntoView({

                    behavior : 'smooth'

                })
            }
        })

    })
})


//

let header = document.querySelector('.header');

let scrollTop = document.querySelector('.scrollTop');

window.addEventListener('scroll',() => {

    if(window.scrollY > 100)
    {
        header.classList.add('active')
    }
    else
    {
        header.classList.remove('active')
    }

    if(window.scrollY > 500)
    {
        scrollTop.classList.add('active');
    }
    else
    {
        scrollTop.classList.remove('active');
    }
})

// getHadiths

let hadithContainer = document.querySelector('.hadithContainer');

let number = document.querySelector('.number');

let prev = document.querySelector('.prev');

let next = document.querySelector('.next');

let hadithIndex = 0;

getHadiths()

function getHadiths()
{
    fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')

    .then(response => response.json())

    .then(data => {

        let hadiths = data.data.hadiths;

        hadithContainer.innerHTML = '';

        hadithChanger()

        function hadithChanger()
        {
            hadithContainer.innerText = hadiths[hadithIndex].arab;

            number.innerText = `${hadithIndex + 1} - 300`;
        }

        next.addEventListener('click',() => {

            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;

            hadithChanger();
        })

        prev.addEventListener('click',() => {

            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            
            hadithChanger();
        })


    })
}

// getSurahs



let surahsContainer = document.querySelector('.surahsContainer');

getSurahs()

function getSurahs()
{
    fetch('http://api.alquran.cloud/v1/meta')

    .then(response => response.json())

    .then(data => {

        let surahs =  data.data.surahs.references;

        

        surahsContainer.innerHTML = '';

        surahs.forEach(surah => {

           surahsContainer.innerHTML += 
           `
            <div class="surah">
                <p> ${surah.name}</p>
                <p>${surah.englishName} </p>
            </div>
            
           `

        })

        // get ayahs

        let surahPopup = document.querySelector('.surahPopup');

        let surahsTitles = document.querySelectorAll('.surah');

        let ayat = document.querySelector('.ayat');

        let times = document.querySelector('.times');
        
        // console.log(surahsTitles);

        surahsTitles.forEach((title,index) => {

            title.addEventListener('click', () => {

                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)

                .then(response => response.json())

                .then(data => {

                    let ayahs = data.data.ayahs;

                    console.log(ayahs);

                    ayat.innerHTML = '';

                    ayahs.forEach(ayah => {

                        surahPopup.classList.add('active');

                        ayat.innerHTML +=
                        `
                            <p>(${ayah.numberInSurah}) - (${ayah.text})</p>
                        `
                    })

                })
            })
        })
    
        times.addEventListener('click',() => {

            surahPopup.classList.remove('active');
            
        })
    
    })
}

// getPrayTimes

let cards = document.querySelector('.cards');
getPrayTimes()
function getPrayTimes()
{
    fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
    .then(response => response.json())
    .then(data => {
        // console.log(data.data.timings);
        let times = data.data.timings;
        for (let time in times) 
        {
            // console.log(times[time]);
            cards.innerHTML +=
            `
            <div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="pray-time">${times[time]}</div>
                </div>
                <p>${time}</p>
            </div> 
            `
        }
    })
}

// scrollToTop

scrollTop.addEventListener('click',() => {

    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    })

})

// 

let bars = document.querySelector('.bars');

let nav = document.querySelector('.nav');

bars.addEventListener('click',() => {

    nav.classList.toggle('active')

})