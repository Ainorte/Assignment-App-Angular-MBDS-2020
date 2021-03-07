import {User} from "../shared/user.model";

export class Assignment {

  _id?: string;
  nom: string;
  note: number;
  dateDeRendu: Date;
  rendu: boolean;
  remarque: string;
  matiere: string;
  eleve: User;
  prof: User;
}
