$(function () {

  var large_break = 1200;

  // Apply clockpicker styles

  // Apply index cards layout
  $('.index .index_table').each(function(index, element) {
    var headers = $('thead > tr > th', $(this)).map(function(index) {
      return $.trim($(this).text())
    })
    $('tbody > tr', $(this)).each(function(index, row) {
      $('td', $(row)).each(function(index, col) {
        $(col).attr('data-column_header', headers[index] + ": ")
      })
    })
  });

  /******************************************************************
  // Hide batch actions when not needed
  /******************************************************************/
  $('.resource_selection_cell input[type="checkbox"]').change(function() {
    if ($(".resource_selection_cell input:checkbox:checked").length) {
      $('.batch_actions_selector').show(100);
    } else {
      $('.batch_actions_selector').hide(100);
    }
  });
  $('.resource_selection_toggle_cell input[type="checkbox"]').change(function() {
    if ($(".resource_selection_toggle_cell input:checkbox:checked").length) {
      $('.batch_actions_selector').show(100);
    } else {
      $('.batch_actions_selector').hide(100);
    }
  });

  /******************************************************************
  // Add hamburger to header
  /******************************************************************/
  $('#header').prepend('<div class="open kubik_header_toggle" />');

  /******************************************************************
  // Minimise and grow sidebar
  /******************************************************************/

  $('.kubik_header_toggle').click(function () {
    if($('.kubik_header_toggle').hasClass('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if($(".logged_in.admin_dashboard").length === 0) {
    windowSizeChecker();
  }

  $(window).bind('resize', function(e) {
    windowSizeChecker();
  });

  function closeMenu() {
    $('#wrapper, #custom-wrapper').addClass('minimise_header');
    $('.kubik_header_toggle').removeClass('open');
    $('.kubik_header_toggle').addClass('closed');
    $('#tabs').hide();
    $('#site_title').hide();
    $('#utility_nav').hide();
  }

  function openMenu() {
    $('#wrapper, #custom-wrapper').removeClass('minimise_header');
    $('.kubik_header_toggle').removeClass('closed');
    $('.kubik_header_toggle').addClass('open');
    $('#tabs').show();
    $('#site_title').show();
    $('#utility_nav').show();
  }

  function windowSizeChecker() {
    if($( window ).width() > large_break) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  /******************************************************************
  // Open nested sidebar items on click
  /******************************************************************/

  $('.menu_item.has_nested > a').click(function (e) {
    e.preventDefault();
    $(e.target).parent('li').toggleClass('active');
  });

  /******************************************************************
  // Hide flash messages after certain time
  /******************************************************************/
  if($(".logged_in .flashes .flash").length) {
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].className += " hide";
    }, 2500);
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].remove();
    }, 3000);
  }

  /******************************************************************
  // Form Tabs
  /******************************************************************/

  //Highlight the first tab with contents that have an error
  if($('.logged_in.create .tabs, .logged_in.update .tabs').length) {
    var errorIndex = [];
    $('.tab-content').children().each(function(index) {
      if(($(this).find('.error').length !== 0)) {
        errorIndex.push(index)
      }
    })
    if(errorIndex !== []) {
      $('.nav.nav-tabs .ui-tabs-tab').each(function(index) {
        if(index === errorIndex[0]) {
          $(this).find('a').trigger('click')
        }
        if($.inArray(index, errorIndex) !== -1) {
          $(this).addClass('ui-tabs-error')
        }
      })
    }
  }
});
