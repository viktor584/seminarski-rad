$(document).ready(function() {
    // 1. SLAJDER (Automatski fade na 4 sekunde)
    if ($('.slajd').length > 0) {
        setInterval(function() {
            var trenutniSlajd = $('.aktivni-slajd');
            var sledeciSlajd = trenutniSlajd.next('.slajd');
            
            if(sledeciSlajd.length === 0) {
                sledeciSlajd = $('.slajd').first();
            }
            
            trenutniSlajd.removeClass('aktivni-slajd');
            sledeciSlajd.addClass('aktivni-slajd');
        }, 4000);
    }
    // 2. MENJANJE MODA (Svetlo / Tamno)
    $('#promeni-mod').click(function() {
    
        $('body').toggleClass('svetli-mod');
        
        if ($('body').hasClass('svetli-mod')) {
            localStorage.setItem('tema', 'svetla');
        } else {
            localStorage.setItem('tema', 'tamna');
        }
    });

    if (localStorage.getItem('tema') === 'svetla') {
        $('body').addClass('svetli-mod');
    }

    // 3. POVEĆANJE I SMANJENJE SLOVA
    var brojacVelicine = 0; 

    $('#povecaj-tekst').click(function() {
        if (brojacVelicine < 3) {
            brojacVelicine++;
            $('p, h1, h2, h3, h4, a, span, li, button').each(function() {
                var trenutnaVelicina = parseInt($(this).css('font-size'));
                $(this).css('font-size', (trenutnaVelicina + 2) + 'px');
            });
        }
    });

    $('#smanji-tekst').click(function() {
        if (brojacVelicine > -2) {
            brojacVelicine--;
            $('p, h1, h2, h3, h4, a, span, li, button').each(function() {
                var trenutnaVelicina = parseInt($(this).css('font-size'));
                $(this).css('font-size', (trenutnaVelicina - 2) + 'px');
            });
        }
    });

    // 4. JQUERY VALIDACIJA KONTAKT FORME (NEPROBOJNA VERZIJA)
    $('#kontaktForma').submit(function(event) {
        var ime = $('#ime').val().trim();
        var email = $('#email').val().trim();
        var demoLink = $('#link').val().trim();
    
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (ime === "") {
            alert("Greška: Polje za umetničko ime / ime i prezime ne sme biti prazno!");
            event.preventDefault();
            return false;
        }
        if (ime.length < 3) {
            alert("Greška: Ime mora sadržati najmanje 3 karaktera!");
            event.preventDefault();
            return false;
        }

        if (email === "") {
            alert("Greška: Polje za e-mail adresu ne sme biti prazno!");
            event.preventDefault();
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Greška: Molimo unesite ispravnu e-mail adresu (npr. test@gmail.com)!");
            event.preventDefault();
            return false;
        }

        if (demoLink === "" || demoLink === "https://") {
            alert("Greška: Morate priložiti link do Vašeg demo snimka!");
            event.preventDefault();
            return false;
        }

        try {
           
            new URL(demoLink);
        } catch (e) {
            alert("Greška: Uneti link nije validan! Proverite adresu (mora počinjati sa http:// ili https://).");
            event.preventDefault();
            return false;
        }

        alert("Uspešno: Vaš demo je spreman za slanje! 101 Records tim će Vas kontaktirati.");
    });})