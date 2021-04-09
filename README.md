# Filmaria
Projeto de estudos, criado usando ReactJS, com a finalidade de aprender e treinar conhecimentos de ReactJS adquiridos

## Roteiro

Possui as páginas de:
- Home (página Principal com a lista de filmes obtidos a partir de uma API)
- Detalhes do Filme (mostrando maiores informações de um filme selecionado)
- Favoritos (Página com a lista de filmes favoritos)

## Recursos Adicionados

Recursos adicionados dentro das páginas

### Detalhes do Filme

Busca e mostra maiores detalhes sobre o filme, tais como sinopse, capa, nome e opções de abrir o youtube com a busca por Trailler

### Salvar Favorito

Na página de detalhes do filme é possível marcar um filme como favorito. Se este filme já tiver sido adicionado, aparece a opção de remover o filme da lista de favoritos.

### Listar Favoritos

Opção que lista os filmes marcados como Favoritos, dando opção de remover o filme marcado como favorito, e também a opção de ver mais detalhes do filme.

### Outros recursos

A tela que mostra mais detalhes do filme tem um botão "Voltar" que retorna para a tela anterior. Se tiver vindo da Home, ele volta para a Home, se tiver vindo da página de Favoritos, volta para a página de favoritos. 
Para isso, é avaliada a queryString, ou seja, opções vindas pela URL (depois do path). 
