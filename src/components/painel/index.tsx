import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Viagem } from "../../interfaces";
import axios from 'axios';
import Despesas from "./despesas";
import Lembretes from "./lembretes";
import { api } from "../../api";

const Painel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const[detalhes, setDetalhes] =useState<Viagem>({
    id:'',
    nome:'',
    data_inicio:'',
    data_fim:'',
    pais:'',
    estado:'',
    cidade:'',
    lembretes: [],
    despesas: []
  })

  useEffect(()=>{
    axios.get(`http://localhost:3000/viagens?id=${id}`)
      .then(response => {
        setDetalhes(response.data[0])
      }).catch(error =>{
        console.log(error)
      })

  },[id])

  const removerViagem =async () => {
    try {
      const response = await api(id, "DELETE", { id: id });
      if (response) {
        navigate('/');
      } 
    } catch (error) {
      console.error('Erro ao remover a viagem:', error);
    }
    
  };


  return (
    <div className="p-2">
      <div className="flex justify-between ">
        <h1 className="text-5xl font-bold">{detalhes?.nome}</h1>
        <a className="self-end p-2 cursor-pointer items-baseline" onClick={removerViagem}><i className="pi pi-trash text-2xl "/></a>
      </div>
      <div className="flex justify-between bg-gray-50 rounded-xl">
        <div className="flex flex-col p-2 w-auto">
          <div className="flex gap-2 p-1">
            <p className="font-semibold">Cidade:</p>
            <p className="font-light">{detalhes?.cidade}</p>
          </div>
          <div className="flex gap-2 p-1">
            <p className="font-semibold">Estado:</p>
            <p className="font-light">{detalhes?.estado}</p>
          </div>
          <div className="flex gap-2 p-1">
            <p className="font-semibold">País:</p>
            <p className="font-light">{detalhes?.pais}</p>
          </div>
        </div>
        <div className="flex flex-col p-2 w-auto">
          <div className="flex gap-2 p-1">
            <p className="font-semibold">Data de início:</p>
            <p className="font-light">{detalhes?.data_inicio}</p>
          </div>
          <div className="flex gap-2 p-1">
            <p className="font-semibold">Data de fim:</p>
            <p className="font-light">{detalhes?.data_fim}</p>
          </div>
        </div>
      </div>

      <Despesas despesas={detalhes?.despesas} viagem_id={detalhes?.id}/>
      <Lembretes lembretes={detalhes?.lembretes} viagem_id={detalhes?.id} />
      </div>
  );
};

export default Painel;