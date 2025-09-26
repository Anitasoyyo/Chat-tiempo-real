import { useState } from "react";
import "./App.css";
const diferentAvatars = [
  // Avatares actuales de Google AIDA (generados por IA)
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgVVb8n3o2QZ3bhpzMoj4mPVuCRweN4HanLBEem1XRz5F-h70UJBvuwWTsub7PgCkPloJHgi8-92O_yW0IOKpCtvuoCK_tLNCebtytn5vyY6Nu7oeJzbTyJU3XCxXBFO2a5onvsJ8Q9Pc8m2oDHUVqpffRpksjxQT0r4ACRUaD5gKu9R00hTTyVU3IioSn-Y6bnAgXadAvRa98hL5-ujoR6b72r31OpmB_Ly4UJ2sek7_CkhwPR_OEn3X1sAusNx8Zilg7bmfTtIuX",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDuUjz67Gx2IvNt6Zvjja05EF8cadUxS8Gv-6nmXVXwmANHAgZ8TbGfmEWRaVrQ6PgJ1cKKIx4LLJLEyE9sBtZhqpzuM8ErJvZAjp3WgH9OSGBSX1dTmmNKTRLtQOgyzLsszJ5fUBgaX1MVOq5Q-da0Lycn-UlJU1imBRbkdDPS_alrHRkFepgVSzjNSY4podMLaa8qfFOti4p06WuzBU90H_vsmKEmcDrZ0UNSbC5cj60Mg8redrW3gNrG83Ht1sNxqFD0o_cQ4y3l",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIeWExR8J59SGmUsCxg3FhCdfivb_4veuZW-mn2T44_0wivcND1XpGzSQFGyxRBIhktd1PJG9GvdPfwfguAeRUJN0FTm-Ezh7nuq2-GfcqMLQQVwWJOxOlpHPhdI_pP-4M-UAfJGpLPZlCoDMKsnHvrfb-ikXkMLdGhxcdaZrvxbM61cvPiOswdA0Ji-T9TdcPZ8JAv7ToEBeRiXnDPqqYz-MGCgMuWJQOq7QHkaaiSTC3SHXr_tUEbdwCgAyns7T2UcPiKRA0e0yZ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3ppXsZkcjh9mbXZZ-HOEJI52bNPachn4Yb2D4YhKmzYKz_xD99Vi1YKe2wppASsTYIAyky3CplkSbw6aP_OvJggMQLC_4tduSWBJCZSqWx5KcMkCofLyADKU3qLvR_1xxJX1ogjpX6p1mfPqU6ESihAeYfedTM9PI8V9sEp4zleeYgfnH-3rQFoU_zc0xXq6msBxFTpn5JiPlm41SrblXDbrA6__5M3I43QQklNlUi1hOV8SlruLu_R52e4Dbl03IkWLQTqVqfdlo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ58wbFS2jx7eFLT8-TSAyc-c7SRBhdlsrwaDPqJCS3vVDr_RCQ2jr7BCLV_qwSWA1Ls7MnAMNi1PHELg6xfOehS-9vv77mLA9cd_Lg-eyYTgByxcYvQhPMeVJwjiYv3wiaoo3lk1ntl2P7gPMkOjgV4F9MBtAhvm6BphrDoFy8cDSTMPSSNAn4c8h2h8GLOtZsZhzwgvDFIWfB1dKdD_1PglW3c37ePABfuA3cb8FCZ0DGcBiYW3kA2xjy2DIVfZ4LZVgkSg_cLwG",
];
export default function Login({ onLogin }) {
  const [name, setName] = useState(""); //inicializamos en cadena vacía
  const [avatar, setAvatar] = useState(diferentAvatars[0]); //inicializamos con el gatito

  //a continuación definimos la función para que el formulario no ejecute su comportamiento por
  //defecto y recargue la página pq perderíamos los estamos de nombre y avatar .
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      //si después de eliminar los espacio en blanco hay un nombre , a onlogin le pasamos el nombre y el avatar.
      onLogin({ name, avatar }); //entonces onLogin va a tener nombre y avatar.
    }
  }; //cuando das a enter o haces click en un botón submit se dispara el evento submit que refresca la página salvo que lo canceles con e.preventDefault.

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h2>¡Únete al chat!</h2>

      <input
        className="inputname"
        type="text"
        placeholder="Escribe aquí tu nombre..."
        value={name}
        onChange={(e) => setName(e.target.value)} //onChange es un evento de react que se dispara cada vez que el usuario cambiar el valor del input .
      />
      <h3>Elige tu avatar :</h3>
      <div className="avatars">
        {diferentAvatars.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAvatar(a)}
            className={avatar === a ? "selected" : ""}
          >
            <img
              src={a}
              alt="Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </button>
        ))}
      </div>

      <button type="submit" className="buttonsubmit">
        Unirse al chat
      </button>
    </form>
  );
}
