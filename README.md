# 🚀 PROJET ALLO-MOVIE

### _Faisait partie des sujets proposés à l'incubateur, je vais modifier la demande pour un projet plus poussé. Pas d'API pré-existante, je vais la faire moi même._
### _Je vais ajouté une option commentaires et réponses façon forum ainsi que la possibilité de mettre une note aux films en plus des favoris_

## Description :

### Application à la Allociné.

#### Créer une application de découverte et recherche de films : 
<p align="justify">Le sujet m'avait été proposé durant l'incubateur, mon groupe et moi en avions choisi un autre. L'idée ici est de s'éloigner de l'option principale et de l'utilisation de l'API themoviedb en créant moi même une API mais aussi et surtout d'aller plus loin dans la création de l'application. L'ajout des films en favoris ne suffit pas, on pourra laisser des commentaires sur les films, les noter, voir les films les plus populaires, les plus attendus, les plus récents, les plus vus, les plus commentés, les mieux notés, etc. On pourra aussi voir les films de l'année en cours, de l'année précédente, de l'année d'avant, etc. On pourra aussi voir les films d'un acteur, d'une actrice, d'un réalisateur et bien d'autre chose encore. L'application se veut la plus complète possible. </p>

### Exemple proposé dans le sujet : 

![Capture d'écran 2025-04-22 105240](https://github.com/user-attachments/assets/288b4731-dd41-4cb5-b290-ef37833f1866)

Je compte aller plus loin qu'une simple page d'accueil et des films tirés d'une API existante, pages admin, profil User, favoris par users et commentaires etc...

## Caractéristiques :
Les films seront récupérés via une API.
Les favoris ne seront pas enregistrés via l’API, mais pourront être *enregistrés dans
le local Storage ou sur Firebase 
### (*à voir, je réfléchi à d'autres possiblités)

## Besoin :

### • Page d’accueil : 

Films à découvrir

o On doit pouvoir voir de petite carte Film avec les informations
principal des films, et deux boutons :

  ▪ Add / Remove : pour ajouter ou enlever le film des favoris
  
  ▪ Details : pour rediriger vers la page de détails du film
  
o Minimum 20

o Optionnel : pagination pour afficher 20 films à la fois (les 20 premiers,
puis 20 suivants, etc…)

### • Page détails :

Permettant de voir les détails d’un film, avec également la gestion de favoris dans cette page.

### • Page Favoris : 

Permettant de voir la liste des films enregistrés en favoris

### • Dans toutes les pages on doit avoir :

o NavBar : permettant de naviguer vers l’accueil et les favoris

o Champs de recherche : permettant de rechercher des films via l’API
#### *themoviedb (*pas d'API existante, à créer moi même)

## Premier rendu des pages : 

#### _La connexion :_

![allomovie-login](https://github.com/user-attachments/assets/878000cd-0c19-4e81-8af4-54138bf2b6e6)

#### _L'inscription :_

![allomovie-register](https://github.com/user-attachments/assets/37406c58-0ecf-4c6e-ba5d-4e115c160d1a)

#### _Page d'accueil une fois connecté :_


#### _Dashboard Admin avec admin connecté :_


### 🔗 Liens

**[Backend Repository](https://github.com/cedric-chimot/allo-movie-back)** : Le lien vers le repository GitHub contenant le code backend.
