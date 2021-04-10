import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Favoritos from './pages/Favoritos'
import Filme from './pages/Filme'
import Home from './pages/Home'
import Http404 from './pages/Http404'

const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/favoritos" component={Favoritos} />
                <Route exact path="/filme/:id" component={Filme} />
                <Route path="*" component={Http404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes