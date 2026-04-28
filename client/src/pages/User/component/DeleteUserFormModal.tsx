import { FC, useState } from "react";
import Modal from "../../../components/Modal";
import UserService from "../../../services/UserService";
import CloseButton from "../../../components/Button/CloseButton"; // Adjust path as needed
import SubmitButton from "../../../components/Button/SubmitButton"; // Adjust path as needed
import type { UserColumns } from "../../../interfaces/UserInterface";

interface DeleteUserFormModalProps {
  user: UserColumns | null;
  onUserDeleted: (message: string) => void;
  refreshKey: () => void;
  isOpen: boolean;
  onClose: () => void;
}
  const [loadingDestroy, setloadingDestroy] = useState("false");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");

    const handleDestroyUser = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user?.user_id) return;

    setLoadingDestroy(true);

    try {
      const res = await UserService.destroyUser(user.user_id);

      if (res.status === 200) {
        onUserDeleted(res.data.message);
        refreshKey();
        onClose();
      } else {
        console.error('Unexpected status occurred during deleting user:', res.status);
      }
    } catch (error: any) {
      console.error('An error occurred while deleting the user:', error.response?.data || error.message);
    } finally {
      setLoadingDestroy(false);
    }
  };


  useEffect(() => {
   if(isOpen) {
    if (user) {
    setFirstName(user.first_name);
    setMiddleName(user.middle_name ?? "");
    setLastName(user.last_name);
    setSuffixName(user.suffix_name ?? "");
    setGender(user.gender?.gender);
    setBirthDate(user.birth_date);
    setUsername(user.username);
  } else {
    console.error(

    );
  }
}, [isOpen, user]);
  

  return (
  return (
     <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <form onSubmit={handleDeleteUser} className="p-0">
        <h1 className="text-2xl border-b border-gray-100 p-4 font-semibold mb-4 text-red-600">
          Delete User Confirmation
        </h1>

        <div className="p-4">
          <p className="mb-4 text-gray-600">
            Are you sure you want to delete this user? This action is permanent.
          </p>

          <div className="grid grid-cols-2 gap-4 border-b border-gray-100 mb-4 pb-4">
            {/* Left Column - Read Only */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <label className="text-black font-medium block">First Name</label>
                <p className="text-gray-500 font-medium">{user?.first_name}</p>
              </div>
              <div className="mb-4">
                <label className="text-black font-medium block">Last Name</label>
                <p className="text-gray-500 font-medium">{user?.last_name}</p>
              </div>
              <div className="mb-4">
                <label className="text-black font-medium block">Gender</label>
                <p className="text-gray-500 font-medium">{user?.gender}</p>
              </div>
            </div>

            {/* Right Column - Read Only */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <label className="text-black font-medium block">Username</label>
                <p className="text-gray-500 font-medium">{user?.username}</p>
              </div>
              <div className="mb-4">
                <label className="text-black font-medium block">Birth Date</label>
                <p className="text-gray-500 font-medium">{user?.birth_date}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          {!loadingDestroy && <CloseButton label="Close" onClose={onClose} />}
          <SubmitButton
            label="Delete User"
            loading={loadingDestroy}
            loadingLabel="Deleting User..."
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </div>
      </form>
    </Modal>
  );
};

export default DeleteUserFormModal;
