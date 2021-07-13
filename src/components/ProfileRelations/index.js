import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Box from '../Box';

export default function ProfileRelations() {

    const url = "https://api.github.com/users/juunegreiros/followers";
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        fetch(url)
        .then((resposta) => { return resposta.json() })
        .then((json) => {
            setFollowers(json);
        });
      }, []);

    
    return (
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({followers.length})
          </h2>

          <ul>
            {followers.sort( () => .5 - Math.random() ) // reordena randomicamente
            .slice(0, 6).map((follower) => { // pega as 6 primeiras
              return (
                <li key={`id-${follower.id}`} >
                  <a href={`/users/${follower.login}`} key={follower.login}>
                    <img src={`https://github.com/${follower.login}.png`} />
                    <span>{follower.login}</span>
                  </a>
                </li>
              )
            })}
          </ul>
            
          <br />
          <a className="seeAll" href={`${url}`} target="_blank">Ver Todos</a>
        </ProfileRelationsBoxWrapper>
      </div>
    )
  }

const ProfileRelationsBoxWrapper = styled(Box)`
  .seeAll {
    font-weight: 700;
    font-family: Verdana;
    font-size: 14px;
    text-decoration: none;
    color: #2e7bb4;
  }
  
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }    
  }
`;