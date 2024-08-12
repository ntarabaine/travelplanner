export interface Viagem {
  id: string
  nome:string
  data_inicio: string
  data_fim:string
  cidade:string
  estado:string
  pais: string
  lembretes: Lembrete[]
  despesas: Despesa[]

}

export interface Lembrete {
  id: number
  texto: string
  hidden: boolean
  concluido: boolean
}

export interface Despesa{
  id: number
  data:string
  descricao: string
  valor: number
}

export interface LembreteProps{
  lembretes:Lembrete[]
  viagem_id: string
}
export interface DespesasProps {
  despesas: Despesa[]
  viagem_id: string
}

export interface DespesaFormProps {
  visible: boolean;
  onHide: () => void;
  viagem_id: string;
  onSave: (despesa: Despesa) => void;
  despesas:Despesa[]
  editando: Despesa | null; 
  setDespesas: React.Dispatch<React.SetStateAction<Despesa[]>>;

}

export interface ViagemFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (novaViagem: Viagem) => void;
}