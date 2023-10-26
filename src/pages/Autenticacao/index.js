import "./index.scss";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useAuth} from "../../AuthProvider";


//preciso de guardar os dados de login com o useContext
function Autenticacao(props) {
    const {handleSubmit, register, setValue, formState, watch, reset} = useForm();
    const history = useHistory();
    const {user, setUser} = useAuth()

    const onSubmit = (data) => {
        console.log("dados introduzidos", data);
        setUser(data)
        history.push("/home")
    }

    const formHasError = Object.keys(formState.errors).length > 0

    console.log("erros", formState.errors)
    return (
        <div className={"Auth page-container"}>
            <img src="/assets/icons/logoupfest.svg"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"form-group" + (formHasError ? " error" : "")}>
                    <label htmlFor={"nome"}>Nome</label>
                    <input type={"text"} placeholder={"Introduza o seu nome"} {...register("nome", {
                        required: true
                    })}/>
                </div>
                <div className={"form-group" + (formHasError ? " error" : "")}>
                    <label>Email</label>
                    <input type={"email"} placeholder={"Introduza o seu email"} {...register("email", {
                        required: true
                    })}/>
                </div>

                <button className={"submit-button"} type={"submit"}>
                    <img src="/assets/icons/submit_button.svg"/>
                </button>
            </form>
            {formHasError && <p className={"warning"}>Verifica o preenchimento dos campos</p>}

        </div>
    )
}


export default Autenticacao;