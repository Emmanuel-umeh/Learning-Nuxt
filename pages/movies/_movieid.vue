<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <div class="container single-movie" v-if="movie !== null && !$fetchState.pending">
      <NuxtLink class="button" :to="{ name: 'index' }">Back</NuxtLink>

      <div class="movie-info">
        <div class="movie-img">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt=""
          />

          <div class="movie-content">
            <h1>Title : {{ movie.title }}</h1>
            <p class="movie-fact tagline">
              <span>Tagline : </span>"{{ movie.tagline }}"
            </p>

            <p class="movie-fact">
              <span>Released:</span>

              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  dat: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>

            <p class="movie-fact">
              <span>Duration : </span>
              {{ movie.runtime }} minutes
            </p>

            <p class="movie-fact">
              <span>Revenue:</span>
              {{
                movie.revenue.toLocaleString('en-us', {
                  style: 'currency',
                  currency: 'USD',
                })
              }}
            </p>

            <p class="movie-fact">
              <span>Overview:</span>
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // components : {Loading},
  name: 'single-movie',
  data() {
    return {
      movie: null,
    }
  },

  fetchDelay: 2000,
  async fetch() {
    await this.getSingleMovie()
  },

  methods: {
    async getSingleMovie() {
      const data = axios.get(`
https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=2f3c11139bf4b60421a11d750783a6c3&language=en-US`)

      const result = await data

      this.movie = result.data
    },
  },
}
</script>


<style lang="scss">
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>