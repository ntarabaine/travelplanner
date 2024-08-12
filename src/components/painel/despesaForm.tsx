import { DespesaFormProps } from "../../interfaces";
import { Sidebar } from 'primereact/sidebar';
import { useState, useEffect } from "react";
import { api } from "../../api";

const DespesaForm = ({ visible, onHide, viagem_id, despesas, setDespesas, editando }: DespesaFormProps) => {
  const [formData, setFormData] = useState({
    data: "",
    descricao: "",
    valor: ""
  });

  useEffect(() => {
    if (editando) {
      setFormData({
        data: editando.data,
        descricao: editando.descricao,
        valor: editando.valor.toString() 
      });
    } else {
      setFormData({
        data: "",
        descricao: "",
        valor: ""
      });
    }
  }, [editando,despesas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const salvarDespesa = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaDespesa = {
      id: editando ? editando.id : despesas.length + 1,
      ...formData,
      valor: parseFloat(formData.valor) || 0,
    };

    const response = await api(viagem_id, "PATCH", {
      despesas: editando
        ? despesas.map(d => d.id === novaDespesa.id ? novaDespesa : d)
        : [...despesas, novaDespesa]
    });

    if (response) {
      setDespesas((prevDespesas) => {
        return editando
          ? prevDespesas.map(d => d.id === novaDespesa.id ? novaDespesa : d)
          : [...prevDespesas, novaDespesa];
      });
      onHide();
    }
  };

  const removerDespesa = async () => {
    if (!editando) return;
  
    const despesasAtualizadas = despesas.filter(d => d.id !== editando.id);
  
    const response = await api(viagem_id, "PATCH", { despesas: despesasAtualizadas });
  
    if (response) {
      setDespesas(despesasAtualizadas);
      onHide(); 
    }
  };
  
  return (
    <Sidebar visible={visible} position="right" onHide={onHide}>
      <h3 className="font-extrabold text-2xl py-2">{editando ? 'Editar Despesa' : 'Adicionar Despesa'}</h3>
      <form onSubmit={salvarDespesa}>
        <div className="flex flex-col p-2">
          <label htmlFor="data">Data</label>
          <input 
            id="data" 
            type="date" 
            className="p-inputtext p-component border p-2"
            value={formData.data}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="descricao">Descrição</label>
          <input 
            id="descricao" 
            type="text" 
            className="p-inputtext p-component border p-2"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="valor">Valor</label>
          <input 
            id="valor" 
            type="number"
            min={0.1}
            step={0.1} 
            className="p-inputtext p-component border p-2"
            value={formData.valor} 
            onChange={handleChange}
          />
        </div>
        <div className="mr-4">
          <button type="submit" className="m-2 p-2 border rounded-lg w-full font-semibold hover:bg-gray-100 bg-gray-50">
            {editando ? 'Salvar Alterações' : 'Salvar'}
          </button>
        </div>
        {
          editando && <div className="mr-4">
          <button onClick={removerDespesa} className="m-2 p-2 border rounded-lg w-full font-semibold hover:bg-gray-100 bg-gray-50">
            Excluir Despesa
          </button>
        </div>
        }
      </form>
    </Sidebar>
  );
};

export default DespesaForm;
