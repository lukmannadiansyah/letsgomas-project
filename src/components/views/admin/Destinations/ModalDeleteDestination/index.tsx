/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import destinationServices from "@/services/destination";
import { useSession } from "next-auth/react";
import styles from "./ModalDeleteContent.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Content } from "firebase/vertexai-preview";

type Proptypes = {
  setDestinationsData: Dispatch<SetStateAction<Content[]>>;
  deletedDestination: Content | any;
  setDeletedDestination: Dispatch<SetStateAction<{}>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
};

const ModalDeleteDestination = (props: Proptypes) => {
  const {
    deletedDestination,
    setDeletedDestination,
    setDestinationsData,
    setSuccessMessage,
  } = props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await destinationServices.deleteDestination(
      deletedDestination.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setDeletedDestination({});
      const { data } = await destinationServices.getAllDestinations();
      setDestinationsData(data.data);
      setSuccessMessage("Data berhasil dihapus!");

      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedDestination({})}>
      <h1>Apakah Anda yakin ingin menghapus destinasi ini?</h1>
      <Button
        type="button"
        onClick={handleDelete}
        className={styles.modal__button}
        disabled={isLoading}
      >
        {isLoading ? "Menghapus..." : "Hapus"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteDestination;
