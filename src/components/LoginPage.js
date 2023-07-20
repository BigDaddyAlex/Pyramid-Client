import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import AuthContext from "./AuthContext";


export default function LoginPage(props) {

    const cxt = useContext(AuthContext)
    let navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const updateForm = (data) => {
        return setLoginForm((prev) => {
            return { ...prev, ...data };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(process.env.REACT_APP_API_URL + '/user/login', loginForm)
            .then(response => {
                cxt.login(response.data._id, response.data.token);
            }).catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        if(cxt.isLoggedIn) {
            navigate('/dashboard')
        }
        return
    }, [cxt.isLoggedIn])

    return (
        <div className="p-1 bg-light " style={{ height: "85vh" }}>
            <div key={props.id} className="card mx-auto" style={{ width: "25%", marginTop: "10%" }}>
                <div className="card-body">
                    <form className="pt-1" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="text" className="form-control mt-1" placeholder="Email" onChange={(e) => updateForm({ email: e.target.value.toLowerCase() })} />
                        </div>
                        <div className="form-group">
                            <label className="mt-1">Password</label>
                            <input type="password" className="form-control" placeholder="Password" onChange={(e) => updateForm({ password: e.target.value })} />
                        </div>
                        <div className="form-group mt-3" >
                            <button type="submit" className="btn btn-dark" style={{ width: "100%" }}>Log in</button>
                        </div>
                    </form>
                    <div className="mt-3">New to Pyramid? <a href="/signup">Register</a></div>
                </div>
                
            </div>
        </div>
    )
}