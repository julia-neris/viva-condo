"use client";
import { spawn } from "child_process";

type Morador = {
  primeiroNome: String;
  sobrenome: String;
}

export default function Home() {
  function formatarNomeMorador (morador:any) {
    return morador.primeiroNome + ' ' + morador.sobrenome;
  }

  const morador = {
    primeiroNome: 'Júlia',
    sobrenome: 'Neris'
  };

  function obterSaudacao(morador:null | Morador) {
    if(morador) {
      return <span>Olá, {formatarNomeMorador(morador)}!</span>;
    }
    return <span>Olá, Estranho!!!</span>
  }

  return(
    <div className="bg-red-300">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-bold bg-red-500 rounded-full border-black p-5">{obterSaudacao(morador)}</h1>
      </div>
    </div>
  );
};