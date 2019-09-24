# FORUM API !

API je skoro pa kompletno završen. Podginut je na privatni server zbog lakšeg testiranja. U nastavku će biti ostavljene upute za korištenje i adresa online verzije.


# Files

Svi potrebni fajlovi da se API pokrene  **offline** se nalaze na ovom repozitoriju, tu se nalazi i export baze podataka u folderu DATABASE_EXPORT koji se može importovati na vaš server.
Za **online** verziju potrebno je koristiti adresu **51.38.124.13** sa portom **3000** i rutama koje će biti navedene u nastavku.

# Setup
Potrebno je da klonirate ovaj repozitorij i da se prebacite unutar tog direktorija. Potom pokrenuti komandu:

    sudo npm i

Zatim potrebno je da pokrenete MySql Server i importate bazu podataka koja je prilozena u repozitoriju.
Posle toga potrebno je da izmjenite login podatke za vas MySql server.

    this.connection = mysql.createConnection({
            host: 'vašaAdresaServera',
            user: 'vašUsername',
            password: 'vašaŠifra',
            database: 'forum' 
        })   

Ako pri importu ne budete mijenjali ime baze podataka zadnji podatak u konfiguraciji 

    database: 'forum'
ostaje isti.
Na kraju ostaje da pokrenete Node server, što možete uraditi komandom 

    node server.js

ili

    npm run test

Ako ste uspjesno odradili svaki korak API bi trebao biti uspješno pokrenut i spreman za testiranje ili korištenje.

# Rute

U ovom modulu će biti navedene i objašnjene rute koje su implementirane i koje je moguće koristiti.

## Register 

Za registraciju korisnika koristi se:

    POST /register
Za uspjesnu registraciju potrebno je poslati JSON u body-u requesta.

    {
	"username" : "ime",
	"email":"nekimail@gmail.com",
	"password": "password",
	"password2": "password",
	"tos_check": 1
	}

Urađena je validacija podataka i provjere.
Po uspjesnoj registraciji bit će vam vraćena poruka da je operacija uspjela.
## Login

Login korisnika je potrebno uraditi da bi se mogle koristiti ostale rute koje su privatne i samo za prijavljene korisnike API-a.

Ruta za login je:

    POST /login

Za login je potrebno poslati JSON u body-u requesta sa sledećim podacima:

    {
	"email":"nekimail@gmail.com",
	"password": "password"
	}
**Ako je prijava uspjela bit će vraćena poruka i Token koji se nalazi u Authorization Header-u.**

## Password Reset
Password reset radi na principu da vam posalje mail s custom linkom na mail i kada odemo na njega i posaljemo novi password mijenja nam password u bazi.

### Request for reset, sending mail
Ruta je:

    POST /reset
U Body-u treba proslijediti mail za kojeg mijenjamo password i na kojeg se salje link.

    {
	"email": "nekimail@gmail.com"
	}
### Changing the password
Ruta:

    POST /reset/new/:token
U Body-u treba proslijediti novu sifru:

    {
	"password": "noviPasword"
	}


## Post-Tema 

Za korištenje ruta za postove potrebno je imati validan Authorization token u Headeru.

### New Post
Dodavanje posta sa istim nazivom teme nije moguce.
	
    POST /posts/new

U Body-u poslati odgovarajuce parametre:

    {
	"post_name" : "noviPost",
	"post_body" : "textPosta"
	}

### Edit Post
Mozete uredjivati samo one postove koje ste vi dodali.

    POST /posts/edit
    
U Body-u poslati odgovarajuce parametre:

    {
	"post_name" : "imePostaKojiVecPostoji",
	"post_body" : "noviTextZaIzmjenu"
	}

### Get Post by Name
Dohvata vam post s datim imenom ako on postoji u bazi podataka.

    GET /post
    
U Body-u poslati odgovarajuce parametre:

    {
	"post_name" : "imePostaKojiTrazimo"
	}
### Get Post by ID
Dohvata vam post s datim ID ako on postoji u bazi podataka.

    GET /post/:id
    
Gdje **:id** oznacava ID posta koji zelite pronaci.
### Delete Post by Name
Mozete obrisati samo svoj post s uslovom da postoji sa datim nazivom.

    DELETE /post/delete
    
U Body-u poslati odgovarajuce parametre:

    {
	"post_name" : "imePostaKojiBrisemo"
	}
### Get All Posts
Dohvata sve postove iz baze podataka.

    GET /posts
    
	
## Comments

Komentare mogu postavljati samo prijavljeni korisnici i na postove koji postoje u bazi podataka.

### New Comment
Za dodavanje komentara koristi se sledeca ruta:
	
    POST /comment/new

U Body-u poslati odgovarajuce parametre:

    {
	"post_id" : "idPosta",
	"comm_body" : "tekstKomentara"
	}
### Edit Comment
Za uredjivanje komentara koristi se sledeca ruta:
	
    POST /comment/edit

U Body-u poslati odgovarajuce parametre:

    {
	"comm_id" : "idKomentaraKojegEditujemo",
	"comm_body" : "noviTekstKomentara"
	}
### Get all Comments for post
Za uredjivanje komentara koristi se sledeca ruta:
	
    GET /comments/post/:id

Gdje **:id** oznacava ID posta cije komentare zelimo.

### Get all Comments for post
Za brisanje komentara koristi se sledeca ruta:
	
    DELETE /comment/:id

Gdje **:id** oznacava ID komentara kojeg brisemo.
### Search Comment by text
Za uredjivanje komentara koristi se sledeca ruta:
	
    GET /comments/search

U Body-u poslati odgovarajuce parametre:

    {
	"search_text" : "textIliSubstring"
	}
Vraca listu pronadjenih komentara.
	
