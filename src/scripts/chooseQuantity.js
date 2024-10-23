document.querySelector('.increase').addEventListener('click', function() {
    let input = document.querySelector('.custom-input');
    let value = parseInt(input.value);
    if (value < parseInt(input.max)) {
        input.value = value + 1;
    }
});

document.querySelector('.decrease').addEventListener('click', function() {
    let input = document.querySelector('.custom-input');
    let value = parseInt(input.value);
    if (value > parseInt(input.min)) {
        input.value = value - 1;
    }
});
