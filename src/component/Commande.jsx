import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommandePage = () => {
  const extractNameFromEmail = (email) => {
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  const params = useParams();
  const { email } = params;
  extractNameFromEmail(email)

  const [userCommands, setUserCommands] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCommands = async (email) => {
      try {
        console.log("Fetching commands for:", email);

        const response = await fetch(
          `https://localhost:44328/api/UserCommands/${extractNameFromEmail(email)}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
          );
        }

        const data = await response.json();
        setUserCommands(data);
        setLoading(false);
        console.log("Commands fetched successfully:", data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user commands:", error);
        setLoading(false);
      }
    };

    fetchUserCommands(email);
  }, [email]);

 
  if (!email) {
    // Handle the case when email is undefined
    return <p>Email parameter is missing.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Commandes de {extractNameFromEmail(email)}</h2>
      {userCommands.length > 0 ? (
        <ul>
          {userCommands.map((commande) => (
            <li key={commande.id_commande}>
              <p>Nom: {commande.nom}</p>
              <p>Adresse: {commande.adresse}</p>
              {/* Ajoutez d'autres informations de commande que vous souhaitez afficher */}
            </li>
          ))}
        </ul>
      ) : (
        <p>La commande trouvée pour {extractNameFromEmail(email)} En attend</p>
      )}
    </div>
  );
};

export default CommandePage;