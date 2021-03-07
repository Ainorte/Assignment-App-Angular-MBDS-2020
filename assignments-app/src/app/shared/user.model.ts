export class User {
  _id: String;
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
