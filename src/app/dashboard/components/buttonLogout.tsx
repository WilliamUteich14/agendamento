import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()}>Sair</button>