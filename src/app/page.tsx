// "use client";

// export default function Home() {
// type Morador = {
//   primeiroNome: string;
//   sobrenome: string;
// }

//   function formatarNomeMorador(morador: Morador){
//     return morador.primeiroNome + ' ' + morador.sobrenome;
//   }

//   const morador = {
//     primeiroNome: 'Julia',
//     sobrenome: 'Neris'
//   }

//   function obterSaudacao(morador: null | Morador){
//     if (morador){
//       return <span>Olá, {formatarNomeMorador(morador)}</span>;
//     }
//     return <span>Olá, Estranho</span>;
//   }

//  return (
//     <div id="principal" className="min-h-screen flex items-center justify-center bg-black">
//       <div id="componente-azul" className="bg-blue-500 text-white rounded-lg p-8 max-w-sm w-full flex items-center justify-center"> {/* card-azul*/}
//         <h1 id="name" className="text-2xl font-bold text-center">
//           {obterSaudacao(morador)}
//         </h1>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {

  const supabase = createClient();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        router.replace("/condominios");
      } else {
        setCheckingSession(false); 
      }
    };
    checkSession();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o reload da página
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

     if (error) {
        if (error.code === "invalid_credentials") {
          setError("E-mail ou senha inválidos");
          return;
        }
        throw new Error(error.message);
      }
      router.replace("/condominios");
    } catch (err) {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  //  Sem essa verificação, ao acessar a raiz LOGADO, ele por um segundo ainda aparece a tela de login antes de redirecionar para dashboard. 
  if (checkingSession) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">✨🩷 Olá!!! 🩷✨</h2>
          <p className="text-gray-500 mb-6">Insira as informações que você usou ao se registrar.</p>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-300 via-pink-400 to-yellow-200 text-white p-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}