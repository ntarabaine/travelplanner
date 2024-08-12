import { Menu } from "primereact/menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViagemForm from "../painel/viagemForm";
import { Viagem } from "../../interfaces";



const MenuLateral = () => {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false); // Estado para o formulário

  useEffect(() => {
    fetch(`http://localhost:3000/viagens`)
      .then((response) => response.json())
      .then((data) => {
        setViagens(data);
      });
  }, [navigate]);

  const verDetalhes = (id: string) => {
    navigate(`/viagem/${id}`);
  };

  const adicionarViagem = async (novaViagem: Viagem) => {
    const response = await fetch(`http://localhost:3000/viagens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaViagem)
    });
    
    if (response.ok) {
      setViagens((prevViagens) => [...prevViagens, novaViagem]);
    }
  };

  const items = [
    {
      label: "Minhas viagens",
      icon: "pi pi-travel",
      items: viagens.map((viagem) => ({
        label: viagem.nome,
        icon: "pi pi-map-marker",
        command: () => verDetalhes(viagem.id),
      })),
    },
  ];

  return (
    <div>
      <a 
        onClick={() => setMenuVisible(!menuVisible)} 
        className={`${menuVisible ? 'hidden' : 'block'} p-2`} 
      ><i className="pi pi-bars"></i></a>

      <div className={`card w-56 ${menuVisible ? 'block' : 'hidden'} sm:block`}>
        <div className="flex shadow-sm bg-gray-50 rounded-3xl flex-col m-2 px-2 py-4 w-full h-screen">
          <div className="flex items-baseline justify-between pr-1 flex-nowrap">
            <h2 className="font-extrabold sm:text-4xl text-2xl pl-2">Menu</h2>
            <a onClick={() => setMenuVisible(!menuVisible)} 
              className="sm:hidden" >
                <i className="pi pi-chevron-left"></i>
            </a>

          </div>
          <Menu model={items} className="w-full bg-gray-50 p-0 m-0" />
          <a 
            onClick={() => setFormVisible(true)} 
            className="p-2 mt-auto cursor-pointer hover:bg-gray-200 rounded-lg"
          >
            <i className="pi pi-plus" /> Adicionar Viagem
          </a>
        </div>
      </div>
      <ViagemForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        onSave={adicionarViagem}
      />
    </div>

  );
};

export default MenuLateral;
