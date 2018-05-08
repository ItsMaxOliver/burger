$(function() {
    $(".change-devoured").on("click", function(e) {
        var id = $(this).data("burgerid");
        var newDevoured = $(this).data("newdevoured");

        if (newDevoured === 0) {
            newDevoured = 1;
        }
        else {
            newDevoured = 0;
        }

        var newDevouredState = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function() {
            location.reload();
        });
    });

    $("#addburger").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            burger: $("#burger").val().trim(),
        };
      
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            location.reload();
        });
    });
});