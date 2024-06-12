
const large_break = 1200;
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.menu_item.has_nested > a').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        e.target.parentNode.classList.toggle('active');
    });
  });

  // Navigation bar toggle
  document.getElementById('header').insertAdjacentHTML('afterbegin', '<div class="open kubik_header_toggle"></div>');

  document.querySelector('.kubik_header_toggle').addEventListener('click', function() {
    if (document.querySelector('.kubik_header_toggle').classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (!document.querySelector(".logged_in.admin_dashboard")) {
    windowSizeChecker();
  }

  window.addEventListener('resize', function() {
    windowSizeChecker();
  });

  const wrapper = document.getElementById('wrapper')
  const custom_wrapper = document.getElementById('custom-wrapper')
  const kubik_header_toggle = document.querySelector('.kubik_header_toggle')
  const tabs = document.getElementById('tabs')
  const site_title = document.getElementById('site_title')
  const utility_nav = document.getElementById('utility_nav')

  function closeMenu() {

    if(wrapper) {
      wrapper.classList.add('minimise_header');
    }
    if (custom_wrapper) {
      custom_wrapper.classList.add('minimise_header');
    }
    if (kubik_header_toggle) {
      kubik_header_toggle.classList.remove('open');
      kubik_header_toggle.classList.add('closed');
    }
    if (tabs) {
      tabs.style.display = 'none';
    }
    if (site_title) {
      site_title.style.display = 'none';
    }
    if (utility_nav) {
      utility_nav.style.display = 'none';
    }
  }

  function openMenu() {
    if (wrapper) {
      wrapper.classList.remove('minimise_header');
    }
    if (custom_wrapper) {
      custom_wrapper.classList.remove('minimise_header');
    }
    if (kubik_header_toggle) {
      kubik_header_toggle.classList.remove('closed');
      kubik_header_toggle.classList.add('open');
    }
    if (tabs) {
      tabs.style.display = 'block';
    }
    if (site_title) {
      site_title.style.display = 'block';
    }
    if (utility_nav) {
      utility_nav.style.display = 'block';
    }
  }

  function windowSizeChecker() {
    if (window.innerWidth > large_break) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  // Move table headers to mobile cards
  document.querySelectorAll('.index .index_table').forEach(function(element) {
    const headers = Array.from(element.querySelectorAll('thead > tr > th')).map(function(header) {
      return header.textContent.trim();
    });
    Array.from(element.querySelectorAll('tbody > tr')).forEach(function(row) {
      Array.from(row.querySelectorAll('td')).forEach(function(col, index) {
        col.setAttribute('data-column_header', headers[index] + ": ");
      });
    });
  });

  /******************************************************************
  // Hide batch actions when not needed
  /******************************************************************/
  document.querySelectorAll('.resource_selection_cell input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (document.querySelectorAll('.resource_selection_cell input[type="checkbox"]:checked').length) {
        document.querySelector('.batch_actions_selector').style.display = 'block';
      } else {
        document.querySelector('.batch_actions_selector').style.display = 'none';
      }
    });
  });

  document.querySelectorAll('.resource_selection_toggle_cell input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (document.querySelectorAll('.resource_selection_toggle_cell input[type="checkbox"]:checked').length) {
        document.querySelector('.batch_actions_selector').style.display = 'block';
      } else {
        document.querySelector('.batch_actions_selector').style.display = 'none';
      }
    });
  });

  /******************************************************************
  // Hide flash messages after certain time
  /******************************************************************/
  if (document.querySelectorAll(".logged_in .flashes .flash").length) {
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].classList.add("hide");
    }, 2500);
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].remove();
    }, 3000);
  }

  // Sidebar
  if (document.querySelectorAll('.index.logged_in #sidebar .sidebar_section').length) {
    const filterToggle = document.createElement('div');
    filterToggle.classList.add('filter_toggle');
    filterToggle.textContent = 'Show filters';
    document.querySelector('#main_content .table_tools').appendChild(filterToggle);
    filterToggle.addEventListener('click', function(e) {
      const sidebar = document.querySelector('#active_admin_content #sidebar');
      const collectionSelection = document.querySelector('#active_admin_content #collection_selection');
      sidebar.classList.toggle('expanded');
      collectionSelection.classList.toggle('sidebar_expanded');
      if (sidebar.classList.contains('expanded')) {
        filterToggle.textContent = 'Hide filters';
      } else {
        filterToggle.textContent = 'Show filters';
      }
    });
  }

  /******************************************************************
  // Form Tabs
  /******************************************************************/

  //Highlight the first tab with contents that have an error
  if (document.querySelectorAll('.logged_in.create .tabs, .logged_in.update .tabs').length) {
    const errorIndex = Array.from(document.querySelector('.tab-content').children).reduce((acc, tab, index) => {
      if (tab.querySelector('.error') !== null) {
        acc.push(index);
      }
      return acc;
    }, []);
    if (errorIndex.length !== 0) {
      const navTabs = document.querySelectorAll('.nav.nav-tabs .ui-tabs-tab');
      navTabs.forEach((tab, index) => {
        if (index === errorIndex[0]) {
          tab.querySelector('a').click();
        }
        if (errorIndex.includes(index)) {
          tab.classList.add('ui-tabs-error');
        }
      });
    }
  }
})
