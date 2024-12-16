<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link href="https://frissbee.de/images/logos/FrissBee-Logo_01.png" rel="icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pagi-O-Nation</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />

    <!-- 1. Implement the "Pagi-O-Nation"-File -->
    <script src="./assets/js/pagi-o-nation_1.1.1.js" defer></script>

    <!-- 2. Implement your JS-Files -->
    <script src="./assets/js/only-js_NOReload.js" defer></script>
    <script src="./assets/js/js_Reload.js" defer></script>
    <script src="./assets/js/only-js_NOReload_tow-pagination.js" defer></script>
    <script src="./assets/js/php_Reload.js" defer></script>
    <script src="./assets/js/fetch-api_NOReload.js" defer></script>

    <style>
      img {
        height: auto;
        width: 100%;
      }
      small {
        color: #969696;
        font-family: 'Courier New', Courier, monospace;
      }

      /* Style for the Pagi-O-Nation */
      pagi-o-nation.demo_2::part(nav-element-pagination) {

      }
      pagi-o-nation.demo_2::part(ul-element-pagination) {
        background-color: #f5f5f5;
        padding: 8px;
        border: 1px solid #d1d1d1;
        border-radius: 0.375rem;
      }
      pagi-o-nation.demo_2::part(li-element-pagination) {
        border-radius: 0.375rem;
        -webkit-box-shadow: 0px 7px 21px 1px rgba(0,0,0,0.59); 
        box-shadow: 0px 7px 21px 1px rgba(0,0,0,0.59);
        margin: 0 3px;
      }
      pagi-o-nation.demo_2::part(div-element-pagination) {
        border: 1px solid #154c7a;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="bg-light border-bottom">
      <div class="container py-4">
        <h3>Pagi-O-Nation</h3>
        <div>
          Download and documentation on <a href="https://github.com/FrissBee/pagi-o-nation" target="_blank" rel="noopener noreferrer">GitHub</a><br />
          Created by <a href="https://frissbee.de/" target="_blank" rel="noopener noreferrer">FrissBee.de</a>
        </div>
      </div>
    </div>
    <div class="container py-5">

      <!-- =============== -->
      <h5 class="mb-3">No page reload | with JSON API</h5>

      <!-- For the output of the data -->
      <div id="list_1"></div>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation
        class="demo_1"
        limit-count="10"
      ></pagi-o-nation>
      <small>Default layout</small>

      <!-- =============== -->
      <div class="py-4"><hr /></div>
      <!-- =============== -->

      <h5 class="mb-3" id="anchor_1">With page reload | with JOSN API</h5>

      <!-- For the output of the data -->
      <div id="list_2"></div>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation
        class="demo_2"
        limit-count="12"
        active-bg="#ededed"
        active-color="#2a6ba1"
        inactive-bg="#2a6ba1"
        inactive-color="#ededed"
      ></pagi-o-nation>
      <small>Layout with CSS over "part" and attributes</small>

      <!-- =============== -->
      <div class="py-4"><hr /></div>
      <!-- =============== -->

      <h5 class="mb-3">No page reload | with JSON API | Two Pagination</h5>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation
        class="demo_3"
        limit-count="8"
        active-bg="linear-gradient(#c4c4c4, #f5f5f5, #c4c4c4)"
        active-color="#303030"
        inactive-bg="linear-gradient(#303030, #8a8a8a, #303030)"
        inactive-color="#f5f5f5"
      ></pagi-o-nation>
      
      <!-- For the output of the data -->
      <div class="p-3 border shadow bg-light my-3 rounded" id="list_3"></div>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation 
        class="demo_4"
        limit-count="8"
        active-bg="linear-gradient(#c4c4c4, #f5f5f5, #c4c4c4)"
        active-color="#303030"
        inactive-bg="linear-gradient(#303030, #8a8a8a, #303030)"
        inactive-color="#f5f5f5"
      ></pagi-o-nation>
      <small>Layout with CSS over attributes and with "linear-gradient"</small>

      <!-- =============== -->
      <div class="py-4"><hr /></div>
      <!-- =============== -->
      <h5 class="mb-3" id="anchor_2">With page reload | with PHP & Database</h5>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation
        class="demo_5"
        page-number="<?= $pageNumber ?>"
        limit-count="<?= $limit ?>"
        total-list-count="<?= $resultCount["count"] ?>"
        active-bg="#9c1616" inactive-color="#9c1616" active-color="#ffffff"
      ></pagi-o-nation>

      <!-- For the output of the data -->
      <div class="row mt-2" id="list_5">
          <?php foreach($result as $tuple) : ?>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <img src="<?= $tuple['url'] ?>" alt="<?= $tuple['alt'] ?>">
            </div>
          <?php endforeach; ?>
      </div>

      <!-- =============== -->
      <div class="py-4"><hr /></div>
      <!-- =============== -->

      <h5 class="mb-3">No page reload | with fetch API & Database</h5>

      <!-- 3. Implement the "pagi-o-nation"-Tag withe the attributes -->
      <pagi-o-nation
        class="demo_6"
        active-bg="#b6ab15"
        active-color="#000000"
        inactive-bg="#2e2e2e"
        inactive-color="#ffffff"
      ></pagi-o-nation>

      <!-- For the output of the data -->
      <div class="mt-3" id="list_6"></div>
      <!-- =============== -->
      <div class="py-4"></div>
    </div>
  </body>
</html>
