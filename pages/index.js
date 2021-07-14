import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelations from '../src/components/ProfileRelations'
import React, { useState, useEffect } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />      
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'robson525';
  const followersUrl = "https://api.github.com/users/juunegreiros/followers";
  const communitiesUrl = "../src/assets/json/communities.json";

  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
      fetch(followersUrl)
      .then((resposta) => { return resposta.json() })
      .then((json) => {
          setFollowers(json.sort( () => .5 - Math.random()).map((follower) => { 
            return {
              id: follower.id,
              title: follower.login,
              img: follower.html_url + ".png",
              href: follower.html_url,
            };
          }));
      });

      setCommunities(require(`../src/assets/json/communities.json`).sort( () => .5 - Math.random()));

    }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet 
              recados={getRandomInt(1, 100)}
              fotos={getRandomInt(1, 100)}
              videos={getRandomInt(1, 100)}
              fas={getRandomInt(1, 20)}
              mensagens={getRandomInt(1, 100)}
              confiavel={getRandomInt(1, 3)}
              legal={getRandomInt(1, 3)}
              sexy={getRandomInt(1, 3)}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const communitie = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                img: formData.get('image'),
                href: formData.get('image')
              };
              setCommunities([communitie, ...communities]);
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade ?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade ?"
                />
              </div>
              <div>
                <input 
                  placeholder="URL da imagem de capa"
                  name="image"
                  aria-label="URL da imagem de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelations title="Amigos" seeAllLink={followersUrl} itens={followers} />

          <ProfileRelations title="Comunidades" seeAllLink={communitiesUrl} itens={communities} />
        </div>
        
      </MainGrid>
    </>
  )
}