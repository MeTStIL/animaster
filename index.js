function animaster() {
    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.add('hide');
        element.classList.remove('show');
    }

    function resetFadeOut(element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },
        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
        moveAndHide(element, duration) {
            element.style.transitionDuration = `${duration * 2.0 / 5}ms`;
            element.style.transform = getTransform({x: 100, y: 20}, null);
            setTimeout(animaster().fadeOut, duration * 2.0 / 5, element, duration * 3 / 5);
        },
        heartBeating(element) {
            let scaleUp = true;
            let a = 1;

            function animateScale() {
                if (scaleUp) {
                    animaster().scale(element, 500, a);
                } else {
                    animaster().scale(element, 500, 1);
                }
                scaleUp = !scaleUp;
                a += 0.05;
            }

            const intervalId = setInterval(animateScale, 500);
            return {
                stop: () => {
                    clearInterval(intervalId);
                    animaster().scale(element, 500, 1);
                }
            };
        },
        showAndHide(element, duration) {
            animaster().fadeIn(element, duration * 1 / 3);
            setInterval(animaster().fadeOut, duration * 1 / 3, element, duration * 1 / 3);
        }
    };
}