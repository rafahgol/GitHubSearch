import { useState, useEffect } from "react";
import octokit from "../lib/githubapi";
import Card from "./card";
import { Search } from "lucide-react";
const RepositorieSearch = () => {

  const [val, setVal] = useState("")
  const [searchData, setSearchData] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [languagePercentage, setLanguagePercentage] = useState({})
  ///////////////////////////// Pegando o repositório mais popular de acordo com o termo.
  const getSearchData = async () => {
    const res = await octokit.request(
      "GET /search/repositories",
      {
        q: searchQuery,
        sort: "stars",
        order: "desc",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    ///////////////////////////// Pegando a url das linguagens e fazendo um json para que possa ser lido posteriormente
    if (res.data.total_count !== 0) {
      const resLanguages = await fetch(res.data.items[0].languages_url)
      const dataLanguages = await resLanguages.json()
      setLanguagePercentage(dataLanguages)

    }
    ///////////////////////////// Checando se a pesquisa possuiu algum resultado. Caso não, mostra para o usuário, caso sim, atribui a searchData o repositório encontrado.
    if (res.data.total_count === 0) {
      console.log("Não tem resultado")
      setSearchData("no_results")
      return;
    }
    setSearchData(res.data.items[0]);
  }


  useEffect(() => {
    if (searchQuery) {
      getSearchData()
    }
  }, [searchQuery]);


  return (
    <div className="max-w-5xl text-2xl px-10 mx-auto bg-slate-900 py-4 space-y-3">
      <h1 className=" text-indigo-300 font-bold text-2xl">
        REPOSITÓRIOS GITHUB
      </h1>
      <form className="flex gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="text" placeholder="Digite um termo. Exemplo: nubank"
          className="border-2 border-indigo-600	 bg-indigo-200 w-full text-indigo-950 h-11 pr-11 rounded-xl
          p-3"
          onChange={(e) => {
            setVal(e.target.value)
          }} />
        <button
          className="border-2 border-indigo-600	 bg-indigo-900 px-5 hover:bg-indigo-950 text-indigo-50 rounded-xl"
          onClick={() => {
            setSearchQuery(val)
          }}
        ><Search />
        </button>
        {/*////////////////Tratamento de erro para caso a pesquisa não encontre resultados*/}
      </form>
      {searchQuery && (
        <div className="text-indigo-100 text-xl">
          {
            searchData === "no_results" ? "Pesquisa não encontrou resultados."
              :
              `Você pesquisou:`

          }
          <p className="text-indigo-100 font-bold">
            {
              searchData === "no_results" ? ""
                :
                `${searchQuery}`

            }
          </p>
        </div>
      )
      }
      {/*////////////////Passando os states necessários para o component Card*/}
      {
        (searchData !== "no_results" && searchData !== null) && <Card searchData={searchData} languagePercentage={languagePercentage} />
      }

    </div>
  );
};

export default RepositorieSearch;
