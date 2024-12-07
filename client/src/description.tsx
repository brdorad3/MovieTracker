

const Description = (props: any) => {
        const info = props.state
    return(
        <>
        {info &&
        <div>
            <h1>Plot</h1>
            <p>{info.overview}</p>
        </div>
        }
        </>
    )
}
export default Description