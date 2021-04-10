import './filme.css'
import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import {toast} from 'react-toastify'

function Filme(props) {
    const { id } = useParams()
    const [filme, setFilme] = useState({})    
    const [loading, setLoading] = useState(true)
    const [backUrl, setBackUrl] = useState("/")
    const history = useHistory()
    const MINHALISTA = 'filmes'
    const QUERY_STRING = props.location.search.substring(1)

    const filmeJaSalvo=useCallback(() => {
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        return estavaSalvo === true
    }, [filme])

    function salvarFilme(e){
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        if (estavaSalvo === true){
            toast.info('Filme já estava salvo em sua lista')
        }else{
            filmesSalvos.push(filme)
            localStorage.setItem(MINHALISTA, JSON.stringify(filmesSalvos))
            toast.success('Filme salvo com sucesso')
        }
        e.preventDefault()
    }

    function removerFilme(e){
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        if (estavaSalvo === false){
            toast.warn('Filme não estava salvo em sua lista')
            return
        }
        filmesSalvos = filmesSalvos.filter((filmeSalvo) => filmeSalvo.id!==filme.id)
        localStorage.setItem(MINHALISTA, JSON.stringify(filmesSalvos))
        toast.success('Filme removido da lista de favoritos')
        e.preventDefault()
    }
  
    useEffect(() => {
      async function loadFilme(){
          const response = await api.get(`/r-api/?api=filmes/${id}`)
          let var_qs = QUERY_STRING
          var_qs = var_qs.split("&")
          var_qs.map((item)=>{
              let item2 = item.split("=")
              if (item2[0] === "back")
                setBackUrl(item2[1])
              return item2[1]
          })

          setLoading(false)

          if (response.status === 200){
              if (response.data.length === 0){
                toast.error('Filme não existe')
                history.push(backUrl)
              }else{
                setFilme(response.data)                
              }
              
          }else{
              toast.error('Falha na requisição')
          }
  
      }
  
      loadFilme()
  
    }, [history, id, filmeJaSalvo, backUrl, setBackUrl, QUERY_STRING])

    return (
      <div className="container">
          <div className="lista-filmes">
          {loading 
          ? 
            <article>
                Carregando
            </article>
          :
            <article>
                <strong>{filme.nome}</strong>
                <img src={filme.foto} alt="" />
                <div className="sinopse">{filme.sinopse}</div>
                <div className="comandos">
                    {filmeJaSalvo() === true ? <a onClick={removerFilme}>Remover</a> : <a onClick={salvarFilme}>Salvar</a>}
                    <a href={`http://youtube.com/results?search_query=${filme.nome} trailer`} target="_blank" rel="noreferrer">Trailler</a>
                    <Link to={backUrl}>Voltar</Link>                    
                </div>
            </article>
          }
          </div>
      </div>
    );
  }
  
  export default Filme;
  