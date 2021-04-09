import { useEffect, useState} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'

function Filme() {
    const { id } = useParams()
    const [filme, setFilme] = useState({})    
    const [loading, setLoading] = useState(true)
    const [salvo, setSalvo] = useState(false)
    const history = useHistory()
    const MINHALISTA = 'filmes'

    function filmeJaSalvo(){
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        return estavaSalvo === true
    }

    function salvarFilme(e){
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        if (estavaSalvo === true){
            alert('Filme já estava salvo em sua lista')
        }else{
            filmesSalvos.push(filme)
            localStorage.setItem(MINHALISTA, JSON.stringify(filmesSalvos))
            setSalvo(true)
            alert('Filme salvo com sucesso')
        }
        e.preventDefault()
    }

    function removerFilme(e){
        const minhaLista = localStorage.getItem(MINHALISTA)
        let filmesSalvos = JSON.parse(minhaLista) || []
        let estavaSalvo = filmesSalvos.some((filmeSalvo) => {return filmeSalvo.id === filme.id})
        if (estavaSalvo === false){
            alert('Filme não estava salvo em sua lista')
            return
        }
        filmesSalvos = filmesSalvos.filter((filmeSalvo) => filmeSalvo.id!==filme.id)
        localStorage.setItem(MINHALISTA, JSON.stringify(filmesSalvos))
        setSalvo(false)
        alert('Filme removido da lista de favoritos')
        e.preventDefault()
    }
  
    useEffect(() => {
      async function loadFilme(){
          const response = await api.get(`/r-api/?api=filmes/${id}`)
  
          setLoading(false)
          if (response.status === 200){
              if (response.data.length === 0){
                alert('Filme não existe')
                history.push('/')
              }else{
                setFilme(response.data)                
              }
              
          }else{
              alert('Falha na requisição')
          }
  
      }
  
      loadFilme()
  
    }, [history, id, filmeJaSalvo])

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
                    {filmeJaSalvo() === true ? <a href="#" onClick={removerFilme}>Remover</a> : <a href="#" onClick={salvarFilme}>Salvar</a>}
                    <a href={`http://youtube.com/results?search_query=${filme.nome} trailer`} target="_blank">Trailler</a>
                    <Link to="/">Voltar</Link>                    
                </div>
            </article>
          }
          </div>
      </div>
    );
  }
  
  export default Filme;
  