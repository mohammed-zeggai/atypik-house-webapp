<template>
  <section class="py-5 text-center container">
    <div class="content-wrapper">
      <section
        class="image-wrapper text-dark"
        style="
          background-image: url('https://c4.wallpaperflare.com/wallpaper/760/311/597/winter-forest-water-snow-wallpaper-preview.jpg');
        "
      >
        <div
          class="container pt-18 pb-16"
          style="z-index: 5; position: relative"
        >
          <div class="row gx-0 gy-6align-items-center">
            <div
              class="text-center"
              data-cues="slideInDown"
              data-group="page-title"
              data-delay="600"
              data-disabled="true"
            >
              <h1
                class="display-2 mb-4 text-white"
                data-cue="slideInDown"
                data-group="page-title"
                data-delay="600"
                data-show="true"
                style="
                  animation-name: slideInDown;
                  animation-duration: 700ms;
                  animation-timing-function: ease;
                  animation-delay: 600ms;
                  animation-direction: normal;
                  animation-fill-mode: both;
                "
              >
                Trouvez votre prochaines endroit insolites.
              </h1>
              <p
                class="display-6 mb-4 text-white"
                data-cue="slideInDown"
                data-group="page-title"
                data-delay="600"
                data-show="true"
                style="
                  animation-name: slideInDown;
                  animation-duration: 700ms;
                  animation-timing-function: ease;
                  animation-delay: 600ms;
                  animation-direction: normal;
                  animation-fill-mode: both;
                "
              >
                Location d’habitations insolites.
              </p>
            </div>
          </div>

          <div class="mc-field-group input-group form-floating">
            <label class="row label-view1" for="mce-EMAIL2"
              ></label
            >
            <input
              type="date"
              value=""
              name="EMAIL"
              class="required email form-control"
              placeholder="Email Address"
              id="mce-EMAIL2"
            />
            <label class="row" for="mce-EMAIL2"></label>
            <input
              type="date"
              value=""
              name="EMAIL"
              class="required email form-control"
              placeholder="Email Address"
              id="mce-EMAIL2"
            />
            <label class="" for="mce-EMAIL2"></label>
            <input
              type="number"
              value=""
              name="EMAIL"
              class="required email form-control"
              placeholder="Email Address"
              id="mce-EMAIL2"
            />
            <input
              type="submit"
              value="rechercher"
              name="recherche"
              id="mc-embedded-subscribe2"
              class="btn btn-primary"
            />
          </div>
        </div>
        <!-- /.container -->
      </section>

      <!-- /section -->
      <section class="wrapper bg-gray">
        <div class="container display-6 mb-4 text-white">
          <!-- /.row -->
          <div class="row text-center">
            <div class="display-6 mb-4 text-white">
              <!-- <h2 class="fs-15 text-uppercase text-primary mb-3">Blog</h2> -->
              <h3 class="display-5 mb-4">
                Découvrir nos hébergements insolites
              </h3>
            </div>
          </div>

          <div class="position-relative">
            <div
              class="shape bg-dot primary rellax w-17 h-20"
              data-rellax-speed="1"
              style="
                top: 0px;
                left: -1.7rem;
                transform: translate3d(0px, -45px, 0px);
              "
            ></div>
            <div
              class="
                carousel
                owl-carousel
                gap-small
                blog
                grid-view
                owl-loaded owl-drag
              "
              data-margin="0"
              data-dots="true"
              data-autoplay="false"
              data-autoplay-timeout="5000"
              data-responsive='{"0":{"items": "1"}, "768":{"items": "2"}, "992":{"items": "2"}, "1200":{"items": "3"}}'
            >
              
              <div class="owl-stage-outer">
                <div
                  class="owl-stage"
                  style="
                    transform: translate3d(0px, 0px, 0px);
                    transition: all 0s ease 0s;
                    width: 1720px;
                  "
                >
                  <div class="owl-item active" style="width: 430px">
                    <div class="item">
                      <div class="item-inner">
                        <article>
                          <div class="card card-shadow">
                            <figure
                              class="card-img-top overlay overlay-1 hover-scale"
                            >
                              <a href="#"
                                ><span class="bg"></span>
                                <img
                                  src="http://localhost:8081/img/i11.png"
                                  alt=""
                              /></a>
                              <figcaption>
                                <h5 class="from-top mb-0">Read More</h5>
                              </figcaption>
                            </figure>
                            <div class="card-body">
                              <div class="post-header">
                                <h2 class="post-title h3 mt-1 mb-3">
                                  <a class="link-dark" href="./blog-post.html"
                                    >Ligula tristique</a
                                  >
                                </h2>
                              </div>
                              <div class="post-header">
                                <h2 class="post-title h3 mt-1 mb-3">
                                  <a class="link-dark" href="./blog-post.html"
                                    >150$ Prix</a
                                  >
                                </h2>
                              </div>
                              <!-- /.post-header -->
                              <div class="post-content">
                                <p>Mauris convallis non ligula non interdum.</p>
                              </div>
                              <!-- /.post-content -->
                            </div>
                            <!--/.card-body -->
                            <div class="card-footer">
                              <ul class="post-meta d-flex mb-0">
                                <li class="post-date">
                                  <i class="uil uil-calendar-alt"></i
                                  ><span>14 Apr 2021</span>
                                </li>
                                <li class="post-comments">
                                  <a href="#"
                                    ><i class="uil uil-file-alt fs-15"></i
                                    >Coding</a
                                  >
                                </li>
                              </ul>
                              <!-- /.post-meta -->
                            </div>
                            <div class="card-footer card-footer-2">
                              <ul class="post-meta d-flex mb-0">
                                <li class="post-date">
                                  <i class="uil uil-calendar-alt"></i
                                  ><span>Rating</span>
                                </li>
                               
                              </ul>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                  
                        
                      </div>
                    </div>
                  
              <div class="owl-nav disabled">
                <button type="button" role="presentation" class="owl-prev">
                  <i class="uil-arrow-left"></i></button
                ><button type="button" role="presentation" class="owl-next">
                  <i class="uil-arrow-right"></i>
                </button>
              </div>
              <div class="owl-dots">
                <button role="button" class="owl-dot active">
                  <span></span></button
                ><button role="button" class="owl-dot"><span></span></button>
              </div>
            </div>
            <!-- /.owl-carousel -->
          </div>
          <!-- /.position-relative -->
        </div>
        <!-- /.container -->
      </section>
      <!-- /section -->
    </div>
    <!--  
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Album example</h1>
        <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>

    <div class="row py-lg-5">
      <h5>Nos derniers locations:</h5>

      <div
        v-for="location in newestLocations"
        :key="location.id"
        class="col-md-4 col-s-12"
      >
        <div
          class="card"
          style="
            background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
          "
        >
          <img class="card-img-top" alt="Image" />

          <div class="card-body">
            <h5 class="card-title">{{ location.titre }}</h5>
            <p class="card-text">{{ location.description }}</p>
            <p class="card-text">Prix: {{ location.prix }} €</p>

            <router-link
              :to="'/location/' + location.id"
              class="btn btn-primary"
            >
              Consulter
            </router-link>
          </div>
        </div>
      </div>
    </div>-->
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      newestLocations: [],
    };
  },
  mounted() {
    fetch("http://localhost:8080/api/location/newest")
      .then((response) => response.json())
      .then((data) => {
        this.newestLocations = data;
      });
  },
};
</script>
