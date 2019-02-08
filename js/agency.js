(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
  })

  // init datepicker
  $(document).ready(function() {
    $('.datepicker').datetimepicker({
      format: 'dd MM yyyy - hh:ii',
      weekStart: 1,
      autoclose: true,
      container: '#picker-container'
    });

    $("#contact-form").submit(function(e) {
      e.preventDefault();

      var $form = $(this);
      $.post($form.attr('action'), $form.serialize()).then(function() {
        alert('Thank you! Your request has been sent. Someone will contact you as soon as possible.');
      });
    });

    var addresses = new Bloodhound({
      initialize: false,
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://search.osmnames.org/hr/q/%QUERY.js?key=DG4glM5zzg9KeX8SSXLR',
        wildcard: '%QUERY',
        transform: function (res) {
          var data = [];
          for (var i = 0; i < res.results.length; i++) {
            data.push(res.results[i].display_name);
          }
          return data;
        }
      }
    });

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 3
    }, {
      name: 'addresses',
      source: addresses
    });
  })

})(jQuery); // End of use strict
