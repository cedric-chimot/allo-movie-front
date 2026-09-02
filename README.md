# 🚀 PROJET ALLO-MOVIE

### _Faisait partie des sujets proposés à l'incubateur, je vais modifier la demande pour un projet plus poussé. Pas d'API pré-existante, je vais la faire moi même._
### _Je vais ajouté une option commentaires et réponses façon forum ainsi que la possibilité de mettre une note aux films en plus des favoris_

## Description :

### Application à la Allo-ciné.

#### Créer une application de découverte et recherche de films : 
<p align="justify">Le sujet m'avait été proposé durant l'incubateur, mon groupe et moi en avions choisi un autre. L'idée ici est de s'éloigner de l'option principale et de l'utilisation de l'API themoviedb en créant moi même une API mais aussi et surtout d'aller plus loin dans la création de l'application. L'ajout des films en favoris ne suffit pas, on pourra laisser des commentaires sur les films, les noter, voir les films les plus populaires, les plus attendus, les plus récents, les plus vus, les plus commentés, les mieux notés, etc. On pourra aussi voir les films de l'année en cours, de l'année précédente, de l'année d'avant, etc. On pourra aussi voir les films d'un acteur, d'une actrice, d'un réalisateur et bien d'autre chose encore. L'application se veut la plus complète possible. </p>

### Exemple proposé dans le sujet : 

![Capture d'écran 2025-04-22 105240](https://github.com/user-attachments/assets/288b4731-dd41-4cb5-b290-ef37833f1866)

Je compte aller plus loin qu'une simple page d'accueil et des films tirés d'une API existante, pages admin, profil User, favoris par users et commentaires etc...

## Caractéristiques :
Les films seront récupérés via une API.
Les favoris ne seront pas enregistrés via l’API, mais pourront être *enregistrés dans
le local Storage ou sur Firebase 
### (*à voir, je réfléchi à d'autres possibilités)

## Besoin :

### • Page d’accueil : 

Films à découvrir

o On doit pouvoir voir de petite carte Film avec les informations
principal des films, et deux boutons :

  ▪ Add / Remove : pour ajouter ou enlever le film des favoris
  
  ▪ Détails : pour rediriger vers la page de détails du film

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

![allomovie-login](https://github.com/user-attachments/assets/1670ebfd-0cc7-40a6-8359-1d097d0e2fea)

#### _L'inscription :_

![allomovie-register](https://github.com/user-attachments/assets/8bed1268-0445-4a83-bbd8-77092c821d40)

#### _Page d'accueil une fois connecté :_

<img width="1919" height="495" alt="Capture d&#39;écran 2026-09-02 212735" src="https://github.com/user-attachments/assets/05b852cc-800e-4558-b80b-c425d15704d7" />
<img width="1919" height="733" alt="Capture d&#39;écran 2026-09-02 212755" src="https://github.com/user-attachments/assets/67391fbb-3b63-4245-a254-819a63dcc1f9" />

#### _Page films :_

<img width="1905" height="404" alt="Capture d&#39;écran 2026-09-02 215150" src="https://github.com/user-attachments/assets/35596a60-ffa8-4079-b574-7ec53110b013" />
<img width="1918" height="709" alt="Capture d&#39;écran 2026-09-02 215208" src="https://github.com/user-attachments/assets/3492652f-f114-4467-81fa-fcedcd731d08" />
<img width="1916" height="708" alt="Capture d&#39;écran 2026-09-02 215228" src="https://github.com/user-attachments/assets/b59977fe-bdec-4f09-a113-a51a35849beb" />
<img width="1915" height="699" alt="Capture d&#39;écran 2026-09-02 215244" src="https://github.com/user-attachments/assets/d08dc551-ba81-4738-9c92-727406b7fbb2" />
<img width="1919" height="692" alt="Capture d&#39;écran 2026-09-02 215300" src="https://github.com/user-attachments/assets/92e932dc-5907-4543-9dd6-29cb57ea4569" />
<img width="1919" height="823" alt="Capture d&#39;écran 2026-09-02 215314" src="https://github.com/user-attachments/assets/2ae5e1bd-bae6-40d0-a5d4-2146086c0b7b" />

_En cliquant sur le cœur, on ajoute le film en favori._

#### _Dashboard Admin avec admin connecté :_

<img width="1909" height="941" alt="Capture d&#39;écran 2026-09-02 215743" src="https://github.com/user-attachments/assets/b132f1a5-fd68-46e2-8b2e-c542bf619095" />

#### _Dashboard Admin, gestion des films avec ajout de nouveaux films :_

<img width="1919" height="826" alt="Capture d&#39;écran 2026-09-02 212821" src="https://github.com/user-attachments/assets/3ccf5b73-9409-4c76-8008-15f3c0a74f67" />
<img width="1919" height="943" alt="Capture d&#39;écran 2026-09-02 212911" src="https://github.com/user-attachments/assets/1741f906-74fc-487e-b305-ef20ac15df05" />


#### _Dashboard Admin, gestion des réalisateurs :_

<img width="1919" height="767" alt="Capture d&#39;écran 2026-09-02 212833" src="https://github.com/user-attachments/assets/c47e1d16-dd71-4076-9e1d-9e251ed80327" />

#### _Dashboard Admin, gestion des acteurs :_

<img width="1918" height="805" alt="Capture d&#39;écran 2026-09-02 212843" src="https://github.com/user-attachments/assets/48945548-945c-42c8-9d4e-a4c8a7f91abc" />

#### _Dashboard Admin, gestion des catégories :_

<img width="1919" height="768" alt="Capture d&#39;écran 2026-09-02 212857" src="https://github.com/user-attachments/assets/b625a137-8dc7-4d08-b8d5-698e4e27a7af" />


#### _Page de profil d'un utilisateur(présentation provisoire)_

![allomovie-userProfile](https://github.com/user-attachments/assets/f5a1763b-fdfb-4109-a361-51e6f5478cf6)

### 🔗 Liens

**[Backend Repository](https://github.com/cedric-chimot/allo-movie-back)** : Le lien vers le repository Git Hub contenant le code backend.
