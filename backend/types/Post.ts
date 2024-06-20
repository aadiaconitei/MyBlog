export interface BasicPost {
    id: number;
  }
  
  export interface Post extends BasicPost {
    titlu: string;
    continut: string;
    categorie_id?: number;
    dataadaugare?: Date;
    user_id?: number;
    poza?: string;
    categorie_nume?: string;
  }