import { useState } from "react";
import { Sidebar } from 'primereact/sidebar';
import { ViagemFormProps, Viagem } from "../../interfaces";

const ViagemForm = ({ visible, onHide, onSave }: ViagemFormProps) => {
    const [form, setForm] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
    cidade: "",
    estado: "",
    pais: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const salvarViagem = (e: React.FormEvent) => {
    e.preventDefault();

    const novaViagem: Viagem = {
      id: Date.now().toString(), // Gera um ID único
      nome: form.nome,
      data_inicio: form.data_inicio,
      data_fim: form.data_fim,
      cidade:form.cidade,
      estado:form.estado,
      pais:form.pais,
      lembretes: [],
      despesas: []
    };

    onSave(novaViagem);
    onHide();
  };

  return (
    <Sidebar visible={visible} position="right" onHide={onHide}>
      <h3 className="font-extrabold text-2xl py-2">Adicionar Nova Viagem</h3>
      <form onSubmit={salvarViagem}>
        <div className="flex flex-col p-2">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            className="p-inputtext p-component border p-2"
            value={form.nome}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="dataInicio">Data de Início</label>
          <input
            id="data_inicio"
            type="date"
            className="p-inputtext p-component border p-2"
            value={form.data_inicio}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="dataFim">Data de Fim</label>
          <input
            id="data_fim"
            type="date"
            className="p-inputtext p-component border p-2"
            value={form.data_fim}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            className="p-inputtext p-component border p-2"
            value={form.cidade}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="estado">Estado</label>
          <input
            id="estado"
            type="text"
            className="p-inputtext p-component border p-2"
            value={form.estado}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="pais">País</label>
          <input
            id="pais"
            type="text"
            className="p-inputtext p-component border p-2"
            value={form.pais}
            onChange={handleChange}
          />
        </div>
        <div className="mr-4">
          <button type="submit" className="m-2 p-2 border rounded-lg w-full font-semibold hover:bg-gray-100 bg-gray-50">
            Salvar
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default ViagemForm;
