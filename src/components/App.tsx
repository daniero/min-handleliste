import { useBruker } from '../domene/bruker/useBruker';
import { Menyknapp } from './Menyknapp';
import { Handleliste } from './handleliste/Handleliste.tsx';
import { Login } from './login/Login';

export const App = () => {
  const { bruker, laster, signUp, signIn, signOut } = useBruker();

  return (
    <div className="flex flex-col h-screen mx-2">
      <header className="flex-0 flex flex-wrap items-center">
        <h1 className="text-3xl my-3 font-bold flex-1">Handleliste</h1>
        {bruker && <Menyknapp bruker={bruker} signOut={() => void signOut()} />}
      </header>

      <main className={'flex flex-1'}>
        {!laster && !bruker && <Login signUp={signUp} signIn={signIn} />}
        <Handleliste hidden={!bruker} />
      </main>
    </div>
  );
};
