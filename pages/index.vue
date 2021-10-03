<template>
  <div class="home">
    <Hero />

    <!-- loading -->
    <Loading v-if="$fetchState.pending" />

    <!-- search -->
    <div class="container search" v-if="!$fetchState.pending && searchedMovies.length>0">
      <input
        v-model.lazy="searchInput"
        placeholder="Search"
        type="text"
        @keyup.enter="$fetch"
      />
      <button class="button" @click="clearSearch" v-show="searchInput !== ''" >
        Clear Search
      </button>
    </div>

    <!-- movies -->
    <div class="container movies" v-if="!$fetchState.pending && movies.length>0">
      <!-- searched movies -->
      <div v-if="searchInput !== ''" id="movie-grid" class="movies-grid">
        <div
          class="movie"
          v-for="(movie, index) in searchedMovies"
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>

          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 26) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>

            <p class="release">
              Released :
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  dat: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{
                name: 'movies-movieid',
                params: {
                  movieid: movie.id,
                },
              }"
              >Get More Info</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- current mopvies -->

      <div v-if="searchInput === ''" id="movie-grid" class="movies-grid">
        <div class="movie" v-for="(movie, index) in movies" :key="index">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>

          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 26) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>

            <p class="release">
              Released :
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  dat: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{
                name: 'movies-movieid',
                params: {
                  movieid: movie.id,
                },
              }"
              >Get More Info</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading.vue'
export default {
  components: { Loading },

  head(){
      return {
          title : "Movie App - Latest Mega Movies",
          meta : [
              {
                  hid : 'description',
                  name : 'description',
                  content : 'Get latest movies'
              },
              {
                  hid : 'keywords',
                  name : 'keywords',
                  content : 'movies, stream, mega, films, latest'
              }
          ]
      }
  },
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: '',
    }
  },

  async fetch() {
    if (this.searchInput === '') {
      await this.getMovies()
      return
    }

    await this.searchMovies()
  },
  fetchDelay: 2000,
  // 2f3c11139bf4b60421a11d750783a6c3
  methods: {
    async getMovies() {
      const data = axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=2f3c11139bf4b60421a11d750783a6c3&language=en-US&page=1'
      )
      const result = await data

      this.movies = result.data.results

      console.log('hi')
    },

    async searchMovies() {
      const data = axios.get(`
https://api.themoviedb.org/3/search/movie?api_key=2f3c11139bf4b60421a11d750783a6c3&language=en-US&page=1&query=${this.searchInput}`)

      const result = await data
      this.searchedMovies = result.data.results
    },

    clearSearch() {
      this.searchedMovies = []
      this.searchInput = ''
    },
  },
}
</script>

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 4px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
