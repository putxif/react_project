import './App.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Inicio from "./pages/Inicio"
import Festival from "./pages/Festival"
import Artista from "./pages/Artista";
import Autenticacao from "./pages/Autenticacao";
import Navbar from "./components/navbar"
import AuthProvider from "./AuthProvider";
import Pesquisa from "./pages/Pesquisa";
import Bilhetes from "./pages/Bilhetes";
import Favoritos from "./pages/Favoritos";
import Cashless from "./pages/Cashless";
import ProviderFavoritos from "./FavoritesProvider";



function App() {



  return <BrowserRouter>
      <AuthProvider>
          <ProviderFavoritos>
          <div className="App">
            <Switch>
                <Route path={"/"} exact={true} component={Autenticacao}/>
                <Route path={"/home"} component={Inicio}/>
                <Route path={"/festival/:id_festival"} component={Festival}/>
                <Route path={"/artista/:id_artista"} component={Artista}/>
                <Route path={"/search"} component={Pesquisa}/>
                <Route path={"/tickets"} component={Bilhetes}/>
                <Route path={"/personal"} component={Favoritos}/>
                <Route path={"/cashless/:id_festival"} component={Cashless}/>
                <Redirect to={"/home"}/>
            </Switch>
              <Navbar/>
          </div>
          </ProviderFavoritos>
      </AuthProvider>
  </BrowserRouter>
}



export default App;
