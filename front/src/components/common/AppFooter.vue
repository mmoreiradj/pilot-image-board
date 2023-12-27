<template>
  <footer class="text-center text-lg-start bg-white text-muted border-top mt-0">
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Pilot</h6>
            <p>
              Pilot is an open source image board application built with Vue 3,
              bootstrap, nestjs and typescript.
            </p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Stack</h6>
            <p>
              <a target="_blank" href="https://vuejs.org/" class="text-reset"
                >Vue</a
              >
            </p>
            <p>
              <a
                target="_blank"
                href="https://getbootstrap.com/"
                class="text-reset"
                >Boostrap</a
              >
            </p>
            <p>
              <a target="_blank" href="https://nestjs.com/" class="text-reset"
                >Nestjs</a
              >
            </p>
            <p>
              <a
                target="_blank"
                href="https://www.typescriptlang.org/"
                class="text-reset"
              >
                Typescript
              </a>
            </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <a href="TODO" class="text-reset">API documentation</a>
            </p>
            <p>
              <a
                target="_blank"
                href="https://github.com/Martin-Moreira-de-jesus/pilot-front"
                class="text-reset"
              >
                Repository (front)
              </a>
            </p>
            <p>
              <a
                target="_blank"
                href="https://github.com/Martin-Moreira-de-jesus/pilot-back"
                class="text-reset"
                >Repository (back)</a
              >
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      This website is open source and free to use under the MIT license.
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped></style>
