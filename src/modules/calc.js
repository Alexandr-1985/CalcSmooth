const calc = (price = 100) => {
    // console.log(price);

    const calcBlock = document.querySelector(".calc-block");
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcCount = document.querySelector(".calc-count");
    const calcDay = document.querySelector(".calc-day");
    const total = document.getElementById("total");

    //итоговая стоимость
    const countCalc = () => {
        let calcTypeValue = +calcType.options[calcType.selectedIndex].value;
        const calcSquareValue = calcSquare.value;

        let totalValue = 0;
        let calcCountValue = 1;
        let calcDayValue = 1;

        if (!calcTypeValue) {
            calcSquare.value = "";
            calcDay.value = "";
            calcCount.value = "";
        }

        if (calcCount.value > 1) {
            calcCountValue += +calcCount.value / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            calcDayValue = 2;
        } else if (calcDay.value && calcDay.value < 10) {
            calcDayValue = 1.5;
        }

        if (calcType.value && calcSquare.value) {
            totalValue =
                price * calcTypeValue * calcSquareValue * calcCountValue * calcDayValue;
        } else {
            totalValue = 0;
        }
        //выводим
        //   total.textContent = totalValue;
        getCounterSmooth(totalValue, total);
    };

    //плавный счетчик
    const getCounterSmooth = (num, elem) => {
        const time = 0.01;
        let step = 0;
        if (calcSquare.value < 100) {
            step = 100;
        }
        if (calcSquare.value >= 100) {
            step = 4000;
        }
        let n = 0;
        let t = Math.round(time / (num / step));
        let interval = setInterval(() => {
            n = n + step;
            if (n >= Math.round(num)) {
                clearInterval(interval);
            }
            elem.textContent = n;
        }, t);
    };

    calcBlock.addEventListener("input", e => {
        //console.log(e.target);
        if (
            e.target === calcType ||
            e.target === calcSquare ||
            e.target === calcCount ||
            e.target === calcDay
        ) {
            countCalc();
        }
    });
};

calc();