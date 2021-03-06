export class User {
  prenom: String;
  nom: String;
  email: String;
  role: String;
  premiere_connexion: Boolean;
  image: String;
}

export enum Role {
  ADMIN= "Administrateur",
  TEACHER= "Professeur",
  STUDENT= "Étudiant"
}
