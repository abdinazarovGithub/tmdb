// let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=`
let topmovie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=`
let upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=`
let array = [popular, upcoming, topmovie]

let appendiv = document.querySelector('.append')
let buttons = document.querySelectorAll('.btns')
let page = document.querySelector('#page')
let btnNext = document.querySelector('.next')
let btnPrev = document.querySelector('.prev')
let btn = document.querySelector('.btn')
valuer.value = 'topmovie'

async function data(api, page) {
    page = page || 1
    api = api || topmovie
    let base = await fetch(api + page)
    base = await base.json()
    renderMovie(base)
}

function renderMovie(base) {
    appendiv.innerHTML = null
    for(let i of base.results) {
        searchCheck = true
        minCheck = true
        maxCheck = true
        scoreCheck = true
        if(search.value) {
            if(!i.title.toLowerCase().includes(search.value)) {
                searchCheck = false
            }
        }
        if(min.value) {
            if(+i.release_date.slice(0,4) < min.value) {
                minCheck = false
            }
        }
        if(max.value) {
            if(+i.release_date.slice(0,4) > max.value) {
                minCheck = false
            }
        }
        if(score.value) {
            console.log(i.vote_average)
            if(+i.vote_average < score.value) {
                scoreCheck = false
            }
        }
        
        if(searchCheck && minCheck && maxCheck && scoreCheck) {
            let div = document.createElement('div')
            div.classList.add('movie')
            div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt="Fast &amp; Furious Presents: Hobbs &amp; Shaw">
    
            <div class="movie-info">
                <h3>${i.title}</h3>
                <span class="orange">${i.vote_average}</span>
            </div>
            <span class="date">${i.release_date.slice(0,4)}</span>`

            appendiv.append(div)
        }


        
    }
}

buttons.forEach( (el) => {
    el.onclick = () => {
        search.value = ""
        min.value = ""
        max.value = ""
        score.value = ""
        valuer.value = el.value || 'topmovie'
        page.textContent = 1
        if(el.value == 'popular') {
            data(popular, page.textContent)
        } else if( el.value == 'topmovie') {
            data(topmovie, page.textContent)
        } else if(el.value == 'upcoming') {
            data(upcoming, page.textContent)
        }
    }
})
btnNext.onclick = () => {
    search.value = ""
    min.value = ""
    max.value = ""
    score.value = ""
    page.textContent = +page.textContent + 1
    if(valuer.value == 'popular') {
        data(popular, page.textContent)
    } else if( valuer.value == 'topmovie') {
        data(topmovie, page.textContent)
    } else if(valuer.value == 'upcoming') {
        data(upcoming, page.textContent)
    }
}

btnPrev.onclick = () => {
    search.value = ""
    min.value = ""
    max.value = ""
    score.value = ""
    if(page.textContent != 1) {
      page.textContent = +page.textContent - 1
    }
    if(valuer.value == 'popular') {
        data(popular, page.textContent)
    } else if( valuer.value == 'topmovie') {
        data(topmovie, page.textContent)
    } else if(valuer.value == 'upcoming') {
        data(upcoming, page.textContent)
    }
}

btn.onclick = () => {
    
    if(valuer.value == 'popular') {
        data(popular, page.textContent)
    } else if( valuer.value == 'topmovie') {
        data(topmovie, page.textContent)
    } else if(valuer.value == 'upcoming') {
        data(upcoming, page.textContent)
    }
}



data()