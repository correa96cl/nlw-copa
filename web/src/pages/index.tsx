interface HomeProps {
  count: number;
}

import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheck from '../assets/icon-check.svg';



export default function Home(props: HomeProps) {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1>Crie seu propio botão da copa e compartilhe entre amigos!</h1>
        <div>
          <Image src={usersAvatarExampleImg} alt="Delicia" />
          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder='Qual nome do seu bolão?' />
          <button type='submit'>Criar meu bolão</button>
        </form>
        <p>Apos criar seu bolão, voçê receberá um codigo único que poderá usar para convidar outras pessoas</p>
        <div>
          <div>
            <Image src={iconCheck} alt="" />
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <div>
              <Image src={iconCheck} alt="" />
              <div>
                <span>+2.034</span>
                <span>Bolões criados</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="Imagem da copa" quality={100} />
    </div>
  )
}


/*export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  console.log('Data : ', data.count);

  return {
    props: {
      count:  data.count || null,
    }
  }
}*/