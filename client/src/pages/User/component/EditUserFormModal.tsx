import { useEffect, useState, type FC, type FormEvent } from "react";
import CloseButton from "../../../components/Button/CloseButton";
import SubmitButton from "../../../components/Button/SubmitButton";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
import Modal from "../../../components/Modal";
import FloatingLabelSelect from "../../../components/Select/FloatingLabelSelect";

import { useEffect, useState, type FC, type FormEvent } from "react";
import FloatingLabelInput from "../../../components/input/FloatingLabelInput";
import Modal from "../../../components/Modal";
import FloatingLabelSelect from "../../../components/Select/FloatingLabelSelect";
import SubmitButton from "../../../components/Button/SubmitButton";
import CloseButton from "../../../components/Button/CloseButton";
import GenderService from "../../../services/GenderService";
import UserService from "../../../services/UserService";

interface EditUserFormModalProps {
  onUserAdded: (message: string) => void;
  refreshKey: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserFormModalProps: FC<EditUserFormModalProps> = ({
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
  
  const handleLoadGenders = async () => {
  try {
    setLoadingGenders(true);
    
 
    const res = await GenderService.loadGenders();

    
    if (res.status === 200) {
      setGenders(res.data.genders);
    } else {
      
      console.error(`Unexpected status error occurred during loading genders: ${res.status}`);
    }
  } catch (error) {
    console.error("Unexpected server error occurred during loading genders: ", error);
  } finally {
    setLoadingGenders(false);
  }
};


  useEffect(() => {
  if (user) {
    setFirstName(user.first_name);
    setMiddleName(user.middle_name ?? "");
    setLastName(user.last_name);
    setSuffixName(user.suffix_name ?? "");
    setGender(user.gender?.gender_id?.toString() ?? "");
    setBirthDate(user.birth_date);
    setUsername(user.username);
  } else {
    console.error(

    );
  }
}, [user]);


  return (
     <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <form onSubmit={handleUpdateUser} className="p-0">
        <h1 className="text-2xl border-b border-gray-100 p-4 font-semibold mb-4">
          Edit User Form
        </h1>

        <div className="grid grid-cols-2 gap-4 border-b border-gray-100 mb-4 px-4 pb-4">
          {/* Left Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <FloatingLabelInput
                label="First Name"
                type="text"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoFocus
                errors={errors.first_name}
              />
            </div>
            <div className="mb-4">
              <FloatingLabelInput
                label="Middle Name"
                type="text"
                name="middle_name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                errors={errors.middle_name}
              />
            </div>
            <div className="mb-4">
              <FloatingLabelInput
                label="Last Name"
                type="text"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                errors={errors.last_name}
              />
            </div>
            <div className="mb-4">
              <FloatingLabelInput
                label="Suffix Name"
                type="text"
                name="suffix_name"
                value={suffixName}
                onChange={(e) => setSuffixName(e.target.value)}
                errors={errors.suffix_name}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <FloatingLabelInput
                label="Birth Date"
                type="date"
                name="birth_date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                errors={errors.birth_date}
              />
            </div>
            <div className="mb-4">
              <FloatingLabelSelect
                label="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                errors={errors.gender}
              >
                <option value="">Select Gender</option>
                {genders.map((g: any) => (
                  <option key={g.id} value={g.gender}>
                    {g.gender}
                  </option>
                ))}
              </FloatingLabelSelect>
            </div>
            <div className="mb-4">
              <FloatingLabelInput
                label="Username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                errors={errors.username}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 p-4">
          {!loadingUpdate && (
            <CloseButton label="Close" onClose={onClose} />
          )}
          <SubmitButton
            label="Update User"
            loading={loadingUpdate}
            loadingLabel="Updating User..."
          />
        </div>
      </form>
    </Modal>
    </>
  );
};


const handleLoadGenders = async () => {
  try {
    setLoadingGenders(true);
    const res = await GenderService.loadGenders();

    if (res.status === 200) {
      setGenders(res.data.genders);
    } else {
      console.error(`Unexpected status error occurred during loading genders: ${res.status}`);
    }
  } catch (error) {
    console.error("Unexpected server error occurred during loading genders: ", error);
  } finally {
    setLoadingGenders(false);
  }
};

useEffect(() => {
  if (isOpen) {
    handleLoadGenders();
  }
}, [isOpen]);

export default EditUserFormModal;
