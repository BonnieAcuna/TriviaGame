// Array of questions, possible answers and answers.

$(document).ready(function () {
    var questionsArr = [{
        question: "What is Studio Ghibli's highest grossing movie?",
        possibleAnswers: ["Spirited Away", "Princess Mononoke", "Totoro", "Porco Rosso"],
        answer: "Spirited Away"
    }, {
        question: "Who is a co-founder of Studio Ghibli?",
        possibleAnswers: ["Pat Morita", "Gorō Miyazaki", "Hayao Miyazaki", "Akemi Ota"],
        answer: "Hayao Miyazaki"
    }, {
        question: "Where is the Studio Ghibli museum located?",
        possibleAnswers: ["Osaka", "Okinawa", "Kyoto", "Mitaka"],
        answer: "Mitaka"
    }, {
        question: "What is the name of Kiki's cat in Kiki's Delivery Service?",
        possibleAnswers: ["Lili", "Gigi", "Mimi", "Cici"],
        answer: "Gigi"
    }, {
        question: "In Ponyo, what does Sosuke need to give Ponyo in order to complete her transformation to a human?",
        possibleAnswers: ["high-five", "money", "kiss", "hand-shake"],
        answer: "kiss"
    }, {
        question: "What is Totoro?",
        possibleAnswers: ["racoon", "cat", "owl", "all of the above"],
        answer: "all of the above"
    }, {
        question: "What was the first movie made by Studio Ghibli?",
        possibleAnswers: ["Castle in the Sky", "Nausicaa of the Valley of the Wind", "Grave of the Fireflies", "Pom Poko"],
        answer: "Nausicaa of the Valley of the Wind"
    }, {
        question: "What is Sophie's job in Howl's Moving Castle?",
        possibleAnswers: ["milliner", "waitress", "cobbler", "housekeeper"],
        answer: "milliner"
    }, {
        question: "Who voiced San in Princess Mononoke?",
        possibleAnswers: ["Angelina Jolie", "Claire Danes", "Jennifer Aniston", "Scarlett Johansson"],
        answer: "Claire Danes"
    }, {
        question: "Who is chasing Sheeta in Castle in the Sky?",
        possibleAnswers: ["police", "boys", "dogs", "pirates"],
        answer: "pirates"
    }];

    var correctAnswers = 0;
    var incorrectAnswers = 0;


    $(".startscreen").show();
    $(".gamescreen").hide();
    $(".resultscreen").hide();

    // Timer clock
    var number = 60;
    var intervalId;

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    function decrement() {
        number--;
        $("#timer").html("<h2>" + "Time Remaining:" + number + "</h2>");
        if (number === 0) {
            stop();
            $(".gamescreen").hide();
            $(".resultscreen").show();
            $("#timeout").html("You ran out of time. Try Again");
        }
    }
    function stop() {
        clearInterval(intervalId);
        number = 0;
    }

    // Start button
    $("#startbutton").on("click", function () {
        $(".startscreen").hide();
        $(".gamescreen").show();
        run();
    })

    // The list of questions and possible answers.

    function renderQandA() {

        var div = $("<div>")
        for (var i = 0; i < questionsArr.length; i++) {
            var h3 = $("<h3>").text(questionsArr[i].question)
            div.append(h3)

            for (var j = 0; j < questionsArr[i].possibleAnswers.length; j++) {
                var input = $("<input>").attr("type", "radio")
                    .attr("value", questionsArr[i].possibleAnswers[j])
                    .attr("name", "q" + (i + 1))
                    .attr("class", "listOfAnswers")
                    .attr("data-index", i)
                var label = $("<label>").text(questionsArr[i].possibleAnswers[j])
                div.append(input, label)
            }
            $("#questionaire").append(div)
        }

    }

    renderQandA();

    endOfGame();


    // Show the results after the submit button is clicked
    function endOfGame() {


        $(document).on("click", '.submitresults', function (event) {
            event.preventDefault();
            stop();
            $(".gamescreen").hide();
            $(".resultscreen").show();
            var selected = $("input:checked");
        
            for (var i = 0; i < selected.length; i++) {

                var questionIndex = selected[i].attributes["data-index"].value;
                
                if (selected[i].value === questionsArr[questionIndex].answer) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }

                $('#answers').html(`${correctAnswers} correct answers out of 10`);
            }

        });

    }
    
    resetGame();

    // Reset game
    function resetGame() {

        $(".reset").on("click", function () {
            location.reload();
        });
    }


});

