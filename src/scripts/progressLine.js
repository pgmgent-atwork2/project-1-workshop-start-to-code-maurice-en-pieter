// Make the progress dots interactive
    document.querySelectorAll('.progressdiv').forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Find parent progress bar
                const progressBar = this.closest('.progress');
                const progressId = progressBar.id;
                const dots = progressBar.querySelectorAll('.progressdiv');
                const clickedIndex = Array.from(dots).indexOf(this);

                // Update all dots in this progress bar
                dots.forEach((dot, i) => {
                    dot.classList.remove('current');

                    if (i < clickedIndex) {
                        dot.classList.add('completed');
                    } else if (i === clickedIndex) {
                        dot.classList.add('current');
                    } else {
                        dot.classList.remove('completed');
                    }
                });

                // Update progress line
                const progressLine = document.getElementById(`progress-line-${progressId.split('-')[1]}`);
                const progressWidth = (clickedIndex / (dots.length - 1)) * 100;
                progressLine.style.width = `${progressWidth}%`;
            });
        });