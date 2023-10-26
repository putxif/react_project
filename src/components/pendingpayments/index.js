import "./index.scss";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import {useAuth} from "../../AuthProvider";
const PendingPayments = () => {
    const {user} = useAuth();

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!user.email) return;
        axiosFest.get("/participante/pagamentos/existem_pendentes", {
            params: {
                participante: user.email
            }
        }).then(res => {
            setShow(res.data.existem_pendentes)
        })
    }, [])

    if (!show) return null;

    return (
        <div className={"d-flex align-center yellow background-dark"}>
            <img className={"mr-1"} src={"/assets/icons/info_circle.svg"} /> <p>Existem pagamentos pendentes na tua conta</p>
        </div>

    )}

export default PendingPayments;

