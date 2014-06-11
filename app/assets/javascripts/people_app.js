window.PeopleManager = {

  initialize: function (url) {
    $.getJSON(url, this.$displayIndexPage);
    $(document).on("submit", "[data-behavior=create-person]", this.createPersonForm.bind(this));
  },
  $displayIndexPage: function (response) {
      var $creationForm = JST["templates/person_new"]({
        url: response._links.self.href,
        first_name: response._embedded.person.first_name,
        last_name: response._embedded.person.last_name,
        address: response._embedded.person.address
        });

      $("[data-container=main]").append($creationForm);

    $.each(response._embedded.people, function () {
      var $person = $(JST['templates/person_show'](this));
      $person.data(this);
      $("[data-container=people]").append($person);
    });
  },

  createPersonForm: function (event) {
    event.preventDefault();

    var $formParams = {};
    $.each($(event.target).serializeArray(), function (object) {
      $formParams[this.name] = [this.value];
    });

    var $jsonForServer = JSON.stringify($formParams);

    var jqXJR = $.ajax({
      type: "POST",
      url: event.target.action,
      data: $jsonForServer,
      success: success,
      dataType: 'json',
      contentType: 'application/json'
    });

    jqXJR.done(function (object) {
      object.clear
    })


  }
};

