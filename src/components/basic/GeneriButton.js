export default function GenericButton(props) {

    function handleClick(){
        props.onClick()
    }

    return (
        <button type="submit" className="btn btn-dark py-0 px-2" onClick={handleClick}>{props.value}</button>
    )
}