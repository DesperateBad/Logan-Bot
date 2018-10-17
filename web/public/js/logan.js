$( document ).ready(function() {
  $.noConflict();
  
    $(".dropdown-trigger").dropdown({coverTrigger: false});
    $('.collapsible').collapsible();
    $('.tabs').tabs();
});