export interface BasicContact {
    id: number;
  }
  
  export interface Contact extends BasicContact {
    nume: string;
    prenume: string;
    email: string;
    mesaj: string;
    dataadaugare?: Date;
  }