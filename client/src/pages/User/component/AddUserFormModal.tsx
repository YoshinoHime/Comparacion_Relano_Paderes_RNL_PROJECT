import { useEffect, useState, type FC, type FormEvent } from "react";
import FloatingLabelInput from "../../../components/input/FloatingLabelInput";
import Modal from "../../../components/Modal";
import FloatingLabelSelect from "../../../components/Select/FloatingLabelSelect";
import SubmitButton from "../../../components/Button/SubmitButton";
import CloseButton from "../../../components/Button/CloseButton";
import GenderService from "../../../services/GenderService";
import UserService from "../../../services/UserService";

interface AddUserFormModalProps {
  onUserAdded: (message: string) => void;
  refreshKey: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const AddUserFormModal: FC<AddUserFormModalProps> = ({
  onUserAdded,
  refreshKey,
  isOpen,
  onClose,
}) => {
  const [loadingGenders, setLoadingGenders] = useState(false);
  const [genders, setGenders] = useState<GenderColumns[]>([]);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<UserFieldErrors>({});

  useEffect(() => {
    const fetchGenders = async () => {
      setLoadingGenders(true);
      try {
        const response = await GenderService.getGenders();
        setGenders(response.data);
      } catch (error) {
        console.error("Failed to fetch genders", error);
      } finally {
        setLoadingGenders(false);
      }
    };
    if (isOpen) fetchGenders();
  }, [isOpen]);

  const handleStoreUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingStore(true);
    setErrors({}); // Reset errors

    const payload = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix_name: suffixName,
      gender: gender,
      birth_date: birthDate,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
    };

  const handleLoadGenders = async () => {
    try {
      setLoadingGenders(true);
      const res = await GenderService.loadGenders();
      if (res.status === 200) {
        setGenders(res.data.genders);
      }
    } catch (error) {
      console.error("Error loading genders:", error);
    } finally {
      setLoadingGenders(false);
    }
  };

  useEffect(() => {
    if (isOpen) handleLoadGenders();
  }, [isOpen]);

  const handleStoreUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoadingStore(true);
      const payload = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        suffix_name: suffixName,
        gender: gender,
        birth_date: birthDate,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      };

      const res = await UserService.storeUser(payload);

      if (res.status === 200) {
        onUserAdded(res.data.message);
        refreshKey();
        resetForm();
        onClose();
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoadingStore(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffixName("");
    setGender("");
    setBirthDate("");
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <form onSubmit={handleStoreUser} className="flex flex-col">
        <h1 className="text-2xl border-b border-gray-100 p-4 font-semibold mb-4">
          Add User Form
        </h1>
        
        <div className="grid grid-cols-2 gap-4 border-b border-gray-100 p-6 mb-4">
         
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <FloatingLabelInput
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                errors={errors.first_name}
                required
              />
            </div>
           
            <div className="mb-4">
              <FloatingLabelSelect
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                errors={errors.gender}
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g.gender_id} value={g.gender_id}>
                    {g.gender}
                  </option>
                ))}
              </FloatingLabelSelect>
            </div>
          </div>

         
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <FloatingLabelInput
                label="Birth Date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                errors={errors.birth_date}
                required
              />
            </div>
         
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <CloseButton label="Close" onClose={onClose} />
          <SubmitButton label={loadingStore ? "Saving..." : "Save User"} />
        </div>
      </form>
    </Modal>
  );
};

export default AddUserFormModal;

