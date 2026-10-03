(function () {

  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  if (btn && nav) {

    btn.addEventListener('click', function () {

      var open = nav.classList.toggle('open');

      btn.setAttribute(
        'aria-expanded',
        open ? 'true' : 'false'
      );

      btn.textContent = open ? 'Close' : 'Menu';

    });


    /* Close menu after clicking a navigation link */

    nav.addEventListener('click', function (e) {

      if (e.target.tagName === 'A') {

        nav.classList.remove('open');

        btn.setAttribute(
          'aria-expanded',
          'false'
        );

        btn.textContent = 'Menu';

      }

    });

  }


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  var year = document.getElementById('year');

  if (year) {

    year.textContent = new Date().getFullYear();

  }


  /* =====================================================
     ACTIVE NAVIGATION LINK
  ===================================================== */

  if ('IntersectionObserver' in window && nav) {

    var links = Array.prototype.slice.call(
      nav.querySelectorAll('a')
    );


    var observer = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            links.forEach(function (link) {

              var target = link.getAttribute('href');

              link.classList.toggle(
                'active',
                target === '#' + entry.target.id
              );

            });

          }

        });

      },

      {
        rootMargin: '-40% 0px -55% 0px'
      }

    );


    links.forEach(function (link) {

      var target = document.querySelector(
        link.getAttribute('href')
      );

      if (target) {

        observer.observe(target);

      }

    });

  }


  /* =====================================================
     SCROLL REVEAL ANIMATION
  ===================================================== */

  var reveals = document.querySelectorAll('.reveal');


  if ('IntersectionObserver' in window) {

    var revealObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            /*
             * Animate each element only once.
             */
            revealObserver.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12,

        rootMargin: '0px 0px -40px 0px'
      }

    );


    reveals.forEach(function (element) {

      revealObserver.observe(element);

    });

  } else {

    /*
     * Fallback for older browsers.
     */

    reveals.forEach(function (element) {

      element.classList.add('visible');

    });

  }

})();