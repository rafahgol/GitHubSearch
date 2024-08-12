import { Star, Eye, GitFork } from "lucide-react";
import { useEffect, useState } from "react";


const Card = ({ searchData, languagePercentage }) => {
  const { name, description, stargazers_count: stars, forks_count: forks, watchers_count: watchers } = searchData
  const [languageTotal, setLanguageTotal] = useState(0)

  /////////////////Realizando os cálculos da quantidade máxima de bytes relacionadas as linguagens presentes no repositório
  useEffect(() => {
    const soma = Object.values(languagePercentage).reduce((acc, valor) => acc + valor, 0);
    setLanguageTotal(soma)
  }, [searchData]

  )
  return (
    <div className="flex max-w-7xl justify-between rounded-xl border-2 border-indigo-600 
    bg-indigo-300 p-4 gap-4 text-indigo-950">
      <div className="w-[80%]">
        <h2 className="text-4xl font-bold text-indigo-600 ">{name}</h2>
        <p>
          {
            description ? description : "Repositório não possui descrição."
          }

        </p>

        <p className="font-bold text-indigo-600">
          {
            languageTotal === 0 ?
              "Este repositório não possui nenhuma linguagem."
              :
              `Linguagens:`
          }
        </p>
        {/*////////////////Fazendo o cálculo da porcentagem de cada linguagem no repositório e mostrando para o usuário*/}
        {
          Object.entries(languagePercentage).map(([language, percentage], index) => (
            <p key={index} className="">{language}: {(percentage / languageTotal * 100).toFixed(3)}% </p>
          ))
        }

      </div>

      <div className="flex min-w-[20%] flex-col gap-3 py-12 px-6">
        <p className="flex items-center gap-3 ">
          <Star /> {stars}
        </p>
        <p className="flex items-center gap-3">
          <GitFork /> {forks}
        </p>
        <p className="flex items-center gap-3">
          <Eye /> {watchers}
        </p>
      </div>
    </div>
  );
};

export default Card;
