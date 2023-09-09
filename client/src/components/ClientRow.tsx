import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

interface GetClientsResult {
  clients: any[]; // Replace `any` with the actual client type
}

export default function ClientRow({ client }: { client: any }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const data = cache.readQuery<GetClientsResult>({
        query: GET_CLIENTS,
      });
      if (data && data.clients) {
        const { clients } = data;
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter((c: any) => c.id !== deleteClient.id),
          },
        });
      }
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
