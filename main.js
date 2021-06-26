// Number fields
const aField = document.getElementById("a");
const bField = document.getElementById("b");
const cField = document.getElementById("c");
const kField = document.getElementById("k");

// Buttons
const calc = document.getElementById("calculate");
const reset = document.getElementById("reset");

// Text
const result = document.getElementById("result");
const details = document.getElementById("details");

function logABaseB(a, b) {
    return Math.log(a) / Math.log(b);
}

calc.addEventListener("click", () => {
    var a = parseFloat(aField.value);
    var b = parseFloat(bField.value);
    var c = parseFloat(cField.value);
    var k = parseFloat(kField.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(k)) {
        return;
    }

    if (b == 1) {
        result.innerHTML = "Result: \\(b\\) must be greater than 1.";
        MathJax.typeset();
        return;
    }

    var log = logABaseB(a, b).toFixed(5);

    // Compare n^d with f(n)
    var diff = Math.abs(log - c);

    var res = c;

    var masterCase = 0;

    if (c < log && diff > 0.001) {
        if (log == 1) {
            res = "\\Theta (n)";
        } else {
            res = "\\Theta (n^{" + log + "})";
        }
        
        masterCase = 1;
    } else if (diff < 0.001) {
        var nPow = "n *";

        if (log == 0) {
            nPow = "";
        } else if (log != 1) {
            nPow = "n^{" + log + "} * ";
        }

        var logPow = "\\log(n)";

        if (k != 0) {
            logPow = "\\log^{" + (k + 1) + "}(n)";
        }

        res = "\\Theta (" + nPow + logPow + ")";
        masterCase = 2;
    } else {

        var nPow = "n";

        if (c == 0) {
            nPow = "";
        } else if (c != 1) {
            nPow = "n^{" + c + "}";
        }

        var logPow = "\\log(n)";

        if (k == 0) {
            logPow = "";
        } else if (k != 1) {
            logPow = "\\log^{" + k + "}(n)";
        }

        res = "\\Theta (" + nPow + logPow + ")";
        
        masterCase = 3;
    }

    var originalA = "";

    if (a > 1) {
        originalA = a + " * ";
    }

    var originalC = "n";

    if (c == 0) {
        originalC = "";
    } else if (c != 1) {
        originalC = "n^" + c;
    }

    var originalLog = "\\log(n)";

    if (k == 0) {
        originalLog = "";
    } else if (k != 1) {
        originalLog = "\\log^" + k + "(n)";
    }

    var original = originalA + "T(n/" + b + ") + O(" + originalC + originalLog + ")";

    result.innerHTML = "Result: \\(T(n)=" + original + "=" + res + "\\)";

    if (masterCase == 1) {
        details.innerText = "Case 1";
    } else if (masterCase == 2) {
        details.innerText = "Case 2";
    } else if (masterCase == 3) {
        details.innerText = "Case 3";
    }

    MathJax.typeset();
});

reset.addEventListener("click", () => {
    aField.value = "";
    bField.value = "";
    kField.value = "";
    iField.value = "0";
    details.innerHTML = "";
});
