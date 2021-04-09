import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './home.css'

function Home() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    async function loadFilmes(){
        const response = await api.get('/r-api/?api=filmes')

        if (response.status === 200){
            setFilmes(response.data)
        }else{
            alert('Falha na requisição')
        }

    }

    loadFilmes()

  }, [])

  return (
    <div className="container">
        <div className="lista-filmes">
            {filmes.map((filme)=>{
                return (
                    <article key={filme.id}>
                        <strong>{filme.nome}</strong>
                        <img src={filme.foto} alt="" />
                        <Link to={`/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })}
        </div>
    </div>
  );
}

export default Home;
