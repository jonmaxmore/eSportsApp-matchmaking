import bg from './01Page-Login/BG-login.png'
// import logo from './01Page-Login/LG-battleLab.png'


export const LoginStyle = {
  app: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  popup: {
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  depopup: {
    position: 'absolute',
    display: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  logo: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  block: {
    width: '50%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#0c171b',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2em 2em 0 2em',
  },
  windows: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
  },
  login: {
    color: 'white',
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0.3rem',
    textTransform: 'uppercase',
  },
  QRegister: {
    display: 'flex',
    gridGap: '0.5em',
    width: '100%',
    justifyContent: 'center',
  },
  QRegister2: {
    display: 'flex',
    gridGap: '0.5em',
    width: '100%',
    justifyContent: 'center',
    margin: '1em 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '20px 10% 20px 10%',
  },
  input: {
    width: '100%',
  },
  input2: {
    width: '100%',
    marginTop: '3rem',
  },
  form: {
    height: '40px',
    width: '100%',
    borderLeft: '5px solid #8abf33',
    backgroundColor: '#2e2e2e',
    marginTop: '1rem',
    color: 'white',
    fontSize: '1.2em',
    padding: '0.5rem',
  },
  button: {
    width: '100%',
    height: '60px',
    border: '5px solid #3AADEA',
    backgroundColor: '#1a5a80',
    marginTop: '1rem',
    color: 'white'
  },
  buttonCancel: {
    width: '100%',
    height: '60px',
    border: '5px solid #3AADEA',
    backgroundColor: 'transparent',
    marginTop: '1rem',
    color: 'white'
  },
  remember: {
    padding: '1rem',
    transform: 'scale(1.5)',
  },
  remember2: {
    padding: '1rem',
  },
  forget: {
    color: '#23edfc',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  NumOTP: {
    width: '100%',
    height: '60px',
    color: '#95be4c',
    backgroundColor: 'transparent',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '0.4rem',
    border: 'solid 1px white'
  },
}


