import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { apiService } from "~/api/fetch-data";
import { Character } from "~/models/character";

export default component$(() => {
    const location = useLocation();
    const id = location.params.id;
    const navigate = useNavigate();
    const useResource = useResource$(() => apiService(id));

    return(
        <Resource
            value = {useResource}
            onPending = {() => <p>Loading character ...</p>}
            onResolved = {(character: Character) => {
                return (
                    <>
                        <button onClick$={() => (navigate('/'))} type="button" class="btn-back">Back</button>
                        <div class="card-details">
                            <div class="details">
                                <img src={character.image} alt={character.name} class="img-character img-details"></img>
                                <div class="container-details">
                                    <h5 class="text-xl">{character.name}</h5>
                                    <p>{character.status} - {character.gender}</p>
                                    <p>{character.species}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }}/>
    )
})