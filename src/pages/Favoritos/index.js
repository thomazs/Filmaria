import './favoritos.css'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Favoritos(){
    const [filmes, setFilmes] = useState([])
    const MINHA_LISTA = 'filmes'

    useEffect(() => {
        const minhaLista = localStorage.getItem(MINHA_LISTA)
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function removerFilme(filme_id){
        const minhaLista = localStorage.getItem(MINHA_LISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme_id})
        if (estavaSalvo === false){
            toast.error('Filme não estava salvo em sua lista')
            return
        }
        filmesSalvos = filmesSalvos.filter((filmeSalvo) => filmeSalvo.id!==filme_id)
        localStorage.setItem(MINHA_LISTA, JSON.stringify(filmesSalvos))
        setFilmes(filmesSalvos || [])
        toast.success('Filme removido da lista de favoritos')
    }
      

    return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>
            {
            filmes.length === 0
            ? 
            <div className="mensagem">
                Você não possui nenhum filme salvo :(<br />
                <Link to="/">Voltar a página principal</Link>
            </div>
            :            
            <ul>
                {filmes.map((filme)=>{
                    return (
                        <li key={filme.id}>
                            <div className="titulo">{filme.nome}</div>
                            <div className="comandos-filmes">
                                <Link to={`/filme/${filme.id}?back=/favoritos`}>Ver Detalhes</Link>
                                <a href="#" onClick={()=>removerFilme(filme.id)}>Excluir</a>
                            </div>
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    )
}