document.addEventListener('DOMContentLoaded', function () {
    var events = document.querySelectorAll('.event');
    var dropzones = document.querySelectorAll('.dropzone');
    var draggedEvent = null;

    dropzones.forEach((dropzone, index) => {
        dropzone.innerHTML = `<div class="dropzone-number">${index + 1}</div>`;
    });

    events.forEach(event => {
        event.addEventListener('dragstart', () => {
            draggedEvent = event;
        });
    });

    for (var i = 0; i < dropzones.length; i++) {
        var dropzone = dropzones[i];

        dropzone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            dropzone.appendChild(draggedEvent);
        });
    }

    var orderedEvents = [10000, 3000, 1500, 1764, 1775, 1825, 1990, 2007];
    var checkOrder = () => {
        var isCorrect = true;

        dropzones.forEach((dropzone, index) => {
            var event = dropzone.querySelector('.event');
            if (!event || parseInt(event.getAttribute('data-year'), 10) !== orderedEvents[index]) {
                isCorrect = false;
                dropzone.classList.add('incorrect');
                dropzone.classList.remove('correct');
            } else {
                dropzone.classList.add('correct');
                dropzone.classList.remove('incorrect');
            }
        });

        var result = document.getElementById('result');
        var message;
        var className;

        if (isCorrect) {
            message = 'Correct!';
            className = 'result correct';
        } else {
            message = 'Try Again! The incorrect answers are marked in a muted red colour.';
            className = 'result incorrect';

            var incorrectElements = document.querySelectorAll('.incorrect-answer');
            for (var element of incorrectElements) {
                element.style.color = 'mutedred';
            }
        }

        result.textContent = message;
        result.className = className;

        toggleButtons();
    };

    var resetGame = () => {
        dropzones.forEach(dropzone => {
            while (dropzone.children.length > 1) {
                document.querySelector('.timeline').appendChild(dropzone.children[1]);
            }
            dropzone.classList.remove('correct', 'incorrect');
        });

        document.getElementById('result').textContent = '';
        toggleButtons();
    };

    document.getElementById('check-order').addEventListener('click', checkOrder);
    document.getElementById('restart').addEventListener('click', resetGame);
});