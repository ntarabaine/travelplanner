import { useEffect, useState } from "react";
import { Despesa, DespesasProps } from "../../interfaces";
import DespesaForm from "./despesaForm";

const Despesas = ({ despesas, viagem_id }: DespesasProps) => {
  const [visible, setVisible] = useState(false);
  const [arrDespesas, setArrDespesas] = useState<Despesa[]>([]);
  const [editar, setEditar] = useState<Despesa | null>(null);

  useEffect(() => {
    setArrDespesas(despesas);
  }, [despesas]);

  const salvarDespesa = (novaDespesa: Despesa) => {
    setArrDespesas(prevDespesas => {
      const despesasAtualizadas = prevDespesas.map(d => d.id === novaDespesa.id ? novaDespesa : d);
      if (!despesasAtualizadas.find(d => d.id === novaDespesa.id)) {
        despesasAtualizadas.push(novaDespesa);
      }
      return despesasAtualizadas;
    });
  };

  const editarDespesa = (despesa: Despesa) => {
    setEditar(despesa);
    setVisible(true);
  };


  return (
    <div className="flex flex-col p-4 border rounded-xl mt-6 w-auto">
      <div className="flex items-baseline gap-3">
        <p className="font-bold text-xl pb-4">Despesas</p>
        <a 
          className="border px-2 py-1 h-8 cursor-pointer hover:bg-gray-50 rounded-lg" 
          onClick={() => {
            setEditar(null);
            setVisible(true);
          }}
        >
          <i className="pi pi-plus"/>
        </a>
      </div>

      <div className="flex justify-between font-extralight p-2">
        <p>Data</p>
        <p>Descrição</p>
        <p>Valor</p>
      </div>

      {arrDespesas.map((despesa: Despesa) => (
        <a 
          key={despesa.id}
          className="cursor-pointer"
          onClick={() => editarDespesa(despesa)}
        >
          <div className="flex justify-between border-t p-2">
            <p>{despesa.data}</p>
            <p>{despesa.descricao}</p>
            <p>{despesa.valor}</p>
          </div>
        </a>
      ))}

      <div className="flex justify-between font-extralight border-t p-2">
        <p>Total</p>
        <p>{arrDespesas.reduce((total: number, despesa: Despesa) => total + despesa.valor, 0)}</p>
      </div>

      <DespesaForm 
        visible={visible} 
        onHide={() => setVisible(false)} 
        viagem_id={viagem_id} 
        onSave={salvarDespesa}
        despesas={arrDespesas}
        editando={editar}
        setDespesas={setArrDespesas}
      />
    </div>
  );
};

export default Despesas;
