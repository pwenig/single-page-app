window.PeopleManager = {

  initialize:function(url){
    $.getJSON(url, this.$displayIndexPage);
  },
  $displayIndexPage: function (response){
    $.each(response._embedded.people, function() {
      var $person = $(JST['templates/person_show'](this));
      $person.data( this );
      $("[data-container=people]").append($person);
    });
  }
};

