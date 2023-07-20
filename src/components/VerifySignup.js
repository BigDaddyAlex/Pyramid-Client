import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import AuthContext from "./AuthContext";


export default function VerifySignup(props) {
    let arr = window.location.href.split("?")
    let email = arr[1]
    let verifyString = arr[2]
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        isVerified()
        return
    }, [])

    const cxt = useContext(AuthContext)

    let navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: email,
        password: ""
    })

    const updateForm = (data) => {
        return setLoginForm((prev) => {
            return { ...prev, ...data };
        });
    }

    function isVerified() {
        Axios.post(process.env.REACT_APP_API_URL + '/record', { _id: email })
            .then(response => {
                setVerified(response.data.verifyString === verifyString)
            }).catch(e => {
                console.log(e);
            })
    }

    async function onSubmit(e) {
        e.preventDefault();

        await fetch(process.env.REACT_APP_API_URL + '/user/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: loginForm.password
            }),
        }).then(response => {
            deleteRecord("verifyString")
            login()
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        navigate('/dashboard');
    }

    function login(){
        Axios.post(process.env.REACT_APP_API_URL + '/user/login', loginForm)
            .then(response => {
                cxt.login(response.data._id, response.data.token);
            }).catch(e => {
                console.log(e);
            })
    }

    async function deleteRecord(fieldName) {
        await fetch(process.env.REACT_APP_API_URL + '/delete', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: email,
            field: fieldName
          }),
        });
      }

    useEffect(() => {
        if (cxt.isLoggedIn) {
            navigate('/dashboard')
        }
        return
    }, [cxt.isLoggedIn])

    if (verified)
        return (
            <div className="p-1 bg-light " style={{ height: "85vh" }}>
                <div key={props.id} className="card mx-auto" style={{ width: "25%", marginTop: "10%" }}>
                    <div className="card-body">
                        <form className="pt-1" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label className="d-inline">{email}</label><label className="d-inline text-success"> &#10003;</label>
                            </div>
                            <div className="form-group">
                                <label className="mt-1">Create a password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={(e) => updateForm({ password: e.target.value })} />
                            </div>
                            <div className="form-group mt-3" >
                                <button type="submit" className="btn btn-dark" style={{ width: "100%" }}>Log in</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
}