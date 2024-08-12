import React, { useEffect, useState } from "react";
import { Lembrete, LembreteProps } from "../../interfaces";
import { api } from "../../api";

const Lembretes = ({ lembretes, viagem_id }: LembreteProps) => {
  const [adicionando, setAdicionando] = useState(false);
  const [lembrete, setLembrete] = useState("");
  const [arrLembretes, setArrLembretes] = useState<Lembrete[]>([]);

  useEffect(() => {
    setArrLembretes(lembretes);
  }, [lembretes]);


  const adicionandoLembrete = () => {
    setAdicionando(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLembrete(e.target.value);
  };

  const removerLembrete = async (index: number) => {
    const lembretesAtualizados = arrLembretes.filter((_, i) => i !== index);
  
    const response = await api(viagem_id, "PATCH", { lembretes: lembretesAtualizados });
  
    if (response) {
      setArrLembretes(lembretesAtualizados);
    }
  };
  
  const adicionarLembrete = async () => {
    const novoLembrete = {
      id: arrLembretes.length + 1,
      texto: lembrete,
      concluido: false,
      hidden: false,
    };

    const response = await api(viagem_id, "PATCH", { lembretes: [...arrLembretes, novoLembrete] });

    if (response) {
      setArrLembretes((prevLembretes) => [...prevLembretes, novoLembrete]);
      setLembrete("");
      setAdicionando(false);
    }
  };

  const mudarStatus = async (index: number) => {
    const updatedLembretes = arrLembretes.map((lembrete, i) =>
      i === index ? { ...lembrete, concluido: !lembrete.concluido } : lembrete
    );


    await api(viagem_id, "PATCH", { lembretes: updatedLembretes });

    setArrLembretes(updatedLembretes);
  };

  return (
    <div className="flex flex-col p-4 border rounded-xl mt-6 w-auto">
      <div className="flex items-baseline gap-3 ">
        <p className="font-bold text-xl pb-4">Lembretes</p>
        <a
          className="border px-2 py-1 h-8 cursor-pointer hover:bg-gray-50 rounded-lg"
          onClick={adicionandoLembrete}
        >
          <i className="pi pi-plus" />
        </a>
      </div>

      {adicionando && (
        <div className="flex p-4 gap-2 border-t">
          <input
            type="text"
            value={lembrete}
            onChange={handleChange}
            placeholder="Digite o lembrete"
            className="p-inputtext p-component p-2 border"
          />
          <a onClick={adicionarLembrete} className="self-center text-lg cursor-pointer">
            <i className="pi pi-plus-circle" />
          </a>
          
        </div>
      )}

      {arrLembretes.map((lembrete, index) => (
        <div key={index} className="flex p-4 gap-2 justify-between border-t">
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={lembrete.concluido}
              onChange={() => mudarStatus(index)}
            />
            <p className={`${lembrete.concluido && "line-through"}`}>{lembrete.texto}</p>
          </div>
          <a onClick={() => removerLembrete(index)} className="self-center text-lg cursor-pointer">
            <i className="pi pi-trash"/>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Lembretes;
