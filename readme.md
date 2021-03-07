# Assignment app

## Etudiants

- Kamel Bourek 
- William Poitevin

## Fonctionnalités

- Auhentification JWT
- Création de compte par l'admin
- Obligation de changer le mot de passe à la première connection
- Gestion des roles : Admin, Prof, Eleve.
- Gestion par classe
- Création d'assignement par classe.

## Demo 

[https://youtu.be/u3A5VJ0sB4A]

## Faire fonctionner 

Pour le front :

```sh
    cd assignments-app
    npm install
    npm start
```

Angular choisi le port de son choix.

Pour le back :

```sh
    cd api
    npm install
    npm start
```
Le back démarre sur le port 8010. Vérifiez qu'il soit libre.

## Comptes utilisateurs :

- Admin : `admin@admin.com` : `admin`
- Prof : `prof@prof.com` : `prof`
- Eleve : `eleve@eleve.com` : `eleve`