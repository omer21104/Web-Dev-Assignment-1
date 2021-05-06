// flags to keep track of animations
var javaf = true;
var cppf = true;
var soccerf = true;

// bind mouseenter events to container classes of progress bars
$(".java-container").hover(function() {
    if (javaf) {
        javaf = false;
        elem = $("#java");
        val = elem.data("value");
        animate(elem, val);
    }
});

$(".cpp-container").hover(function() {
    if (cppf) {
        cppf = false;
        elem = $("#cpp");
        val = elem.data("value");
        animate(elem, val);
    }
});

$(".soccer-container").hover(function() {
    if (soccerf) {
        soccerf = false;
        elem = $("#soccer");
        val = elem.data("value");
        animate(elem, val);
    }
});


function animate(element, val) {

    let curVal = 0;
    let targetVal = val;
    id = setInterval(frame, 5);

    function frame() {
        if ((curVal + "%") == targetVal) {
            clearInterval(id);
        } else {
            curVal++;
            $(element).css("width", (curVal + "%"));
            //$(element).text(`${curVal}%`);
        }

        if (checkFlags()) {
            $("#restart-btn").removeClass("d-none");
            $("#restart-btn").show();
        }

    }
}

function checkFlags() {
    // return true if all flags are false
    return (!javaf && !cppf && !soccerf);
}

function checkFormFields(form) {
    // return false if any field is empty
    // color empty fields red
    let valid = true;
    const inputs = $(".contact-form");
    inputs.each(function() {
        if ($(this).val() == "") {
            valid = false;
            $(this).css("border-color", "red")
        } else {
            $(this).css("border-color", "");
        }

    })
    return valid;
}

// add button listener
$("#restart-btn").click(function() {
    if (!checkFlags()) {
        return;
    }
    // all false mean all animations played
    // restart flags
    javaf = true;
    cppf = true;
    soccerf = true;
    // restart progress bars
    let javaEl = $("#java");
    let cppEl = $("#cpp");
    let soccerEl = $("#soccer");

    javaEl.css("width", "0%");
    javaEl.text("");
    cppEl.css("width", "0%");
    cppEl.text("");
    soccerEl.css("width", "0%");
    soccerEl.text("");

    // hide button again
    $(this).hide();
})

// char limit on text area
const textArea = $("#message-text");
const charCounter = $("#char-count");
const sendBtn = $("#send-btn");
const maxCharCount = textArea.data("maxchar");
const contactForm = $("#msg-form");

// disable default close on submit
contactForm.submit(function(event) {
    event.preventDefault();
});

textArea.keyup(function() {
    let curCount = textArea.val().length;
    let charsLeft = maxCharCount - curCount;
    if (charsLeft >= 0) {
        charCounter.text(charsLeft);
        charCounter.removeClass("text-danger");
        sendBtn.removeClass("btn-danger");
        sendBtn.prop("disabled", false);
    } else {
        // no more chars
        charCounter.text(0);
        charCounter.addClass("text-danger");
        sendBtn.addClass("btn-danger");
        sendBtn.prop("disabled", true);
    }
})

sendBtn.click(function() {
    if (!checkFormFields(contactForm)) {
        // any field is empty
        sendBtn.addClass("btn-danger");
        //sendBtn.prop("disabled", true);
        return false;
    } else {
        charCounter.removeClass("text-danger");
        sendBtn.removeClass("btn-danger");
        finalizeAndSubmit();
        // show thank you modal
    }
})

function finalizeAndSubmit() {
    // hide previous parts of the modal
    contactForm.hide();
    $("#contactModalFooter").hide();

    // change text
    const thankYouDiv = '<div><h2>Thank you!</h2></div>';
    $("#contactModalBody").append(thankYouDiv);

    // submit form
    contactForm.submit();

}

// clear submit button
contactForm.keydown(function() {
    sendBtn.removeClass("btn-danger");

})

// clear red border
$(".contact-form").keydown(function() {
    $(this).css("border-color", "");
})

// reset contact form on click
$("#contact-btn").click(function() {
    document.querySelector("#msg-form").reset();
    charCounter.text(maxCharCount);
})

// add back to top functionality
const backToTopBtn = $("#backToTop");
backToTopBtn.click(function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})

// show button when scrolling
$(window).scroll(function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.addClass("d-block");
        backToTopBtn.removeClass("d-none");
    } else {
        backToTopBtn.removeClass("d-block");
        backToTopBtn.addClass("d-none");
    }
})