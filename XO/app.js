var pozicije = document.querySelectorAll(".content");
var youResult = document.querySelector(".youResult");
var computerResult = document.querySelector(".computerResult");
var you = 0;
var computer = 0;
var brojRunde = 0;

ocisti = () => {
    you = 0;
    computer = 0;
    youResult.innerHTML = "0";
    computerResult.innerHTML = "0";
    brojRunde = 0;
    ocistiPozicije();
}

ocistiPozicije = () => {
    pozicije.forEach(element => {
        element.innerHTML = " ";
    });
}

provjeriDijagonale = () => {
    return (pozicije[0].innerHTML != " " && pozicije[0].textContent == pozicije[4].textContent
        && pozicije[0].textContent == pozicije[8].textContent)
        ||
        (pozicije[2].innerHTML !== " " && pozicije[2].textContent == pozicije[4].textContent
            && pozicije[2].textContent == pozicije[6].textContent)
}
provjeriKolone = () => {
    return (pozicije[0].innerHTML != " "
        && pozicije[0].textContent == pozicije[3].textContent
        && pozicije[0].textContent == pozicije[6].textContent)
        ||
        (pozicije[1].innerHTML != " "
            && pozicije[1].textContent == pozicije[4].textContent
            && pozicije[1].textContent == pozicije[7].textContent)
        ||
        (pozicije[2].innerHTML != " "
            && pozicije[2].textContent == pozicije[5].textContent
            && pozicije[2].textContent == pozicije[8].textContent)
}
provjeriRedove = () => {
    return (pozicije[0].innerHTML != " "
        && pozicije[0].textContent == pozicije[1].textContent
        && pozicije[0].textContent == pozicije[2].textContent)
        ||
        (pozicije[3].innerHTML != " "
            && pozicije[3].textContent == pozicije[4].textContent
            && pozicije[3].textContent == pozicije[5].textContent)
        ||
        (pozicije[6].innerHTML != " "
            && pozicije[6].textContent == pozicije[7].textContent
            && pozicije[6].textContent == pozicije[8].textContent)
}

krajIgre = () => {
    return provjeriDijagonale()
        || provjeriKolone()
        || provjeriRedove();
}
krajRunde = (kompjuterPobijedio = false) => {
    brojRunde++;
    if (kompjuterPobijedio) {
        computer++;
        computerResult.innerHTML = String(computer);
    }
    else {
        you++;
        youResult.innerHTML = String(you);
    }
}
popunjenePozicije = () => {
    for (let i = 0; i < pozicije.length; i++) {
        if (pozicije[i].innerHTML === " " || pozicije[i].innerHTML == "")
            return false;
    }
    return true;
}

potezKompjutera = () => {
    let pozicijaKompjuter = Math.floor(Math.random() * 9);
    if ((pozicije[pozicijaKompjuter].innerHTML == " " || pozicije[pozicijaKompjuter].innerHTML == "") && brojRunde % 2 === 0) {
        pozicije[pozicijaKompjuter].innerHTML = "O";
        if (krajIgre()) {
            setTimeout(ocistiPozicije, 1000);
            krajRunde(true);
        }
        return;
    }
    if ((pozicije[pozicijaKompjuter].innerHTML == " " || pozicije[pozicijaKompjuter].innerHTML == "") && brojRunde % 2 !== 0) {
        pozicije[pozicijaKompjuter].innerHTML = "X";
        if (krajIgre()) {
            setTimeout(ocistiPozicije, 1000);
            krajRunde(true);
        }
        return;
    }
    if (popunjenePozicije()) {
        setTimeout(ocistiPozicije, 1000);
        brojRunde++;
        return;
    }
    else
        potezKompjutera();
}

//glavni dio
for (let i = 0; i < pozicije.length; i++) {
    pozicije[i].addEventListener("click", () => {
        if ((pozicije[i].innerHTML == " " || pozicije[i].innerHTML == "") && brojRunde % 2 === 0) {
            pozicije[i].innerHTML = "X";
            if (krajIgre()) {
                setTimeout(ocistiPozicije, 1000);
                krajRunde();
                return;
            }
            potezKompjutera();
        }
        if ((pozicije[i].innerHTML == " " || pozicije[i].innerHTML == "") && brojRunde % 2 !== 0) {
            pozicije[i].innerHTML = "O";
            if (krajIgre()) {
                setTimeout(ocistiPozicije, 1000);
                krajRunde();
                return;
            }
            potezKompjutera();
        }

    })
}



