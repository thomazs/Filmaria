import './http404.css'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Http404(){
    return (
        <div className="container">
            <h1>Página Não Encontrada</h1>
            <div className="mensagem">
                Infelizmente a página que você tentou acessar não está disponível :(<br />
                <span>Tente navegar a partir de nossa <Link to="/">página principal</Link> e aproveite para curtir as informações!</span>
            </div>            
        </div>
    )
}