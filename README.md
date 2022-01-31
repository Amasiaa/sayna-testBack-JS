# SAYNA-testBack-JS
Cet API a été développé avec le framework JS (Nodejs Express).

J'ai hebergé l'application chez ENVENNODE.
Voici comment tester l'API:

# 1 - REGISTER (METHOD POST)

URL: http://amasia.eu-4.evennode.com/api/register

avec les données suivantes:

{
  "firstname": "Pierre",
  "lastname": "DUPONT",
  "email": "pierre@amas.mg",
  "password": "Dupont123",
  "sexe": "Masculin",
  "date_naissance": "1985-05-20",
  "roles": ["user", "moderator"]
}

# 2 - LOGIN (METHOD POST)

URL: http://amasia.eu-4.evennode.com/api/login

avec les champs suivants:

{

  "email": "pierre@amas.mg",
  
  "password": "Dupont123"
  
}

# 3 - RAJOUT CART(METHOD PUT)

URL: http://amasia.eu-4.evennode.com/api/user/cart/id

il faut mettre l'id de l'utilisateur en question

# 4 - DELETE USER (SUPPRESSION COMPTE) (METHOD DELETE)

URL: http://amasia.eu-4.evennode.com/api/user/id

il faut mettre l'id de l'utilisateur en question

# 5 - LISTE SOURCES AUDIOS (METHOD GET)

URL: http://amasia.eu-4.evennode.com/api/songs

# 6 - RECUPERATION D'UNE SOURCE AUDIO

URL: http://amasia.eu-4.evennode.com/api/songs/id

N'oubliez pas de changer l'id par le vrai id d'une source audio

# 7 - RECUPERATION DES FACTURES

URL: http://amasia.eu-4.evennode.com/api/bills

# NB: N'oubliez pas d'utiliser le Token generé dans la partie login

