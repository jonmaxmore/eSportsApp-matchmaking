import bg from './BG-login.png'

export const SingUPStyle = {
    app: {
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    logo: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center"
    },
    block: {
        width: "80%",
        height: "auto",
        display: "flex",
        backgroundColor: "#0c171b",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    windows: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "auto",
    },
    login: {
        color: "white",
        fontSize: "2em",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    QRegister: {
        display: "flex",
        gridGap: "0.5em",
        width: "100%",
        justifyContent: "center",
    },
    QRegister2: {
        display: "flex",
        gridGap: "0.5em",
        width: "100%",
        justifyContent: "center",
        margin: "1em 0",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px 10% 20px 10%",
    },
    input: {
        width: "100%",
    },
    input2: {
        width: "100%",

    },
    form2: {
        height: "40px",
        width: "100%",
        backgroundColor: "#2e2e2e",
        color: "white",
        fontSize: "1.2em",
        padding: "0.5rem",
    },
    form: {
        height: "40px",
        width: "100%",
        borderLeft: "5px solid #8abf33",
        backgroundColor: "#2e2e2e",
        marginTop: "1rem",
        color: "white",
        fontSize: "1.2em",
        padding: "0.5rem",
    },
    button: {
        width: "100%",
        height: "60px",
        border: "5px solid #3AADEA",
        backgroundColor: "#1a5a80",
        marginTop: "1rem",
    },
    buttonCancel: {
        width: "100%",
        height: "60px",
        border: "5px solid #3AADEA",
        backgroundColor: "transparent",
        marginTop: "1rem",
    },
    remember:
    {
        padding: "1rem",
        transform: "scale(2.5)",
        border: "4px solid #3aadea",
        backgroundColor: "#2e2e2e",

    },
    remember2:
    {
        padding: "1rem"
        

    },
    forget:{ 
        color: "#23edfc",
        width:"100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
     },
     checkbox:{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    NumOTP:{
        width: "100%",
        height: "60px",
        color: "#95be4c",
        backgroundColor: "transparent",
        fontSize: "1.5em",
        fontWeight: "bold",
        textAlign: "center",
        padding: "0.4rem",
    }



}